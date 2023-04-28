import { ref } from 'vue'
// import router from '@/router'
import { useNotificationStore } from '@/stores/notification'

import http from '@/utils/http-common'

const notification = useNotificationStore()
const userConnected = ref<Array<any | null>>([])

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
      notification.alert('User created: ' + response.data.user.username)
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
      console.log('User profile', response.data.user)
      console.log('User token', response.data.jwt)
      notification.alert('User connected: ' + response.data.user.username)
    })
    .catch((error) => {
      notification.error(error.response)
    })
}

export function useUserService() {
  return {
    userConnected,
    getUsers,
    registerUser,
    loginUser
  }
}
