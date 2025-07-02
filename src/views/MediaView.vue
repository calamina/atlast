<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'

import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaMock from '@/components/media/MediaMock.vue'
import MediaUpdate from '@/components/media/MediaUpdate.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearchBar from '@/components/media/MediaSearchBar.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import OptionBar from '@/components/OptionBar.vue'
import strings from '@/utils/strings'
import { MediaActions } from '@/data/media-actions'
import { useMediaFormStore } from '@/stores/media.form'
import { useOffsetPagination } from '@vueuse/core'

const { filteredList, count, filteredCount, mediaSearch } = storeToRefs(useMediaStore())
const { getMedia } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())
const { resetActive } = useMediaFormStore()
const { mediaFormActive } = storeToRefs(useMediaFormStore())

onMounted(() => getMedia())

watch(mediaSearch, () => {
  resetActive()
  mediaSearch.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

watch(filteredList, () => resetActive())

const pageSize = 20
const start = computed(() => currentPage.value === 1 ? 0 : (currentPage.value - 1) * pageSize)
const end = computed(() => start.value + pageSize)
const paginatedList = computed(() => filteredList.value.slice(start.value, end.value))

const {
  currentPage,
  isFirstPage,
  isLastPage,
  prev,
  next,
  pageCount,
  // currentPageSize,
} = useOffsetPagination({
  total: filteredCount,
  page: 1,
  pageSize,
  onPageChange: (): void => window.scrollTo(0, 0),
})
</script>

<template>
  <main>
    <MediaSearchBar v-model="mediaSearch" placeholder="Search medias" :component="MediaSearch" />
    <MediaFilters />
    <OptionBar />
    <transition name="fade" mode="out-in">
      <div class="medias" v-if="loading">
        <MediaMock v-for="i of 5" :key="i" />
      </div>
      <div class="medias" v-else-if="filteredList?.length !== 0">
        <div class="media__switch" v-for="media of paginatedList" :key="media.id">
          <MediaComponent v-if="mediaFormActive !== media.id" :media="media" :key="media.id" />
          <MediaUpdate v-else :media="media" :action="MediaActions.EDIT" :key="media.key" />
        </div>
        <!-- pagination component -->
        <div class="pagination" v-if="pageCount > 1">
          <button class="pagination-button" type="button" :disabled="isFirstPage" @click="prev">Previous</button>
          <button class="pagination-button" :class="{ activepage: currentPage === item }" v-for="item in pageCount"
                  :key="item" :disabled="currentPage === item" @click="currentPage = item">
            {{ item }}
          </button>
          <button class="pagination-button" type="button" :disabled="isLastPage" @click="next">Next</button>
        </div>
        <!-- pagination component end -->
      </div>
      <div class="medias" v-else>
        <!-- TODO: Add component :) -->
        <template v-if="count">
          <p v-if="count">{{ "Empty for now" + strings.SAD }}</p>
        </template>
        <template v-else>
          <MediaMock v-for="i of 2" :key="i" />
          <p>{{ "Add some media by searching" + strings.HAPPY }}</p>
        </template>
        <!-- compoenent ned -->
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

.pagination {
  padding: 1rem 0 2rem;
  display: flex;
  gap: 0.25rem;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-darker);
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 2rem;

  &:not(.activepage):disabled {
    opacity: 0.5;
  }

  &:disabled {
    cursor: default;
  }

  &:focus {
    outline-color: var(--text);
  }
}

.activepage {
  background-color: var(--highlight);
}

.medias {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  min-width: max(40vw, 45rem);
  padding-top: 1rem;
  grid-column: 3 / 4;

  p {
    padding-top: 2rem;
    font-family: var(--font-bold);
    opacity: 0.5;
  }
}

.media__switch {
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 100%;
  gap: 0.25rem;
}

@media (max-width: 1250px) {

  .media__switch,
  .medias {
    max-width: 50rem;
    margin: 0 auto;
    width: 100%;
    padding: 0.25rem;
    min-width: 0;
    grid-column: span 5;
  }

  .media__search {
    width: 100%;
  }
}
</style>
