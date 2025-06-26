<script setup lang="ts">
import IconRating from '../icons/IconRating.vue';

const props = defineProps<{
  score: number
  small?: boolean
}>()
</script>

<template>
  <div v-if="props.score" :class="{ smallRating: props.small }" v-tooltip="props.score + ' / 10'"
    :aria-label="'Media rating:' + props.score + ' / 10'">
    <IconRating v-for="score in props.score" :key="score" class="icon" />
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
