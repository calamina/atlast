<script setup lang="ts">
import { onMounted, watch } from 'vue'
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

const { filteredList, count, mediaSearch } = storeToRefs(useMediaStore())
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
        <div class="media__switch" v-for="media of filteredList" :key="media.id">
          <MediaComponent v-if="mediaFormActive !== media.id" :media="media" :key="media.id" />
          <MediaUpdate v-else :media="media" :action="MediaActions.EDIT" :key="media.key" />
        </div>
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
  scrollbar-width: none;
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
  }

  .media__search {
    width: 100%;
  }
}
</style>
