<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWiki } from '@/stores/wiki'
import { useMediaStore } from '@/stores/media'

import type { MediaModel } from '@/models/media.model'

import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaComponent from './MediaComponent.vue'
import MediaSimple from './MediaSimple.vue'
import { storeToRefs } from 'pinia'
import type { WikiGetModel } from '@/models/wiki-get.model'
import { MediaActions } from '@/data/media-actions'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWiki()
const { getMediaByTitle } = useMediaStore()
const { mediaSearch } = storeToRefs(useMediaStore())

let wikiList: Ref<MediaModel[]> = ref([])
let mediaList: Ref<MediaModel[]> = ref([])
const activeMedia: Ref<MediaModel | null> = ref(null)
const createOrUpdate: Ref<MediaActions> = ref(MediaActions.CREATE)

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
  activeMedia.value = null
}

async function getResults(value: string): Promise<void> {
  if (!value) return

  await getWikiByname(value).then((data: any) => {
    getMediaByTitle(value).forEach((element) => mediaList.value.push(element))
    wikiList.value = data.filter((wiki: WikiGetModel) =>
      !mediaList.value.map(media => media.key).includes(wiki.key))
  })
}

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emits('exit')
  }
})

function upsertMedia(media: MediaModel, action: MediaActions) {
  activeMedia.value = media
  createOrUpdate.value = action
}
</script>

<template>
  <transition name="fade">
    <div class="wrapper-search">
      <div class="results" v-if="!activeMedia">
        <div class="medias" v-if="mediaList.length">
          <MediaComponent v-for="media of mediaList" :media="media" :key="media.id"
            @enableEdit="upsertMedia(media, MediaActions.EDIT)" />
        </div>
        <div class="medias" v-if="wikiList.length">
          <MediaSimple v-for="(media, index) of wikiList" :key="index" :media="media"
            @click="upsertMedia(media, MediaActions.CREATE)" />
        </div>
      </div>
      <div class="results" v-else>
        <div class="medias">
          <MediaUpdateComponent :media="activeMedia" :action="createOrUpdate" :key="activeMedia.key"
            @confirm="$emit('exit')" @cancel="activeMedia = null" />
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
    padding: 2rem 1rem 5rem;
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
