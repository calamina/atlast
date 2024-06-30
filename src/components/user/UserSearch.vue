<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWikiService } from '@/services/wiki.service'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
// import { useLoadingStore } from '@/stores/loading'

import type { UserModel } from '@/models/user.model'

import UserComponent from './UserComponent.vue'
import { storeToRefs } from 'pinia'
import { MediaModel } from '@/models/media.model'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWikiService()
const { connectedUser } = useUserStore()
const mediastore = useMediaStore()
const { search } = storeToRefs(mediastore)
// const { loading } = storeToRefs(useLoadingStore())

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

  mediastore.getMediaByUserAndName(connectedUser!.username, value).then((data: MediaModel[]) => {
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
  <transition name="fade">
    <div class="wrapper-search">
      <div class="results" v-if="!activeMedia">
        <div class="medias" v-if="mediaList.length">
          <MediaComponent
            v-for="media of mediaList"
            class="background__media"
            :media="media"
            :key="media.id"
            @enableEdit="addMedia(media, 'editMedia')"
          />
        </div>
        <div class="medias media-small" v-if="wikiList.length">
          <MediaSimple
            v-for="(media, index) of wikiList"
            :key="index"
            :media="media"
            @click="addMedia(media, 'createMedia')"
          />
        </div>
      </div>
      <!-- TODO : display only when request finishes -->
      <!-- <div class="medias" v-if="!mediaList.length && !wikiList.length && !loading">
          <p>No results</p>
        </div> -->
      <div class="results" v-else>
      <!-- <div class="results" v-else :key="no"> -->
        <div class="medias">
          <MediaUpdateComponent
            :media="activeMedia"
            :action="createOrUpdate"
            :key="activeMedia.key"
            @confirm="$emit('exit')"
            @cancel="activeMedia = null"
          />
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
  padding: 2rem;
}

.background__media {
  background-color: #fff;
}

.results {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.5rem;
  background-color: #efefef;
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
  border-radius: 1.5rem;
  animation: fade 0.3s ease-in-out;
}

.media-small {
  padding: 0.5rem;
  background-color: #fff;
  gap: 0.25rem;
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
  }
  .collection {
    height: 100%;
    overflow: hidden;
  }
}
</style>
