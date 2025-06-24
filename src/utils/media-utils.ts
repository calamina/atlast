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
      action: 'completed',
      categ: 'movie',
      key: wiki.titles.canonical,
    }
  }

  function mediaToMediaForm(media: MediaModel) {
    return {
      id: media?.id,
      title: media?.title,
      url: media?.url,
      description: media?.description,
      tagstring: media?.tags?.join(' '),
      categ: media?.categ,
      action: media?.action,
      score: media?.score,
      like: media?.like,
      extract: media?.extract,
      image: media?.image,
      key: media?.key
    }
  }

  function setNewMediaProperties(media: MediaModel): MediaModel {
    if (media.action === 'planning') media.score = 0
    media.tags = media.tagstring ? media.tagstring.split(' ') : null
    media.createdAt = new Date()
    return media
  }

  return {
    wikiToMedia,
    mediaToMediaForm,
    setNewMediaProperties,
  }
}