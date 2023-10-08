<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWikiService } from '@/services/wiki.service'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'

import type { MediaModel } from '@/models/media.model'

import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaComponent from './MediaComponent.vue'
import MediaSimple from './MediaSimple.vue'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWikiService()
const { connectedUser } = useUserStore()
const mediastore = useMediaStore()
const { search } = storeToRefs(mediastore)

let wikiList: Ref<MediaModel[]> = ref([])
let mediaList: Ref<MediaModel[]> = ref([])
const activeMedia: Ref<MediaModel | null> = ref(null)
const createOrUpdate: Ref<string> = ref('')

watchDebounced(
  search,
  () => {
    activeMedia.value = null
    search.value ? getResults(search.value) : ((wikiList.value = []), (mediaList.value = []))
  },
  { debounce: 600, maxWait: 1200 }
)

async function getResults(value: string) {
  mediaList.value = []
  wikiList.value = []

  mediastore.getMediaByUserAndName(connectedUser.username, value).then((data: MediaModel[]) => {
    data?.forEach((element) => {
      element.attributes.id = element.id
      mediaList.value.push(element.attributes)
    })
  })

  getWikiByname(value).then((data) => {
    const mediaListKeys = new Set(mediaList.value.map((el) => el.key))
    wikiList.value = data.pages.filter(({ key }: { key: string }) => !mediaListKeys.has(key))
  })
}

const ctrl = useKeyModifier('Control')
onKeyStroke(['Escape'], (e) => {
  if (ctrl.value || e.key === 'Escape') {
    e.preventDefault()
    emits('exit')
  }
})

function addMedia(media: MediaModel, action: string) {
  activeMedia.value = media
  createOrUpdate.value = action
}
</script>

<template>
  <div class="wrapper-search">
    <div class="results" v-if="!activeMedia">
      <div class="collection" v-if="mediaList.length">
        <MediaComponent
          v-for="media of mediaList"
          class="background__media"
          :media="media"
          :key="media.id"
          @enableEdit="addMedia(media, 'editMedia')"
        />
      </div>
      <div class="medias" v-if="wikiList.length">
        <MediaSimple
          v-for="(media, index) of wikiList"
          :key="index"
          :media="media"
          @click="addMedia(media, 'createMedia')"
        />
      </div>
      <!-- <div class="medias" v-if="!mediaList.length && !wikiList.length">
        TODO: separate no results / loading
        <p>No results</p>
      </div> -->
    </div>
    <MediaUpdateComponent
      v-if="activeMedia"
      :media="activeMedia"
      :action="createOrUpdate"
      :key="activeMedia.key"
      @confirm="$emit('exit')"
      @cancel="activeMedia = null"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-search {
  display: flex;
  gap: 2rem;
  align-items: center;
  display: flex;
  flex-flow: column;
  min-height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  // overflow-y: auto;
  // -ms-overflow-style: none;
  // scrollbar-width: none;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
}

.background__media {
  background-color: #fff;
}

.collection {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.results {
  // width: 45rem;
  // flex-flow: column;
  display: flex;
  gap: 1rem;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.medias {
  width: 45rem;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
