import "dexie-export-import";
import { defineStore } from 'pinia'
import { computed, ref, toRaw, type ComputedRef, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'
import strings from '@/utils/strings'

import { useNotificationStore } from '@/stores/notification'
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

  async function getMedia(): Promise<MediaModel[]> {
    return await db.medias
      .toArray()
      .then((response) => {
        allMedia.value = response
        return applyMediaFilters(response)
      })
      .catch((error) => {
        manageError(error, 'failed to get media', strings.SAD)
        emptyLists()
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

  async function addMedia(media: MediaModel): Promise<number | null> {
    return await db.medias.add(setNewMediaProperties(media))
      .then(data => {
        updateMedia('media added', strings.HAPPY)
        return data
      })
      .catch((error) => {
        manageError(error, 'failed to add media', strings.SAD)
        return null
      })
  }

  async function editMedia(media: MediaModel): Promise<number | null> {
    if (media.status === 'planning') media.score = 0
    media.updatedAt = new Date()
    // toRaw is used because Dexie doesn't like the proxy returned by vue :'(
    return await db.medias.update(media.id, { ...toRaw(media) })
      .then(data => {
        updateMedia('media edited', strings.HAPPY)
        return data ?? null
      })
      .catch((error) => {
        manageError(error, 'failed to edit media', strings.SAD)
        return null
      })
  }

  async function deleteMedia(id: number): Promise<void> {
    return db.medias.delete(id)
      .then(() => updateMedia('media deleted', strings.HAPPY))
      .catch((error) => manageError(error, "failed to delete media", strings.SAD))
  }

  async function updateMediaFilters(newFilters: FilterModel): Promise<void> {
    filters.value = newFilters
    getMedia()
  }

  async function resetFilters(): Promise<void> {
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
      filtered = filtered.filter((m) => m.tags && filters.value.tag && m.tags.includes(filters.value.tag))
    }

    filteredList.value = sortMedia(filtered, filters.value)
    return filtered
  }

  function manageError(error: string, message: string, kao: string): void {
    addNotification(message, kao)
    addErrorNotification(error)
  }

  function updateMedia(message: string, kao: string): void {
    addNotification(message, kao)
    getMedia()
  }

  async function emptyLists(): Promise<void> {
    allMedia.value = filteredList.value = []
  }

  async function exportMediaDB(): Promise<void> {
    const options = { prettyJson: true }
    return await db.export(options)
      .then((blob) => downloadBlob(blob, 'mediaDB.json'))
      .then(() => addNotification('Database exported successfully', strings.HAPPY))
      .catch(() => addErrorNotification('Failed to export database.' + strings.SAD))
  }

  async function importMediaDB(file: File): Promise<void> {
    if (!db.isOpen()) db.open()

    const blob = createBlob(file, 'application/json')
    return await db.import(blob)
      .then(() => getMedia())
      .then(() => addNotification('Database imported successfully', strings.HAPPY))
      .catch(() => addErrorNotification('Failed to import database.' + strings.SAD))
  }

  const deleteMediaDB = useThrottleFn(async () => {
    return await confirmOrCancel('Are you sure you want to delete the database? This action cannot be undone.')
      .then((confirm: boolean) => confirm ? db.delete() : Promise.reject())
      .then(() => {
        addNotification('Database deleted successfully', strings.HAPPY)
        emptyLists()
      })
      .catch((err) => err ? addErrorNotification('Failed to delete database' + strings.SAD) : null)
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
