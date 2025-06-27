import type { FilterModel } from "@/models/filter.model"
import type { MediaModel } from "@/models/media.model"

export const useMediaUtils = () => {
  function wikiToMedia(wiki: any): MediaModel {
    return {
      id: wiki.id,
      title: wiki.title,
      url: wiki.content_urls?.desktop?.page,
      description: wiki.description,
      extract: wiki.extract,
      image: wiki.originalimage?.source,
      thumbnail: wiki.thumbnail?.source,
      score: 0,
      status: 'completed',
      categ: 'movie',
      key: wiki.titles.canonical,
    }
  }

  async function mediaToMediaForm(media: MediaModel): Promise<MediaModel> {
    return {
      id: media?.id,
      title: media?.title,
      url: media?.url,
      description: media?.description,
      tagstring: media?.tags?.join(' '),
      categ: media?.categ,
      status: media?.status,
      score: media?.score,
      like: media?.like,
      extract: media?.extract,
      image: media?.image,
      key: media?.key
    }
  }

  async function mediaFormToMedia(mediaForm: MediaModel): Promise<MediaModel> {
    if (mediaForm.status === 'planning') mediaForm.score = 0
    mediaForm.tags = mediaForm.tagstring ? mediaForm.tagstring.split(' ') : null
    return mediaForm
  }

  function setNewMediaProperties(media: MediaModel): MediaModel {
    if (media.status === 'planning') media.score = 0
    media.tags = media.tagstring ? media.tagstring.split(' ') : null
    media.createdAt = new Date()
    return media
  }

  function sortMediaByDate(media: MediaModel[]) {
    return media.sort((a, b) => {
      const aDate: number = a.updatedAt?.getTime() ?? a.createdAt?.getTime() ?? 0
      const bDate: number = b.updatedAt?.getTime() ?? b.createdAt?.getTime() ?? 0
      return aDate - bDate
    });
  }

  function sortMediaByTitle(media: MediaModel[]): MediaModel[] {
    return media.sort((a, b) => {
      const aTitle = a.title ?? ''
      const bTitle = b.title ?? ''
      return (aTitle > bTitle) ? 1 : ((bTitle > aTitle) ? -1 : 0)
    })

  }

  function sortMedia(media: MediaModel[], filters: FilterModel): MediaModel[] {
    if (filters.sort === 'date') {
      sortMediaByDate(media)
    }
    else if (filters.sort === 'score') {
      media.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
    }
    else if (filters.sort === 'title') {
      sortMediaByTitle(media)
    }

    return filters.order === 'desc' ? media.reverse() : media;
  }

  return {
    wikiToMedia,
    mediaToMediaForm,
    mediaFormToMedia,
    setNewMediaProperties,
    sortMedia
  }
}