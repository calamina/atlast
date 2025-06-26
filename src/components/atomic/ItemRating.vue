<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import IconRating from '../icons/IconRating.vue';

const { displaySmall } = useStateStore()
const { score } = defineProps<{
  score: number
}>()
</script>

<template>
  <div v-if="score" :class="{ smallRating: displaySmall }" v-tooltip="score + ' / 10'"
    :aria-label="'Media rating:' + score + ' / 10'">
    <IconRating v-for="point in score" :key="point" class="icon" />
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.25rem;
  height: 1.75rem;
  background-color: var(--score-background);
  border-radius: 1rem;
  padding: 0 0.5rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    color: var(--score);
  }

  &.smallRating {
    height: 1.5rem;
    gap: 0.1rem;
    padding: 0 0.25rem;

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
</style>
