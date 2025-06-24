import type { MediaModel } from '@/models/media.model'
import type { WikiGet } from '@/models/wiki-get'
import { useNotificationStore } from '@/stores/notification'
import { useMediaUtils } from '@/utils/media-utils'
import strings from '@/utils/strings'
import axios from 'axios'

const notification = useNotificationStore()
const { wikiToMedia } = useMediaUtils()

async function getWikiByLink(link: string): Promise<MediaModel | void> {
  const title = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + link
  return axios
    .get<WikiGet>(title)
    .then((response) => wikiToMedia(response.data))
    .catch((error) => {
      notification.addNotification('Can\'t get wikis', strings.SAD)
      notification.addErrorNotification(error)
    })
}

async function getWikiByname(name: string): Promise<any> {
  return axios
    .get<any>(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${name}&limit=30`)
    .then((response) => response.data.pages)
    .catch((error) => {
      notification.addNotification('Can\'t get wikis', strings.SAD)
      notification.addErrorNotification(error)
    })
}

export function useWiki() {
  return {
    getWikiByLink,
    getWikiByname
  }
}
