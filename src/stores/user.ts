import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'

export const useUserStore = defineStore('users', () => {
  const connectedUser: any = ref(null)
  const connectedUserToken = ref('')

  const notification = useNotificationStore()

  async function getUsers(): Promise<any> {
    return http
      .get<Array<any>>('peeps')
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error
      })
  }

  async function registerUser(username: string, email: string, password: string) {
    http
      .post('auth/local/register', {
        username,
        email,
        password
      })
      .then((response) => {
        // console.log('User profile', response.data.user)
        // console.log('User token', response.data.jwt)
        connectedUser.value = response.data.user
        notification.alert('User created: ' + connectedUser.value.username)
        router.push('/')
      })
      .catch((error) => {
        notification.error(error.response)
      })
  }

  async function loginUser(login: string, password: string) {
    http
      .post('auth/local', {
        identifier: login,
        password
      })
      .then((response) => {
        connectedUser.value = response.data.user
        notification.alert('User connected: ' + connectedUser.value.username)
        router.push('/')
      })
      .catch((error) => {
        notification.error(error.response)
      })
  }

  function logoutUser() {
    connectedUser.value = null
    notification.alert('User disconnected')
    router.push('auth')
  }

  return { connectedUser, connectedUserToken, getUsers, loginUser, logoutUser, registerUser }
})
