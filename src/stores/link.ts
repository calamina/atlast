import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

import http from '@/utils/http-common'

import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

import type { linkModel } from '@/models/link.model'

export const useLinkStore = defineStore('links', () => {
  const notification = useNotificationStore()
  const user = useUserStore()

  const list: Ref<Array<linkModel>> = ref([])
  const filteredList: Ref<Array<linkModel>> = ref([])

  async function getLinks(): Promise<any> {
    return http
      .get<Array<any>>('/links')
      .then((response: any) => {
        return response.data
      })
      .catch((error) => notification.error(error.response))
  }

  async function getLinksByUser(user: string): Promise<any> {
    return http
      .get<Array<any>>('links?sort=createdAt:desc')
      .then((response: any) => {
        const result = response.data.data.filter((link: any) => {
          return link.attributes.user === user
        })
        list.value = result
        return result
      })
      .catch((error) => notification.error(error.response))
  }

  async function getFilteredLinksByUser(user: string, filters?: any): Promise<any> {
    const filter = filters?.category ? `?filters[category][$eq]=${filters.category}` : ''
    const sort = filters?.sort ? `sort=${filters.sort}:desc` : ''
    const filterSort = (filter ? filter + '&' : '?') + sort ?? ''

    return http
      .get<Array<any>>('links' + filterSort)
      .then((response: any) => {
        const result = response.data.data.filter((link: any) => {
          return link.attributes.user === user
        })
        filteredList.value = result
        return result
      })
      .catch((error) => notification.error(error.response))
  }

  async function addUserLink(link: any): Promise<any> {
    return http
      .post(`links`, { data: link })
      .then((response) => {
        notification.alert('Link added !')
        getLinksByUser(user.connectedUser.username)
        return response.data
      })
      .catch((error) => {
        notification.error('Incorrect data')
        return error.response
      })
  }

  async function editUserLink(link: any): Promise<any> {
    return http
      .put(`links/${link.id}`, { data: link })
      .then((response) => {
        notification.alert('Link updated !')
        getLinksByUser(user.connectedUser.username)
        return response.data
      })
      .catch((error) => {
        notification.error('Incorrect data')
        return error.response
      })
  }

  async function deleteUserLink(id: number): Promise<any> {
    return http
      .delete(`links/${id}`)
      .then(() => {
        notification.alert('Link deleted !')
        getLinksByUser(user.connectedUser.username)
      })
      .catch((error) => {
        notification.error(error.response)
      })
  }

  return {
    list,
    filteredList,
    getLinks,
    getLinksByUser,
    getFilteredLinksByUser,
    addUserLink,
    editUserLink,
    deleteUserLink
  }
})
