<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'
import { useMediaFormStore } from '@/stores/media.form'

import MediaMock from '@/components/media/MediaMock.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import OptionBar from '@/components/OptionBar.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import MediaEmpty from '@/components/media/MediaEmpty.vue'
import MediaSwitch from '@/components/media/MediaSwitch.vue'
// import AsyncComponent from '@/components/AsyncComponent.vue'

const { filteredList, count, filteredCount, mediaSearch } = storeToRefs(useMediaStore())
const { getMedia } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())
const { resetActive } = useMediaFormStore()

onMounted(() => getMedia())

watch(mediaSearch, () => {
  resetActive()
  mediaSearch.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

watch(filteredList, () => resetActive())

const currentPage = ref(1)
const pageSize = 20
const listStart = computed(() => currentPage.value === 1 ? 0 : (currentPage.value - 1) * pageSize)
const listEnd = computed(() => listStart.value + pageSize)
const paginatedList = computed(() => filteredList.value.slice(listStart.value, listEnd.value))
</script>

<template>
  <main>
    <MediaFilters />
    <OptionBar />
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <MediaMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
        <!-- <AsyncComponent v-for="media of paginatedList" :media :key="media.id" /> -->
        <MediaSwitch v-for="media of paginatedList" :media :key="media.id" />
        <PaginationComponent :currentPage :filteredCount :pageSize @changePage="(page) => currentPage = page" />
      </div>
      <div class="medias" v-else>
        <MediaEmpty :count />
      </div>
    </transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100vw;
  justify-content: center;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 5;
  transition: 0.3s;
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  min-width: max(40vw, 45rem);
  padding-top: 1.25rem;
  grid-column: 3 / 4;

  p {
    padding-top: 2rem;
    font-family: var(--font-bold);
    opacity: 0.5;
  }
}

@media (max-width: 1250px) {
  main {
    padding-top: 3.5rem;
  }

  .medias {
    padding: 0.5rem;
    margin: 0 auto;
    width: 100%;
    min-width: 0;
    grid-column: span 5;
  }
}
</style>
