import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

import http from '@/utils/http-common'

import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

export const useMediaStore = defineStore('media', () => {
  const list: Ref<Array<MediaModel>> = ref([])
  const filteredList: Ref<Array<MediaModel>> = ref([])
  const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'desc' })

  const notification = useNotificationStore()
  const user = useUserStore()

  async function getMediaByUserAndName(user: string, name: string): Promise<any> {
    return http
      .get<Array<any>>('medias?filters[title][$containsi]=' + name + '&filters[user][$eq]=' + user)
      .then((response: any) => {
        return response.data.data
      })
      .catch((error) => notification.addNotification({ type: 'error', message: error.response }))
  }

  async function getMediaByUser(user: string): Promise<any> {
    return http
      .get<Array<any>>('medias?sort=createdAt:desc')
      .then((response: any) => {
        const result = response.data.data.filter((media: any) => media.attributes.user === user)
        list.value = result
        return result
      })
      .catch((error) => notification.addNotification({ type: 'error', message: error.response }))
  }

  async function getFilteredMediaByUser(user: string): Promise<any> {
    let filter: string = ''
    if (filters.value?.categ) {
      filter += `&filters[categ][$eq]=${filters.value.categ}`
    }
    if (filters.value?.action) {
      filter += `&filters[action][$eq]=${filters.value.action}`
    }
    if (filters.value?.like) {
      filter += `&filters[like][$eq]=${filters.value.like}`
    }

    const sort = filters?.value!.sort ? `?sort=${filters.value.sort}:${filters.value.order}` : ''
    const filterSort = sort + filter ?? ''

    return http
      .get<Array<any>>('medias' + filterSort)
      .then((response: any) => {
        const result = response.data.data.filter((media: any) => {
          return media.attributes.user === user
        })
        filteredList.value = result
        return result
      })
      .catch((error) => notification.addNotification({ type: 'error', message: error.response }))
  }

  async function addUserMedia(media: any): Promise<any> {
    return http
      .post(`medias`, { data: media })
      .then((response) => {
        notification.addNotification({ type: 'alert', message: 'Media added !' })
        getFilteredMediaByUser(user.connectedUser.username)
        getMediaByUser(user.connectedUser.username)
        return response.data
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
        return error.response
      })
  }

  async function editUserMedia(media: any): Promise<any> {
    return http
      .put(`medias/${media.id}`, { data: media })
      .then((response) => {
        notification.addNotification({ type: 'alert', message: 'Media edited !' })
        getFilteredMediaByUser(user.connectedUser.username)
        return response.data
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: 'oops wrong media !!' })
        return error.response
      })
  }

  async function deleteUserMedia(id: number): Promise<any> {
    return http
      .delete(`medias/${id}`)
      .then(() => {
        notification.addNotification({ type: 'alert', message: 'Media deleted !' })
        getMediaByUser(user.connectedUser.username)
        getFilteredMediaByUser(user.connectedUser.username)
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
      })
  }

  async function updateFilters(newFilters: FilterModel): Promise<any> {
    filters.value = newFilters
    getFilteredMediaByUser(user.connectedUser.username)
  }

  return {
    list,
    filteredList,
    filters,
    updateFilters,
    getFilteredMediaByUser,
    getMediaByUser,
    getMediaByUserAndName,
    addUserMedia,
    editUserMedia,
    deleteUserMedia
  }
})
