import { MediaActions } from '@/data/media-actions'
import type { MediaModel } from '@/models/media.model'
import { useMediaUtils } from '@/utils/media-utils'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useWiki } from './wiki'
import type { StatusNameModel } from '@/models/status.model'
import type { CategNameModel } from '@/models/categ.model'

const { mediaToMediaForm } = useMediaUtils()
const { getWikiByLink } = useWiki()

export const useMediaFormStore = defineStore('mediaForm', () => {
  const mediaForm: Ref<Partial<MediaModel>> = ref({})
  const mediaFormActive: Ref<number | null> = ref(null)

  async function setupMediaForm(media: MediaModel, action: MediaActions): Promise<void> {
    if (action === MediaActions.EDIT) {
      mediaToMediaForm(media)
        .then(data => mediaForm.value = data ?? {})
    } else
      getWikiByLink(media.key!)
        .then(data => mediaForm.value = data ?? {})
  }

  function setStatus(status: StatusNameModel) {
    mediaForm.value.status = status
  }

  function toggleActive(id: number): void {
    mediaFormActive.value = mediaFormActive.value === id ? null : id
  }

  function resetActive(): void {
    mediaFormActive.value = null
  }

  function setCateg(categ: CategNameModel) {
    mediaForm.value.categ = categ
  }

  function setFavorite() {
    mediaForm.value.like = !mediaForm.value.like
  }

  function setScore(score: number) {
    mediaForm.value.score = score
  }

  return {
    mediaForm,
    setupMediaForm,
    setStatus,
    setCateg,
    setFavorite,
    setScore,
    mediaFormActive,
    toggleActive,
    resetActive,
  }
})
