import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

import strings from '@/utils/strings'

import { useNotificationStore } from '@/stores/notification'
// import { useLoadingStore } from '@/stores/loading'
import { db } from './db'
import { useThrottleFn } from '@vueuse/core'
import { useConfirmStore } from './confirm'
import { useFileUtils } from '@/utils/file-utils'
import { useMediaUtils } from '@/utils/media-utils'

export const useMediaStore = defineStore('media', () => {
  const allMedia: Ref<Array<MediaModel>> = ref([])
  const filteredList: Ref<Array<MediaModel>> = ref([])
  const count: ComputedRef<number> = computed(() => allMedia.value.length)
  const filteredCount: ComputedRef<number> = computed(() => filteredList.value.length)
  const filters: Ref<FilterModel> = ref({ sort: 'date', order: 'desc' })
  const mediaSearch: Ref<string> = ref('')

  const { setNewMediaProperties, sortMedia } = useMediaUtils()
  const { downloadBlob, createBlob } = useFileUtils()
  const { confirmOrCancel } = useConfirmStore()
  const { addErrorNotification, addNotification } = useNotificationStore()
  // const { setLoading } = useLoadingStore()

  // async function checkMediaChanges(): Promise<boolean> {
  //   if (!db.isOpen()) return false
  //   return await db.medias.toArray()
  //     .then((response) => allMedia.value.map(m => m.id) === response.map(m => m.id))
  // }

  async function getMedia(): Promise<MediaModel[]> {
    // setLoading(true)
    // if(filters.value.order === 'desc') {
    //   query.reverse()
    // }
    return await db.medias
      // .orderBy(filters.value.sort)
      .toArray()
      .then((response) => {
        allMedia.value = response
        applyMediaFilters(response)
        // setLoading(false)
        return response
      })
      .catch((error) => {
        manageError(error, 'failed to get media', strings.SAD)
        // setLoading(false)
        allMedia.value = []
        filteredList.value = []
        return []
      })
  }

  function getMediaByTitle(title: string): MediaModel[] {
    return allMedia.value
      .filter((media) => {
        if (media.title === undefined) return false
        return media.title.toLowerCase().includes(title.toLowerCase())
      })
  }

  async function addMedia(media: any): Promise<void> {
    // const existingMedia = await db.medias
    //   .where({ title: media.title })
    //   .first()
    //   .then((response) => {
    //     if (response) return setNewMediaProperties(response)
    //   })

    // if (existingMedia) {
    //   return addNotification('Media with this title already exists', strings.SAD)
    // }
    return await db.medias.add(setNewMediaProperties(media))
      .then(() => updateMedia('media added', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to add media', strings.SAD))
  }

  async function editMedia(media: MediaModel): Promise<void> {
    if (media.status === 'planning') media.score = 0
    media.tags = media.tagstring ? media.tagstring.split(' ') : null
    media.updatedAt = new Date()

    return await db.medias.update(media.id, { ...media })
      .then(() => updateMedia('media edited', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to edit media', strings.SAD))
  }

  async function deleteMedia(id: number): Promise<any> {
    return db.medias.delete(id)
      .then(() => updateMedia('media deleted', strings.HAPPY))
      .catch((error) => manageError(error, "failed to delete media", strings.SAD))
  }

  async function updateMediaFilters(newFilters: FilterModel): Promise<any> {
    filters.value = newFilters
    getMedia()
  }

  async function resetFilters(): Promise<any> {
    filters.value.status = null
    filters.value.categ = null
    filters.value.like = null
    filters.value.tag = null
    getMedia()
  }

  function applyMediaFilters(media: MediaModel[]): MediaModel[] {
    let filtered = media
    if (filters.value.status) {
      filtered = filtered.filter((m) => m.status === filters.value.status)
    }
    if (filters.value.categ) {
      filtered = filtered.filter((m) => m.categ === filters.value.categ)
    }
    if (filters.value.like) {
      filtered = filtered.filter((m) => m.like === filters.value.like)
    }
    if (filters.value.tag) {
      filtered = filtered.filter((m) => m.tags && m.tags.includes(filters.value.tag))
    }

    filteredList.value = sortMedia(filtered, filters.value)
    return filtered
  }

  function manageError(error: any, message: string, kao: string): void {
    addNotification(message, kao)
    addErrorNotification(error)
  }

  function updateMedia(message: string, kao: string): void {
    addNotification(message, kao)
    getMedia()
  }

  async function exportMediaDB(): Promise<void> {
    const options = { prettyJson: true }
    return await db.export(options)
      .then((blob) => {
        addNotification('Database exported successfully', strings.HAPPY);
        downloadBlob(blob, 'mediaDB.json')
      })
      .catch(() => addErrorNotification('Failed to export database.' + strings.SAD))
  }

  async function importMediaDB(file: File): Promise<void> {
    if (!db.isOpen()) {
      db.open()
    }

    const blob = createBlob(file, 'application/json')
    return await db.import(blob)
      .then(() => {
        getMedia()
        addNotification('Database imported successfully', strings.HAPPY)
      })
      .catch(() => addErrorNotification('Failed to import database.' + strings.SAD))
  }

  const deleteMediaDB = useThrottleFn(async () => {
    return await confirmOrCancel('Are you sure you want to delete the database? This action cannot be undone.')
      .then((confirm: boolean) => {
        if (confirm) {
          db.delete()
            .then(() => {
              addNotification('Database deleted successfully', strings.HAPPY)
              allMedia.value = []
              filteredList.value = []
            })
            .catch(() => addErrorNotification('Failed to delete database' + strings.SAD))
        }
      })
  }, 500)

  return {
    count,
    filteredCount,
    filteredList,
    allMedia,
    getMedia,
    getMediaByTitle,
    filters,
    updateMediaFilters,
    resetFilters,
    addMedia,
    editMedia,
    deleteMedia,
    mediaSearch,
    importMediaDB,
    exportMediaDB,
    deleteMediaDB
  }
})
