import type { MediaModel } from '@/models/media.model'
import type { WikiGetModel } from '@/models/wiki-get.model'
import type { WikiList, WikiSearchModel } from '@/models/wiki-search.model'
import { useNotificationStore } from '@/stores/notification'
import { useMediaUtils } from '@/utils/media-utils'
import strings from '@/utils/strings'
import axios from 'axios'

const notification = useNotificationStore()
const { wikiToMedia } = useMediaUtils()

async function getWikiByLink(link: string): Promise<MediaModel | null> {
  const title = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + link
  return await axios
    .get<WikiGetModel>(title)
    .then((response) => wikiToMedia(response.data))
    .catch((error) => {
      notification.addNotification('Can\'t get wikis', strings.SAD)
      notification.addErrorNotification(error)
      return null
    })
}

async function getWikiByname(name: string): Promise<WikiSearchModel[] | null> {
  return axios
    .get<WikiList>(`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${name}&limit=30`)
    .then((response) => response.data.pages)
    .catch((error) => {
      notification.addNotification('Can\'t get wikis', strings.SAD)
      notification.addErrorNotification(error)
      return null
    })
}

export function useWiki() {
  return {
    getWikiByLink,
    getWikiByname
  }
}
