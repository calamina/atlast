import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

export const useMediaStore = defineStore('media', () => {
  const list: Ref<Array<any>> = ref([])
  const filteredList: Ref<Array<any>> = ref([])

  const notification = useNotificationStore()
  const user = useUserStore()

  async function getMedia(): Promise<any> {
    return http
      .get<Array<any>>('/medias')
      .then((response: any) => {
        return response.data
      })
      .catch((error) => notification.addNotification({ type: 'error', message: error.response }))
  }

  async function getMediaByUser(user: string): Promise<any> {
    return http
      .get<Array<any>>('medias?sort=createdAt:desc')
      .then((response: any) => {
        const result = response.data.data.filter((media: any) => {
          return media.attributes.user === user
        })
        list.value = result
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
        notification.addNotification({ type: 'alert', message: 'Media added !' })
        getMediaByUser(user.connectedUser.username)
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
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
      })
  }

  return {
    list,
    filteredList,
    getMedia,
    getMediaByUser,
    addUserMedia,
    editUserMedia,
    deleteUserMedia
  }
})
