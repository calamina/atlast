<script setup lang="ts">
import { useTooltipStore } from '@/stores/tooltip';
import IconRating from '../icons/IconRating.vue';

const { setTooltip, resetTooltip } = useTooltipStore()

const props = defineProps<{
  score: number
  small?: boolean
}>()
</script>

<template>
  <div v-if="props.score" :class="{ smallRating: props.small }" @mouseover="setTooltip(props.score + ' / 10')"
    @mouseleave="resetTooltip()">
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
