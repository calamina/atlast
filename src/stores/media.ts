import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

import http from '@/utils/http-common'
import { errorMessage, errorsMessages } from '@/utils/error-manager'
import strings from '@/utils/strings'

import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
import { useLoadingStore } from '@/stores/loading'

export const useMediaStore = defineStore('media', () => {
  const filteredList: Ref<Array<MediaModel>> = ref([])
  const count: Ref<number> = ref(0)
  const filteredCount: Ref<number> = ref(0)
  const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'desc' })
  const mediaSearch: Ref<string> = ref('')
  const pagination: Ref<{ page: number, pageCount: number }> = ref({ page: 1, pageCount: 1 });

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
        `medias?filters[title][$containsi]=${name}&filters[user][$eq]=${user}`,
        headers)
      .then((response: any) => {
        setLoading(false)
        return response.data.data
      })
      .catch((error) => manageError(error, 'failed to get media', strings.SAD))
  }

  async function getMediaByUser(user: string, page?: number): Promise<MediaModel[]> {
    const query = page ?
      'medias?sort=createdAt:desc&filters[user][$eq]=' + user + '&pagination[page]=' + page :
      'medias?sort=createdAt:desc&filters[user][$eq]=' + user

    setLoading(true)
    return http
      .get<Array<any>>(query, headers)
      .then((response: any) => {
        count.value = response.data?.meta?.pagination?.total
        pagination.value.pageCount = response.data?.meta?.pagination?.pageCount
        setLoading(false)
        return response.data.data
      })
      .catch((error) => manageError(error, 'failed to get media', strings.SAD))
  }

  async function getFilteredMediaByUser(user: string, reload: boolean, page?: number): Promise<any> {
    if (reload) setLoading(true)
    let filter: string = `&filters[user][$eq]=${user}`
    if (filters.value?.categ) {
      filter += `&filters[categ][$eq]=${filters.value.categ}`
    }
    if (filters.value?.status) {
      filter += `&filters[action][$eq]=${filters.value.status}`
    }
    if (filters.value?.like) {
      filter += `&filters[like][$eq]=${filters.value.like}`
    }
    if (filters.value?.tag) {
      filter += `&filters[tags][$contains]=${filters.value.tag}`
    }
    if (page) {
      filter += `&pagination[page]=${page}`
    }

    const sort = filters?.value!.sort ? `?sort=${filters.value.sort}:${filters.value.order}` : ''
    const filterSort = sort + filter ?? ''

    return http
      .get<Array<any>>('medias' + filterSort, headers)
      .then((response: any) => {
        if (reload) setLoading(false)
        filteredList.value = response.data.data
        filteredCount.value = response.data?.meta?.pagination?.total
        pagination.value.pageCount = response.data?.meta?.pagination?.pageCount
        if (pagination.value.pageCount === 1) {
          pagination.value.page = 1
        }
        return response.data.data
      })
      .catch((error) => manageError(error, 'failed to get media', strings.SAD))
  }

  async function addUserMedia(media: any): Promise<any> {
    return http
      .post(`medias`, { data: media }, headers)
      .then(() => updateUserMedia('media added', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to add media', strings.SAD))
  }

  async function editUserMedia(media: any): Promise<any> {
    return http
      .put(`medias/${media.id}`, { data: media }, headers)
      .then(() => updateUserMedia('media edited', strings.HAPPY))
      .catch((error) => manageError(error, 'failed to edit media', strings.SAD))
  }

  async function deleteUserMedia(id: number): Promise<any> {
    return http
      .delete(`medias/${id}`, headers)
      .then(() => updateUserMedia('media deleted', strings.HAPPY))
      .catch((error) => manageError(error, "failed to delete media", strings.SAD))
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
    pagination.value.page = 1
    getFilteredMediaByUser(user, true)
  }

  function manageError(error: any, message: string, kao: string): void {
    notification.addNotification(message, kao)
    errorsMessages(error).length ?
      notification.addErrorsNotifications(errorsMessages(error)) :
      notification.addErrorNotification(errorMessage(error))
  }

  function updateUserMedia(message: string, kao: string): void {
    notification.addNotification(message, kao)
    getFilteredMediaByUser(user.connectedUser!.username, false)
  }

  return {
    pagination,
    count,
    filteredCount,
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
    mediaSearch,
  }
})
