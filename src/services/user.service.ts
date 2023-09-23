import router from '@/router/index'
import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'

const notification = useNotificationStore()
const user = useUserStore()

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
      notification.addNotification({
        type: 'alert',
        message: 'User created: ' + response.data.user.username
      })
      router.push('/')
    })
    .catch((error) => {
      notification.addNotification({ type: 'error', message: error.response })
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
      localStorage.setItem('user', JSON.stringify(response.data.user))
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

export function useUserService() {
  return {
    getUsers,
    loginUser,
    registerUser
  }
}
