import router from '@/router'
import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const notification = useNotificationStore()

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

async function registerUser(username: string, email: string, password: string): Promise<any> {
  return http
    .post('auth/local/register', {
      username,
      email,
      password
    })
    .then((response) => {
      user.connectedUser = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
      notification.alert('User created: ' + response.data.user.username)
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
      router.push('/')
      user.connectedUser = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
      notification.alert('User connected: ' + response.data.user.username)
    })
    .catch((error) => {
      notification.error(error.response)
    })
}

export function useUserService() {
  return {
    getUsers,
    loginUser,
    registerUser
  }
}
