<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'
import { useLoadingStore } from '@/stores/loading'

import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaMock from '@/components/media/MediaMock.vue'
import MediaUpdateComponent from '@/components/media/MediaUpdateComponent.vue'
import MediaFilters from '@/components/media/MediaFilters.vue'
import MediaSearchBar from '@/components/media/MediaSearchBar.vue'
import MediaSearch from '@/components/media/MediaSearch.vue'
import ActionBar from '@/components/ActionBar.vue'
import strings from '@/utils/strings'
import { MediaActions } from '@/utils/media-actions'

const { filteredList, count, mediaSearch } = storeToRefs(useMediaStore())
const { getMedia } = useMediaStore()
const { loading } = storeToRefs(useLoadingStore())

const show: Ref<number | null> = ref(null)

onMounted(() => getMedia())

watch(mediaSearch, () => {
  show.value = null
  mediaSearch.value.length > 0
    ? (document.documentElement.style.overflow = 'hidden')
    : (document.documentElement.style.overflow = 'auto')
})

watch(filteredList, () => show.value = null)

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
        <div class="media__switch" v-for="(media, index) of filteredList" :key="media.id">
          <MediaComponent v-if="show !== index" :media="media" :key="media.id" @enableEdit="editMedia(index)" />
          <MediaUpdateComponent v-else :media="media" :action="MediaActions.EDIT" :key="media.key"
            @confirm="editMedia(index)" @cancel="editMedia(index)" />
        </div>
      </div>
      <div class="medias" v-else>
        <template v-if="count">
          <p v-if="count">{{ "Empty for now" + strings.SAD }}</p>
        </template>
        <template v-else>
          <MediaMock v-for="i of 2" :key="i" />
          <p>{{ "Add some media by searching" + strings.HAPPY }}</p>
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
    width: 100%;
    padding: 0.25rem;
  }

  .media__search {
    width: 100%;
  }
}
</style>
