import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'

export const useUserStore = defineStore('users', () => {
  const connectedUser: any = ref(null)
  const connectedUserToken = ref('')

  const notification = useNotificationStore()
  const user = useUserStore()

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
        user.connectedUser = response.data.user
        notification.alert('User created: ' + user.connectedUser.username)
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
        user.connectedUser = response.data.user
        notification.alert('User connected: ' + user.connectedUser.username)
        router.push('/')
      })
      .catch((error) => {
        notification.error(error.response)
      })
  }

  function logoutUser() {
    user.connectedUser = null
    notification.alert('User disconnected')
    router.push('auth')
  }

  return { connectedUser, connectedUserToken, loginUser, logoutUser, registerUser }
})
