import http from '@/utils/http-common'
import type { WikiGet } from '@/models/wiki-get'
import { useNotificationStore } from '@/stores/notification'
import { useLoadingStore } from '@/stores/loading'

const notification = useNotificationStore()
const { setLoading } = useLoadingStore()

const config = {
  headers: {
    'Api-User-Agent': 'Atlast : gbelliere@gmail.com'
  }
}

async function getWikiByLink(link: string): Promise<any> {
  setLoading(true)
  const title = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + link
  return http
    .get<WikiGet>(title)
    .then((response) => {
      setLoading(false)
      return response.data
    })
    .catch((error) => {
      setLoading(false)
      notification.addNotification({ message: error.response, type: 'error' })
    })
}

async function getWikiByname(name: string): Promise<any> {
  setLoading(true)
  return http
    .get<WikiGet>(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${name}&limit=30`, config)
    .then((response) => {
      setLoading(false)
      return response.data
    })
    .catch((error) => {
      setLoading(false)
      notification.addNotification({ message: error.response, type: 'error' })
    })
}

export function useWikiService() {
  return {
    getWikiByLink,
    getWikiByname
  }
}
