<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import { watchDebounced } from '@vueuse/shared'

import { useWikiService } from '@/services/wiki.service'

import MediaNewComponent from '@/components/media/MediaNewComponent.vue'

import iconCheck from '@/components/icons/IconCheck.vue'

const emits = defineEmits(['exit'])

const { getWikiByname } = useWikiService()

let wikiList: Ref<any[]> = ref([])
let searchBar = ref('')
const activeMedia = ref(null)

onMounted(() => {
  searchFocus()
})

function searchFocus() {
  const search = document.getElementById('search') as HTMLInputElement | any
  search?.focus()
  search?.select()
}

watchDebounced(
  searchBar,
  () => {
    searchBar.value ? getWikis(searchBar.value) : (wikiList.value = [])
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

function addMedia(media: any) {
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
      <input
        class="search__input"
        s
        type="text"
        name="search"
        v-model="searchBar"
        id="search"
        placeholder="search ..."
      />
      <p class="search__info"><span>ctrl+s</span> to quick search</p>
    </div>
    <div class="links" v-if="wikiList.length !== 0 && !activeMedia">
      <TransitionGroup name="list">
        <div class="link" v-for="(link, index) of wikiList" :key="index">
          <div class="link__image" :style="`background-image: url(${link.thumbnail?.url})`"></div>
          <div class="link__content">
            <a
              class="link__link"
              :href="`http://en.wikipedia.com/wiki/${link.key}`"
              target="_blank"
            >
              <h2 class="link__title">{{ link.title }}</h2>
              <p class="link__description">{{ link.description }}</p>
            </a>
            <button class="link__button button-icon" @click="addMedia(link)">
              <iconCheck />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <MediaNewComponent
      v-if="activeMedia"
      :media="activeMedia"
      @add="$emit('exit')"
      @cancel="cancelAdd()"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-search {
  display: flex;
  flex-flow: column;
  gap: 2rem;
}

.search {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}

.search__input {
  margin-bottom: 0;
}

.search__info {
  padding-top: 0.25rem;
  font-size: 0.85rem;
  align-self: flex-end;
  color: #999;

  span {
    color: #43b174;
  }
}

.links {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  background-color: #eee;
  padding-bottom: 3rem;
}

.link {
  display: flex;
  flex-flow: row;
  padding: 0.5rem 0.5rem 0.5rem;
  gap: 1rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: #93cfae;
  }
}

.link__link {
  display: flex;
  line-height: 1.4rem;
  flex-flow: column;
  text-decoration: none;
  color: black;
  flex: 1;
  // gap: 0.1rem;
  width: 100%;
}

.link__title {
  font-weight: 400;
  font-size: 1.25rem;
  text-transform: capitalize;
}

.link__content {
  display: flex;
  flex-flow: row;
  flex: 1;
}

.link__image {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ddd;
  border-radius: 0.5rem;
  border-radius: 100%;
  height: 3rem;
  width: 3rem;
  flex-shrink: 0;
}

.link__description {
  font-size: 0.85rem;
  opacity: 0.7;
}

.link__button {
  background-color: #ddd;
  border-radius: 100%;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  // transform: translateY(2rem);
}
.list-leave-active {
  // position: absolute;
  opacity: 0;
  // z-index: -1;
}
</style>
