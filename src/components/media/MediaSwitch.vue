<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useMediaFormStore } from '@/stores/media.form'
import { MediaActions } from '@/data/media-actions'

import MediaComponent from '@/components/media/MediaComponent.vue'
import MediaUpdate from '@/components/media/MediaUpdate.vue'
import type { MediaModel } from '@/models/media.model'

const { mediaFormActive } = storeToRefs(useMediaFormStore())
const { media } = defineProps<{
  media: MediaModel
}>()
</script>

<template>
  <div class="media__switch">
    <MediaComponent v-if="mediaFormActive !== media.id" :media="media" :key="media.id" />
    <MediaUpdate v-else :media="media" :action="MediaActions.EDIT" :key="media.key" />
  </div>
</template>

<style lang="scss" scoped>
.media__switch {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 100%;
  gap: 0.25rem;
}

@media (max-width: 1250px) {
  .media__switch {
    max-width: 50rem;
    margin: 0 auto;
    width: 100%;
    // padding: 0.25rem;
    min-width: 0;
    grid-column: span 5;
  }
}
</style>
