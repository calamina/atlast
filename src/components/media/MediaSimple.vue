<script setup lang="ts">
import type { MediaModel } from '@/models/media.model'
import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import { storeToRefs } from 'pinia';
import { useStateStore } from '@/stores/state';

const { media } = defineProps<{ media: MediaModel }>()
const { displayImages } = storeToRefs(useStateStore())
</script>

<template>
  <button class="media">
    <ItemPicture v-if="displayImages" :src="media.thumbnail?.url ?? null" :small="true" />
    <div class="media__content">
      <ItemTitle :title="media.title ?? null" />
      <ItemDescription :description="media.description ?? null" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.media {
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 1rem;

  &:hover,
  &:focus {
    background-color: var(--white);
  }

  &:focus {
    outline: none;
  }

  &__content {
    display: flex;
    flex-flow: column;
    min-width: 0;
    gap: 0.25rem;
  }
}
</style>
