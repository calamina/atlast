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
// import MediaPagination from '@/components/media/MediaPagination.vue'

const route = useRoute()
const { filteredList, count, pagination } = storeToRefs(useMediaStore())
const { getMediaByUser, updateSearch } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())

const show: Ref<number | null> = ref(null)
let search = ref('')

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

watch(search, () => {
  updateSearch(search.value)
  show.value = null
  search.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

watch(filteredMedia, () => {
  show.value = null
})

watchDeep(pagination, () => {
  getMediaByUser((route.params.username) as string, pagination.value.page).then((result) => {
    filteredList.value = result
  })
})

function editMedia(index: number) {
  show.value = show.value === index ? null : index
}
</script>

<template>
  <main>
    <MediaSearchBar v-model="search" />
    <MediaFilters />
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <!-- <MediaMock v-for="i of filteredList?.length" :key="i" /> -->
        <MediaMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
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
        <!-- <MediaPagination v-if="count > 25" v-model="page" /> -->
      </div>
      <div class="medias" v-else>
        <MediaMock v-for="i of 2" :key="i" />
        <!-- TODO :: info on adding media -->
         <p>Add some media by searching :)</p>
      </div>
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
  display: flex;
  flex-flow: column;
  width: 45rem;
  gap: 0.25rem;
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
