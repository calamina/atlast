import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import router from '@/router'
import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'

export const useUserStore = defineStore('users', () => {
  const storedUser: string | null = localStorage.getItem('user')
  const connectedUser: Ref<any> = ref(
    typeof storedUser === 'string' ? JSON.parse(storedUser) : null
  )
  const connectedUserToken = ref('')

  const notification = useNotificationStore()

  function welcomeUser() {
    connectedUser.value
      ? notification.alert(`Welcome back ${connectedUser.value.username}`!)
      : console.log('no user yet')
  }

  async function getUsers(): Promise<any> {
    return http
      .get<Array<any>>('users')
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
        // console.log('User token', response.data.jwt)
        connectedUser.value = response.data.user
        localStorage.setItem('user', JSON.stringify(connectedUser.value))
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
        localStorage.setItem('user', JSON.stringify(connectedUser.value))
        notification.alert('User connected: ' + connectedUser.value.username)
        router.push('/')
      })
      .catch((error) => {
        notification.error(error.response)
      })
  }

  function logoutUser() {
    connectedUser.value = null
    localStorage.removeItem('user')
    notification.alert('User disconnected')
    router.push('auth')
  }

  return {
    connectedUser,
    connectedUserToken,
    getUsers,
    loginUser,
    logoutUser,
    registerUser,
    welcomeUser
  }
})
