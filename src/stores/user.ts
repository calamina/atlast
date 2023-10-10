import { useNotificationStore } from '@/stores/notification'
import { useMediaStore } from '@/stores/media'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import router from '@/router/index'
import http from '@/utils/http-common'
import type { User } from '@/models/user.model'

export const useUserStore = defineStore('users', () => {
  const notification = useNotificationStore()
  const storedUser: string | null = localStorage.getItem('user')
  const storedUserToken: string | null = localStorage.getItem('userToken')
  const connectedUser: Ref<any> = ref(
    typeof storedUser === 'string' ? JSON.parse(storedUser) : null
  )
  const connectedUserToken: Ref<any> = ref(
    typeof storedUserToken === 'string' ? JSON.parse(storedUserToken) : null
  )

  async function getUsers(): Promise<any> {
    return http
      .get<Array<any>>('users')
      .then((response) => {
        return response
      })
      .catch((error) => {
        notification.addNotification({ type: 'error', message: error.response })
      })
  }

  async function register({ username, email, password }: User): Promise<any> {
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

  async function login({ username, password }: User) {
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
        router.push('/media')
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

  return {
    connectedUser,
    connectedUserToken,
    getUsers,
    register,
    login,
    logout
  }
})
