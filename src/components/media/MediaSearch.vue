<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWiki } from '@/stores/wiki'
import { useMediaStore } from '@/stores/media'

import type { MediaModel } from '@/models/media.model'

import MediaUpdate from '@/components/media/MediaUpdate.vue'
import MediaComponent from './MediaComponent.vue'
import MediaSimple from './MediaSimple.vue'
import { storeToRefs } from 'pinia'
import { MediaActions } from '@/data/media-actions'
import { useMediaFormStore } from '@/stores/media.form'
import type { WikiSearchModel } from '@/models/wiki-search.model'

const { getWikiByname } = useWiki()
const { getMediaByTitle } = useMediaStore()
const { mediaSearch } = storeToRefs(useMediaStore())
const { mediaFormActive } = storeToRefs(useMediaFormStore())
const { resetActive, toggleActive } = useMediaFormStore()

let wikiList: Ref<MediaModel[]> = ref([])
let mediaList: Ref<MediaModel[]> = ref([])
const createOrUpdate: Ref<MediaActions> = ref(MediaActions.EDIT)
const selectedLibraryMedia: ComputedRef<MediaModel | null> = computed(() => mediaList.value.find(media => media.id === mediaFormActive.value) ?? null)
const selectedWikiMedia: Ref<MediaModel | null> = ref(null)
const selectedMedia: Ref<MediaModel | null> = computed(() => createOrUpdate.value === MediaActions.CREATE ? selectedWikiMedia.value : selectedLibraryMedia.value)

watchDebounced(
  mediaSearch, () => {
    resetResults()
    getResults(mediaSearch.value)
  },
  { debounce: 600, maxWait: 1200 }
)

function resetResults() {
  mediaList.value = []
  wikiList.value = []
  resetActive()
}

async function getResults(value: string): Promise<MediaModel[][] | null> {
  if (!value) return null

  return await getWikiByname(value).then((data: WikiSearchModel[] | null) => {
    getMediaByTitle(value).forEach((element) => mediaList.value.push(element))
    wikiList.value = data?.filter((wiki: WikiSearchModel) =>
      !mediaList.value.map(media => media.key).includes(wiki.key)) ?? []
    return [wikiList.value, mediaList.value]
  })
}

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    mediaSearch.value = ''
  }
})

function upsertMedia(media: MediaModel, action: MediaActions) {
  createOrUpdate.value = action
  if (action === MediaActions.CREATE) {
    toggleActive(media.id)
    selectedWikiMedia.value = media
  }
}
</script>

<template>
  <transition name="fade">
    <div class="wrapper-search">
      <div class="results" v-if="!mediaFormActive">
        <div class="medias" v-if="mediaList.length">
          <MediaComponent v-for="media of mediaList" :media="media" :key="media.id"
                          @click="upsertMedia(media, MediaActions.EDIT)" />
        </div>
        <div class="medias" v-if="wikiList.length">
          <MediaSimple v-for="(media, index) of wikiList" :key="index" :media="media"
                       @click="upsertMedia(media, MediaActions.CREATE)" />
        </div>
      </div>
      <div class="results" v-else>
        <div class="medias">
          <MediaUpdate v-if="selectedMedia" :media="selectedMedia" :action="createOrUpdate" :key="mediaFormActive" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.wrapper-search {
  width: 100%;
  display: flex;
  min-height: 100%;
  padding: 1rem 0;
}

.results {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 0.25rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.25rem 1rem 1rem;
}

.medias {
  width: max(40vw, 45rem);
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  border-radius: 1.5rem;
  animation: fade 0.3s ease-in-out;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 1250px) {
  .wrapper-search {
    width: 100%;
    padding: 0.25rem 0 0;
  }

  .medias {
    width: 100%;
    min-width: 0;
  }

  .results {
    flex-flow: column;
    justify-content: flex-start;
  }

  .collection {
    height: 100%;
    overflow: hidden;
  }
}
</style>
