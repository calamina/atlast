<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { MediaModel } from '@/models/media.model'
import { useRoute } from 'vue-router'
import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'
import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaMock from '@/components/media/MediaMock.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearchBar from '@/components/media/MediaSearchBar.vue'
import { watchDeep } from '@vueuse/core'
import MediaSearch from '@/components/media/MediaSearch.vue'
import { useStateStore } from '@/stores/state'
import IconDetail from '@/components/icons/IconDetail.vue'
import IconFilters from '@/components/icons/IconFilters.vue'
import MediaPagination from '@/components/media/MediaPagination.vue'
import IconImage from '@/components/icons/IconImage.vue'

const route = useRoute()
const { filteredList, count, pagination, mediaSearch } = storeToRefs(useMediaStore())
const { getMediaByUser, getFilteredMediaByUser } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())
const { toggleSize, toggleSidebar, toggleImages } = useStateStore()

const show: Ref<number | null> = ref(null)

onMounted(() => {
  if (
    filteredList?.value.length === 0 ||
    route.params.user !== filteredList?.value[0]?.user
  ) {
    getMediaByUser((route.params.username) as string).then((result) => {
      filteredList.value = result
    })
  }
})

watch(route, () => {
  show.value = null
  getMediaByUser((route.params.username) as string).then((result) => {
    filteredList.value = result
  })
})

const filteredMedia: ComputedRef<MediaModel[]> = computed(() => {
  return filteredList?.value?.map((media: MediaModel) => {
    const id = media.id
    media = media.attributes
    media.id = id
    return media
  })
})

watch(mediaSearch, () => {
  show.value = null
  mediaSearch.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

watch(filteredMedia, () => {
  show.value = null
})

watchDeep(pagination, () => {
  getFilteredMediaByUser((route.params.username) as string, true, pagination.value.page).then((result) => {
    filteredList.value = result
  })
})

function editMedia(index: number) {
  show.value = show.value === index ? null : index
}
</script>

<template>
  <main>
    <MediaSearchBar v-model="mediaSearch" :placeholder="'Search medias'" :component="MediaSearch" />
    <MediaFilters />
    <div class="actionBar">
      <div class="actions">
        <div class="actions-display">
          <button class="button-icon" @click="toggleSize()">
            <IconDetail />
          </button>
          <button class="button-icon" @click="toggleImages()">
            <IconImage />
          </button>
          <button class="button-icon" @click="toggleSidebar()">
            <IconFilters />
          </button>
        </div>
        <MediaPagination v-if="pagination.pageCount > 1" />
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <!-- <MediaMock v-for="i of filteredList?.length" :key="i" /> -->
        <MediaMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
        <div class="media__switch" v-for="(media, index) of filteredMedia" :key="media.id">
          <MediaComponent v-if="show !== index" :media="media" :key="media.id" @enableEdit="editMedia(index)" />
          <MediaUpdateComponent v-else :media="media" :action="'editMedia'" :key="media.key" @confirm="editMedia(index)"
            @cancel="editMedia(index)" />
        </div>
      </div>
      <div class="medias" v-else>
        <MediaMock v-for="i of 2" :key="i" />
        <!-- TODO :: info on adding media -->
        <p v-if="count">Empty for now (•ᴖ•｡)</p>
        <p v-else>Add some media by searching (˶ᵔᵕᵔ˶)</p>
      </div>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  padding: 1rem 0;
  scrollbar-width: none;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 2.5rem 1fr 2.5rem 1fr;
  gap: 3rem;
}

.actionBar {
  position: relative;
  display: flex;
  flex-flow: column;
}

.actions {
  position: fixed;
  top: 7rem;
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  height: fit-content;
  border-radius: 2rem;
  // background-color: #fff;
  padding: 0.25rem;
}

.actions-display {
  padding: .25rem 0;
  background-color: var(--background-darker);
  // border-radius: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  min-width: 40vw;
  // width: fit-content;

  p {
    padding-top: 2rem;
    font-family: var(--font-bold);
    opacity: 0.5;
  }
}

.media__switch {
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.25rem;
}

@media (max-width: 1250px) {
  main {
    grid-template-columns: 1fr;
  }

  .actionBar {
    display: none;
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
