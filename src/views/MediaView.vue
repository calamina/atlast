<script setup lang="ts">
import { computed, onMounted, ref, type ComputedRef, type Ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { watchDeep } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import type { MediaModel } from '@/models/media.model'

import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'
import { useUserStore } from '@/stores/user'

import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaMock from '@/components/media/MediaMock.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearchBar from '@/components/media/MediaSearchBar.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import ActionBar from '@/components/ActionBar.vue'

const route = useRoute()
const { filteredList, count, pagination, mediaSearch } = storeToRefs(useMediaStore())
const { getMediaByUser, getFilteredMediaByUser } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())
const { connectedUser } = storeToRefs(useUserStore())

const show: Ref<number | null> = ref(null)

onMounted(() => {
  if (
    filteredList?.value.length === 0 ||
    route.params.user !== connectedUser.value?.username
  ) {
    getMediaByUser((route.params.username) as string).then((result) => {
      filteredList.value = result
    })
  }
  mediaSearch.value = '';
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
    <ActionBar />
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <MediaMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
        <div class="media__switch" v-for="(media, index) of filteredMedia" :key="media.id">
          <MediaComponent v-if="show !== index" :media="media" :key="media.id" @enableEdit="editMedia(index)" />
          <MediaUpdateComponent v-else :media="media"
            :action="route.params.username === connectedUser?.username ? 'editMedia' : 'createMedia'" :key="media.key"
            @confirm="editMedia(index)" @cancel="editMedia(index)" />
        </div>
      </div>
      <div class="medias" v-else>
        <!-- TODO :: strings.SAD etc -->
        <template v-if="count">
          <p v-if="count">Empty for now (•ᴖ•｡)</p>
        </template>
        <template v-else>
          <MediaMock v-for="i of 2" :key="i" />
          <p>Add some media by searching (˶ᵔᵕᵔ˶)</p>
        </template>
      </div>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  scrollbar-width: none;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 2.5rem 1fr 2.5rem 1fr;
  grid-template-columns: 1fr 5.5rem 1fr 5.5rem 1fr;
  transition: 0.3s;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  min-width: max(40vw, 45rem);
  padding: 1rem;

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
    grid-template-columns: 1fr 5.5rem 1fr;
  }

  .media__switch,
  .medias {
    width: 100%;
    padding: 0.25rem;
  }

  .media__search {
    width: 100%;
  }
}
</style>
