import http from '@/utils/http-common'
import type { WikiGet } from '@/models/wiki-get'
import { useNotificationStore } from '@/stores/notification'
import strings from '@/utils/strings'
import { errorMessage, errorsMessages } from '@/utils/error-manager'

const notification = useNotificationStore()

const config = {
  headers: {
    'Api-User-Agent': 'Atlast : gbelliere@gmail.com'
  }
}

async function getWikiByLink(link: string): Promise<any> {
  const title = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + link
  return http
    // .get<any>(title)
    .get<WikiGet>(title)
    .then((response) => {
      const object = { 
          id: response.data.id,
          title: response.data.title,
          url: response.data.content_urls?.desktop?.page,
          description: response.data.description,
          extract: response.data.extract,
          image: response.data.originalimage?.source,
          thumbnail: response.data.thumbnail?.source,
          // key: response.data.key,
      }
      return object
    })
    .catch((error) => {
      notification.addNotification('can\'t get wikis', strings.SAD)
      errorsMessages(error).length ?
        notification.addErrorsNotifications(errorsMessages(error)) :
        notification.addErrorNotification(errorMessage(error))
    })
}

async function getWikiByname(name: string): Promise<any> {
  return http
    .get<any>(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${name}&limit=30`, config)
    .then((response) => {
      return response.data.pages
    })
    .catch((error) => {
      notification.addNotification('can\'t get wikis', strings.SAD)
        errorsMessages(error).length ?
          notification.addErrorsNotifications(errorsMessages(error)) :
          notification.addErrorNotification(errorMessage(error))
    })
}

export function useWiki() {
  return {
    getWikiByLink,
    getWikiByname
  }
}
