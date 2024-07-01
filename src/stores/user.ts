import { useNotificationStore } from '@/stores/notification'
import { useMediaStore } from '@/stores/media'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import router from '@/router/index'
import http from '@/utils/http-common'
import type { UserModel } from '@/models/user.model'
import type { MediaModel } from '@/models/media.model'
import type { FilterModel } from '@/models/filter.model'

export const useUserStore = defineStore('users', () => {
  const notification = useNotificationStore()
  const storedUser: string | null = localStorage.getItem('user')
  const storedUserToken: string | null = localStorage.getItem('userToken')
  const connectedUser: Ref<UserModel | null> = ref(
    typeof storedUser === 'string' ? JSON.parse(storedUser) : null
  )
  const connectedUserToken: Ref<any> = ref(
    typeof storedUserToken === 'string' ? JSON.parse(storedUserToken) : null
  )
  const search: Ref<string> = ref('')

  const list: Ref<Array<MediaModel>> = ref([])
  const filteredList: Ref<Array<UserModel>> = ref([])
  const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'desc' })

  const headers = {
    headers: {
      Authorization: 'Bearer ' + connectedUserToken.value
    }
  }

  async function getUsers(): Promise<any> {
    return http
      .get<Array<any>>('users', headers)
      .then((response: any) => {
        return response.data.filter((user: any) => user.id !== connectedUser?.value?.id)
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: 'no users or error :(' })
      })
  }

  async function register({ username, email, password }: UserModel): Promise<any> {
    return http
      .post('auth/local/register', {
        username,
        email,
        password
      })
      .then((response) => {
        connectedUser.value = response.data.user
        localStorage.setItem('user', JSON.stringify(response.data.user))
        notification.addNotification({
          type: 'alert',
          message: 'User created: ' + response.data.user.username
        })
        router.push('/')
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: 'Wrong info :(' })
      })
  }

  async function login({ username, password }: UserModel) {
    http
      .post('auth/local', {
        identifier: username,
        password
      })
      .then((response) => {
        connectedUser.value = response.data.user
        connectedUserToken.value = response.data.jwt
        localStorage.setItem('user', JSON.stringify(response.data.user))
        localStorage.setItem('userToken', JSON.stringify(response.data.jwt))
        notification.addNotification({
          type: 'alert',
          message: 'Welcome back ' + response.data.user.username + ' :)'
        })
        router.push('/media/' + username)
      })
      .catch(() => {
        notification.addNotification({ type: 'error', message: 'Wrong login info :(' })
      })
  }

  async function logout() {
    router.push('/auth').then(() => {
      localStorage.removeItem('user')
      localStorage.removeItem('userToken')
      notification.addNotification({
        type: 'alert',
        message: 'Goodbye ' + connectedUser?.value?.username + ' !'
      })
      connectedUser.value = null
      connectedUserToken.value = null
      const media = useMediaStore()
      media.list = []
      media.filteredList = []
    })
  }

  function updateSearch(value: string) {
    search.value = value
  }

  return {
    connectedUser,
    connectedUserToken,
    getUsers,
    register,
    login,
    logout,
    updateSearch,
    list,
    filteredList,
    filters,
    search
  }
})
