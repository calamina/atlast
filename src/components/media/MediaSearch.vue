<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWikiService } from '@/services/wiki.service'

import FormInput from '@/components/form/formInput.vue'
import type { MediaModel } from '@/models/media.model'
import MediaUpdateComponent from './MediaUpdateComponent.vue'
import IconBack from '../icons/IconBack.vue'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWikiService()

let wikiList: Ref<any[]> = ref([])
let search = ref('')
const activeMedia: Ref<MediaModel | null> = ref(null)

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
    search.value ? getWikis(search.value) : (wikiList.value = [])
  },
  { debounce: 500, maxWait: 1000 }
)

async function getWikis(value: string) {
  wikiList.value = []
  getWikiByname(value).then((data) => {
    data.pages?.forEach((element: any) => {
      if (element.description) {
        wikiList.value.push(element)
      }
    })
  })
}

const ctrl = useKeyModifier('Control')
onKeyStroke(['Escape'], (e) => {
  if (ctrl.value || e.key === 'Escape') {
    e.preventDefault()
    emits('exit')
  }
})

function addMedia(media: MediaModel) {
  activeMedia.value = media
}

function cancelAdd() {
  activeMedia.value = null
  searchFocus()
}
</script>

<template>
  <div class="wrapper-search">
    <div class="search" v-if="!activeMedia">
      <FormInput v-model="search" :type="'text'" :name="'search'" :show-label="false" />
    </div>
    <div class="links" v-if="wikiList.length !== 0 && !activeMedia">
      <TransitionGroup name="list">
        <div class="link" v-for="(link, index) of wikiList" :key="index" @click="addMedia(link)">
          <img class="link__image" :src="link.thumbnail?.url" alt=":(" />
          <div class="link__content">
            <a
              class="link__link"
              :href="`http://en.wikipedia.com/wiki/${link.key}`"
              target="_blank"
            >
              {{ link.title }}</a
            >
            <p class="link__description">{{ link.description }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <!-- <MediaNewComponent
      v-if="activeMedia"
      :media="activeMedia"
      @add="$emit('exit')"
      @cancel="cancelAdd()"
    /> -->
    <button class="link__back" v-if="activeMedia" @click="cancelAdd()">
      <IconBack class="button-icon" />
      back to search
    </button>
    <MediaUpdateComponent
      v-if="activeMedia"
      :media="activeMedia"
      :action="'createMedia'"
      @confirm="$emit('exit')"
      @cancel="cancelAdd()"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-search {
  display: flex;
  flex-flow: column;
  width: 50rem;
  gap: 2rem;
}

.search {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}

.links {
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
}

.link {
  display: flex;
  flex-flow: row;
  padding: 0.5rem;
  cursor: pointer;
  gap: 1rem;
  border-radius: 1rem;

  &:hover {
    background-color: #efefef;
  }
}

.link__link {
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

.link__content {
  display: flex;
  flex-flow: column;
  gap: 0;
  flex: 1;
}

.link__image {
  background-color: #ddd;
  outline: none;
  border: none;
  height: 3rem;
  width: 3rem;
  border-radius: 0.75rem;
  object-fit: contain;
}

.link__back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  width: fit-content;
  padding-right: 1rem;
  border-radius: 2rem;
  font-family: 'contaxBold', Arial, sans-serif;
}

.button-icon {
  // background-color: #fff;
  border-radius: 100%;
}

.link__description {
  opacity: 0.7;
  font-family: 'contaxItalic', Arial, sans-serif;
}

// TRANSITION
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  opacity: 0;
}
</style>
