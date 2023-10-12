<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { MediaModel } from '@/models/media.model'
import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'
import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaMock from '@/components/media/MediaMock.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

const { filteredList } = storeToRefs(useMediaStore())
const { getMediaByUser, updateSearch } = useMediaStore()
const { connectedUser } = useUserStore()
const { loading } = storeToRefs(useLoadingStore())

const show: Ref<number | null> = ref(null)
let search = ref('')

onMounted(() => {
  if (filteredList?.value.length === 0) {
    getMediaByUser(connectedUser?.username).then((result) => {
      filteredList.value = result
    })
  }
})

const filteredMedia: ComputedRef<MediaModel[]> = computed(() => {
  return filteredList?.value?.map((media: MediaModel) => {
    const id = media.id
    media = media.attributes
    media.id = id
    return media
  })
})

watch(search, () => {
  updateSearch(search.value)
  search.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

function editMedia(index: number) {
  show.value = show.value === index ? null : index
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
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <MediaMock v-for="i of filteredList?.length" :key="i" />
      </div>
      <div class="medias" v-else>
        <div v-if="filteredList?.length !== 0">
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
        </div>
        <div v-else>
          <MediaMock v-for="i of 2" :key="i" />
        </div>
      </div>
    </transition>
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
  width: 45rem;
}

.media__switch {
  width: 45rem;
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
  z-index: 800;

  input[type='text'] {
    padding: 0 1rem;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 3rem;
    height: 3rem;
    font-family: var(--font-bold);
  }

  .button-icon {
    cursor: pointer;
  }
}

@media (max-width: 1250px) {
  main {
    grid-template-columns: 1fr;
  }

  .media__switch,
  .medias {
    width: 100%;
    padding: 0 0.25rem;
  }

  .media__search {
    width: 100%;
  }
}
</style>
