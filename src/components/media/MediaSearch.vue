<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWikiService } from '@/services/wiki.service'
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'

import type { MediaModel } from '@/models/media.model'

import actions from '@/utils/media-actions'

import IconBack from '@/components/icons/IconBack.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import FormInput from '@/components/form/formInput.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaComponent from './MediaComponent.vue'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWikiService()
const mediaStore = useMediaStore()
const { connectedUser } = useUserStore()

let wikiList: Ref<MediaModel[]> = ref([])
let mediaList: Ref<MediaModel[]> = ref([])
let search = ref('')
const activeMedia: Ref<MediaModel | null> = ref(null)
const createOrUpdate: Ref<string> = ref('')

function getStatus(media: MediaModel) {
  return actions.find((action: { name: string }) => action.name === media.action)
}

onMounted(() => {
  searchFocus()
})

function searchFocus() {
  const search = document.getElementById('search') as HTMLInputElement
  search?.focus()
  search?.select()
}

watchDebounced(
  search,
  () => {
    search.value ? getResults(search.value) : ((wikiList.value = []), (mediaList.value = []))
  },
  { debounce: 500, maxWait: 1000 }
)

async function getResults(value: string) {
  mediaList.value = []
  wikiList.value = []

  mediaStore.getMediaByUserAndName(connectedUser.username, value).then((data: MediaModel[]) => {
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

function cancelAdd() {
  activeMedia.value = null
  searchFocus()
}
</script>

<template>
  <div class="wrapper-search">
    <!-- <FormInput
      v-if="!activeMedia"
      class="search"
      v-model="search"
      :type="'text'"
      :name="'search'"
      :show-label="false"
    /> -->
    <div v-if="!activeMedia" class="media__search" @click="cancelAdd()">
      <IconSearch class="button-icon" />
      <input type="text" name="search" v-model="search" id="search" />
    </div>
    <div class="results" v-if="(wikiList.length || mediaList.length) && !activeMedia">
      <MediaComponent
        class="background__media"
        v-for="media of mediaList"
        :media="media"
        :key="media.id"
        @enableEdit="addMedia(media, 'editMedia')"
      />
      <div class="medias" v-if="wikiList.length">
        <h2></h2>
        <div
          class="mediaSimple"
          v-for="(media, index) of wikiList"
          :key="index"
          @click="addMedia(media, 'createMedia')"
        >
          <img class="media__image" :src="media.thumbnail?.url" alt=":(" />
          <div class="media__content">
            <a
              class="media__link"
              :href="`http://en.wikipedia.com/wiki/${media.key}`"
              target="_blank"
            >
              {{ media.title }}</a
            >
            <p class="media__description">{{ media.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <button class="media__back" v-if="activeMedia" @click="cancelAdd()">
      <IconBack class="button-icon" />
      back to search
    </button>
    <MediaUpdateComponent
      v-if="activeMedia"
      :media="activeMedia"
      :action="createOrUpdate"
      :key="activeMedia.key"
      @confirm="$emit('exit')"
      @cancel="cancelAdd()"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-search {
  display: flex;
  flex-flow: column;
  gap: 2rem;
  align-items: center;
  display: flex;
  flex-flow: column;
  min-height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
}

.media__search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  width: fit-content;
  padding: 0 0.5rem;
  border-radius: 3rem;
  // overflow-x: hidden;
  width: 25rem;
  height: 3rem;

  input[type='text'] {
    border-radius: 3rem;
    height: 3rem;
    font-family: 'contaxBold', Arial, sans-serif;
  }
}

.background__media {
  background-color: #fff;
}

.results {
  width: 45rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.medias {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &__collection {
    overflow-y: visible;
  }
}

.mediaSimple {
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 1rem;

  &:hover {
    background-color: #efefef;
  }
}

.media__categ {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.25rem;
  height: 1.75rem;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  width: 6rem;
  font-family: 'contaxBold', Arial, sans-serif;
  background-color: #ddd;
  border-radius: 1rem;
  cursor: default;
}

.media__status {
  height: 1.75rem;
  padding: 0.25rem;
  border-radius: 1rem;
}

.media__link {
  display: flex;
  line-height: 1.4rem;
  flex-flow: column;
  text-decoration: none;
  color: black;
  width: fit-content;
  font-weight: 400;
  font-size: 1.25rem;
  text-transform: capitalize;
  font-family: 'contaxBold', Arial, sans-serif;
}

.media__content {
  display: flex;
  flex-flow: column;
  gap: 0;
  flex: 1;
}

.media__image {
  background-color: #ddd;
  outline: none;
  border: none;
  height: 3rem;
  width: 3rem;
  border-radius: 0.75rem;
  object-fit: contain;
}

.media__back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  width: fit-content;
  padding-right: 1.5rem;
  border-radius: 3rem;
  height: 3rem;
  font-family: 'contaxBold', Arial, sans-serif;
}

.button-icon {
  // background-color: #fff;
  border-radius: 100%;
}

.media__description {
  opacity: 0.7;
  font-family: 'contaxItalic', Arial, sans-serif;
}
</style>
