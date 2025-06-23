import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

import strings from '@/utils/strings'

import { useNotificationStore } from '@/stores/notification'
import { useLoadingStore } from '@/stores/loading'
import { db } from './db'

export const useMediaStore = defineStore('media', () => {
  const allMedia: Ref<Array<MediaModel>> = ref([])
  const filteredList: Ref<Array<MediaModel>> = ref([])
  const count: ComputedRef<number> = computed(() => allMedia.value.length)
  const filteredCount: ComputedRef<number> = computed(() => filteredList.value.length)
  const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'desc' })
  const mediaSearch: Ref<string> = ref('')

  const notification = useNotificationStore()
  const { setLoading } = useLoadingStore()

  async function getMedia(): Promise<MediaModel[]> {
    setLoading(true)
    // if(filters.value.order === 'desc') {
    //   query.reverse()
    // }
    return await db.medias
      // .orderBy(filters.value.sort)
      .toArray()
      .then((response) => {
        setLoading(false)
        allMedia.value = response
        applyMediaFilters(response)
        return response
      })
      .catch((error) => {
        manageError(error, 'failed to get media', strings.SAD)
        setLoading(false)
        allMedia.value = []
        filteredList.value = []
        return []
      })
  }

  async function getMediaByTitle(title: string): Promise<MediaModel[]> {
    setLoading(true)
    return await db.medias
      .filter((media) => {
        if (media.title === undefined) return false
        return media.title.toLowerCase().includes(title.toLowerCase())
      })
      .toArray()
      .then((response: any) => {
        setLoading(false)
        return response
      })
      .catch((error) => manageError(error, 'failed to get media', strings.SAD))
  }

  async function addMedia(media: any): Promise<void> {
    const existingMedia = await db.medias.where({ title: media.title }).first()
    if (existingMedia) {
      notification.addNotification('Media with this title already exists', strings.SAD)
      return
    }

    if (media.action === 'planning') media.score = 0
    media.tags = media.tagstring ? media.tagstring.split(' ') : null
    media.createdAt = new Date()

    await db.medias.add(media)
      .then(() => updateMedia('media added', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to add media', strings.SAD))
  }

  async function editMedia(media: MediaModel): Promise<void> {
    if (media.action === 'planning') media.score = 0
    media.tags = media.tagstring ? media.tagstring.split(' ') : null
    media.updatedAt = new Date()

    await db.medias.update(media.id, { ...media })
      .then(() => updateMedia('media edited', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to edit media', strings.SAD))
  }

  async function deleteMedia(id: number): Promise<any> {
    await db.medias.delete(id)
      .then(() => updateMedia('media deleted', strings.HAPPY))
      .catch((error) => manageError(error, "failed to delete media", strings.SAD))
  }

  async function updateFilters(newFilters: FilterModel): Promise<any> {
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
      filtered = filtered.filter((m) => m.action === filters.value.status)
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

    filteredList.value = filtered
    return filtered
  }

  function manageError(error: any, message: string, kao: string): void {
    notification.addNotification(message, kao)
    notification.addErrorNotification(error)
  }

  function updateMedia(message: string, kao: string): void {
    notification.addNotification(message, kao)
    getMedia()
  }

  return {
    count,
    filteredCount,
    filteredList,
    allMedia,
    getMedia,
    getMediaByTitle,
    filters,
    updateFilters,
    resetFilters,
    addMedia,
    editMedia,
    deleteMedia,
    mediaSearch,
  }
})
