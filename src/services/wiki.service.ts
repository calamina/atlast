import http from '@/utils/http-common'
import type { WikiGet } from '@/models/wiki-get'
import { useNotificationStore } from '@/stores/notification'

const notification = useNotificationStore()

const config = {
  headers: {
    'Api-User-Agent': 'Atlast : gbelliere@gmail.com'
  }
}

async function getWikiByLink(link: string): Promise<any> {
  const title = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + link
  return http
    .get<WikiGet>(title)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      notification.addNotification(error.response)
    })
}

async function getWikiByname(name: string): Promise<any> {
  return http
    .get<WikiGet>(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${name}&limit=30`, config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      notification.addNotification(error.response)
    })
}

export function useWikiService() {
  return {
    getWikiByLink,
    getWikiByname
  }
}
