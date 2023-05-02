import http from '@/utils/http-common'
import { useNotificationStore } from '@/stores/notification'
import { useLinkStore } from '@/stores/link'
import { useUserStore } from '@/stores/user'

const notification = useNotificationStore()
const linkstore = useLinkStore()
const user = useUserStore()

async function getLinks(): Promise<any> {
  return http
    .get<Array<any>>('/links')
    .then((response: any) => {
      return response.data
    })
    .catch((error) => notification.error(error.response))
}

async function getLinksByUser(user: string): Promise<any> {
  return http
    .get<Array<any>>('links')
    .then((response: any) => {
      const result = response.data.data.filter((link: any) => {
        return link.attributes.user === user
      })
      linkstore.list = result
      return result
    })
    .catch((error) => notification.error(error.response))
}

async function addUserLink(link: any): Promise<any> {
  return http
    .post(`links`, { data: link })
    .then((response) => {
      notification.alert('Link added !')
      getLinksByUser(user.connectedUser.username)
    })
    .catch((error) => {
      notification.error(error.response)
    })
}

async function deleteUserLink(id: number): Promise<any> {
  return http
    .delete(`links/${id}`)
    .then(() => {
      notification.alert('Link deleted !')
      getLinksByUser(user.connectedUser.username)
    })
    .catch((error) => {
      notification.error(error.response)
    })
}

export function useLinkService() {
  return {
    getLinks,
    getLinksByUser,
    deleteUserLink,
    addUserLink
  }
}
