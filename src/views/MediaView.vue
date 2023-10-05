<script setup lang="ts">
import type { MediaModel } from '@/models/media.model'
import { computed, onMounted, ref, type ComputedRef, type Ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const mediastore = useMediaStore()
const user = useUserStore()

const show: Ref<number | null> = ref(null)
let search = ref('')

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

watch(search, () => {
  mediastore.updateSearch(search.value)
  search.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

function editMedia(index: number) {
  if (show.value === index) {
    show.value = null
  } else {
    show.value = index
  }
}
</script>

<template>
  <main>
    <teleport to="#menu-search">
      <div class="media__search">
        <input
          type="text"
          name="search"
          v-model="search"
          id="search"
          placeholder="Search"
          autocomplete="off"
        />
        <IconSearch v-if="!search.length" class="button-icon" />
        <IconCancel v-if="!!search.length" class="button-icon" @click="search = ''" />
      </div>
    </teleport>
    <MediaFilters />
    <div class="medias" v-if="mediastore.filteredList.length !== 0">
      <TransitionGroup name="list">
        <div class="media__switch" v-for="(media, index) of filteredMedia" :key="media.id">
          <MediaComponent
            v-if="show !== index"
            :media="media"
            :key="media.id"
            @enableEdit="editMedia(index)"
          />
          <MediaUpdateComponent
            v-else
            :media="media"
            :action="'editMedia'"
            :key="media.key"
            @confirm="editMedia(index)"
            @cancel="editMedia(index)"
          />
        </div>
      </TransitionGroup>
    </div>
    <transition name="search" mode="out-in">
      <ActionOverlay
        v-if="!!search.length"
        class="overlay"
        :component="MediaSearch"
        @exit="search = ''"
      />
    </transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  padding: 1rem 0;
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
  gap: 0.25rem;
}

.media__search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  width: fit-content;
  padding: 0 0.5rem;
  border-radius: 3rem;
  width: 25rem;
  height: 3rem;
  z-index: 900;

  input[type='text'] {
    padding: 0 1rem;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 3rem;
    height: 3rem;
    font-family: 'contaxBold', Arial, sans-serif;
  }

  .button-icon {
    cursor: pointer;
  }
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  // transform: translateY(2rem);
}
.list-leave-active {
  // position: absolute;
  opacity: 0;
}

// searchbar transition
.search-enter-active,
.search-leave-active {
  transition: opacity 0.3s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
}
</style>
