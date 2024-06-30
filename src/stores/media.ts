import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

import http from '@/utils/http-common'

import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'

export const useMediaStore = defineStore('media', () => {
  const list: Ref<Array<MediaModel>> = ref([])
  const filteredList: Ref<Array<MediaModel>> = ref([])
  const count: Ref<number> = ref(0)
  const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'desc' })
  const search: Ref<string> = ref('')
  const pagination: Ref<{page: number, pageCount: number}> = ref({page: 1, pageCount: 1});

  const notification = useNotificationStore()
  const user = useUserStore()
  const { setLoading } = useLoadingStore()

  const headers = {
    headers: {
      Authorization: 'Bearer ' + user.connectedUserToken
    }
  }

  async function getMediaByUserAndName(user: string, name: string): Promise<any> {
    setLoading(true)
    return http
      .get<Array<any>>(
        'medias?filters[title][$containsi]=' + name + '&filters[user][$eq]=' + user,
        headers
      )
      .then((response: any) => {
        setLoading(false)
        return response.data.data
      })
      .catch((error) => {
        setLoading(false)
        notification.addNotification({ type: 'error', message: "Cannot get media :(" })
      })
  }

  async function getMediaByUser(user: string, page?: number): Promise<MediaModel[]> {
    const query = page ? 
    'medias?sort=createdAt:desc&filters[user][$eq]=' + user + '&pagination[page]=' + page : 
    'medias?sort=createdAt:desc&filters[user][$eq]=' + user

    setLoading(true)
    return http
      .get<Array<any>>(query, headers)
      .then((response: any) => {
        const result = response.data.data.filter((media: any) => media.attributes.user === user)
        list.value = result
        count.value = response.data?.meta?.pagination?.total
        pagination.value.pageCount = response.data?.meta?.pagination?.pageCount
        console.debug(response.data);
        console.debug(response);
        setLoading(false)
        return result
      })
      .catch((error) => {
        setLoading(false)
        notification.addNotification({ type: 'error', message: "Cannot get media :(" })
      })
  }

  async function getFilteredMediaByUser(user: string, reload: boolean): Promise<any> {
    if (reload) setLoading(true)
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
    if (filters.value?.tag) {
      filter += `&filters[tags][$contains]=${filters.value.tag}`
    }

    const sort = filters?.value!.sort ? `?sort=${filters.value.sort}:${filters.value.order}` : ''
    const filterSort = sort + filter ?? ''

    return http
      .get<Array<any>>('medias' + filterSort, headers)
      .then((response: any) => {
        if (reload) setLoading(false)
        const result = response.data.data.filter((media: any) => {
          return media.attributes.user === user
        })
        filteredList.value = result
        // count.value = response.data?.meta?.pagination?.total
        return result
      })
      .catch((error) => {
        if (reload) setLoading(false)
        notification.addNotification({ type: 'error', message: error.response })
      })
  }

  async function addUserMedia(media: any): Promise<any> {
    return http
      .post(`medias`, { data: media }, headers)
      .then((response) => {
        notification.addNotification({ type: 'alert', message: 'Media added !' })
        getFilteredMediaByUser(user.connectedUser!.username, false)
        count.value = response.data?.meta?.pagination?.total
        pagination.value.pageCount = response.data?.meta?.pagination?.pageCount
        return response.data
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
        return error.response
      })
  }

  async function editUserMedia(media: any): Promise<any> {
    return http
      .put(`medias/${media.id}`, { data: media }, headers)
      .then((response) => {
        notification.addNotification({ type: 'alert', message: 'Media edited !' })
        getFilteredMediaByUser(user.connectedUser!.username, false)
        return response.data
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: 'oops wrong media !!' })
        return error.response
      })
  }

  async function deleteUserMedia(id: number): Promise<any> {
    return http
      .delete(`medias/${id}`, headers)
      .then((response) => {
        notification.addNotification({ type: 'alert', message: 'Media deleted !' })
        getFilteredMediaByUser(user.connectedUser!.username, false)
        count.value = response.data?.meta?.pagination?.total
        pagination.value.pageCount = response.data?.meta?.pagination?.pageCount
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
        return error.response
      })
  }

  async function updateFilters(newFilters: FilterModel, user: string): Promise<any> {
    filters.value = newFilters
    getFilteredMediaByUser(user, true)
  }

  async function resetFilters(user: string): Promise<any> {
    filters.value.action = null
    filters.value.categ = null
    filters.value.like = null
    filters.value.tag = null
    getFilteredMediaByUser(user, true)
  }

  function updateSearch(value: string) {
    search.value = value
  }

  return {
    pagination,
    count,
    list,
    filteredList,
    filters,
    updateFilters,
    resetFilters,
    getFilteredMediaByUser,
    getMediaByUser,
    getMediaByUserAndName,
    addUserMedia,
    editUserMedia,
    deleteUserMedia,
    search,
    updateSearch
  }
})
