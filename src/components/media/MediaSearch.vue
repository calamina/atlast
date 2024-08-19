<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWiki } from '@/stores/wiki'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'

import type { MediaModel } from '@/models/media.model'

import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaComponent from './MediaComponent.vue'
import MediaSimple from './MediaSimple.vue'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWiki()
const { connectedUser } = useUserStore()
const mediastore = useMediaStore()
const { mediaSearch } = storeToRefs(mediastore)

let wikiList: Ref<MediaModel[]> = ref([])
let mediaList: Ref<MediaModel[]> = ref([])
const activeMedia: Ref<MediaModel | null> = ref(null)
const createOrUpdate: Ref<string> = ref('')

watchDebounced(
  mediaSearch,
  () => {
    activeMedia.value = null
    mediaSearch.value ? getResults(mediaSearch.value) : ((wikiList.value = []), (mediaList.value = []))
  },
  { debounce: 600, maxWait: 1200 }
)

async function getResults(value: string) {
  mediaList.value = []
  wikiList.value = []

  const mediaTemp: MediaModel[] = []

  mediastore.getMediaByUserAndName(connectedUser!.username, value)
  .then((data: MediaModel[]) => {
    data?.forEach((element) => {
      element.attributes.id = element.id
      mediaTemp.push(element.attributes)
      // mediaList.value.push(element.attributes)
    })
  })
  .then(() =>
    getWikiByname(value).then((data: any) => {
      const mediaListKeys = new Set(mediaList.value.map((el) => el.key))
      wikiList.value = data.filter(({ key }: { key: string }) => !mediaListKeys.has(key))
      mediaList.value = [...mediaTemp]
    })
  )
}

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emits('exit')
  }
})

function upsertMedia(media: MediaModel, action: string) {
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
          @enableEdit="upsertMedia(media, 'editMedia')" />
        </div>
        <div class="medias" v-if="wikiList.length">
          <MediaSimple v-for="(media, index) of wikiList" :key="index" :media="media"
            @click="upsertMedia(media, 'createMedia')" />
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
  // flex-flow: column;
  // align-items: center;
  justify-content: center;
  gap: 0.5rem;
  // background-color: var(--background);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.medias {
  // width: 45rem;
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
