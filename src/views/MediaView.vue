<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useKeyModifier, onKeyStroke } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import ActionOverlay from '@/components/ActionOverlay.vue'
import type { MediaModel } from '@/models/media.model'

const mediastore = useMediaStore()
const user = useUserStore()

const searchActive: Ref<boolean> = ref(false)

onMounted(() => {
  if (mediastore.filteredList.length === 0) {
    mediastore.getMediaByUser(user.connectedUser.username).then((result) => {
      mediastore.filteredList = result
    })
  }
})

const filteredMedia: ComputedRef<MediaModel[]> = computed(() => {
  return mediastore.filteredList.map((media: MediaModel) => {
    const id = media.id
    media = media.attributes
    media.id = id
    return media
  })
})

function updateList() {
  mediastore.getFilteredMediaByUser(user.connectedUser.username).then((result) => {
    mediastore.filteredList = result
  })
}

function toggleSearchModal() {
  searchActive.value = !searchActive.value
  document.documentElement.style.overflow === 'hidden'
    ? (document.documentElement.style.overflow = 'auto')
    : (document.documentElement.style.overflow = 'hidden')
}

const ctrl = useKeyModifier('Control')
onKeyStroke(['s'], (e: KeyboardEvent) => {
  if (ctrl.value) {
    e.preventDefault()
    if (e.key === 's') toggleSearchModal()
  }
})
</script>

<template>
  <main>
    <MediaFilters @toggleSearch="toggleSearchModal()" @refreshList="updateList()" />
    <div class="medias" v-if="mediastore.filteredList.length !== 0">
      <TransitionGroup name="list">
        <div v-for="media of filteredMedia" :key="media.id">
          <MediaComponent :media="media" @refreshList="updateList()" />
        </div>
      </TransitionGroup>
    </div>
    <transition name="search" mode="out-in">
      <ActionOverlay
        v-if="searchActive"
        class="overlay"
        :component="MediaSearch"
        @toggleSearch="toggleSearchModal"
      />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  padding: 1rem 0;
  position: relative;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
.list-leave-active {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

// searchbar transition
.search-enter-active,
.search-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.search-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}
.search-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
