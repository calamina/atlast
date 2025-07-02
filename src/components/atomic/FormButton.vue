<script setup lang='ts'>
import { useStateStore } from '@/stores/state';
import { storeToRefs } from 'pinia';

const { type, info, accent } = defineProps<{
  type: 'submit' | 'button' | 'reset'
  info: string
  accent?: boolean
}>()

const { displaySmall } = storeToRefs(useStateStore())
</script>

<template>
  <button class="button-icon" :class="{ accent: accent, small: displaySmall }" :type v-tooltip="info"
          :aria-label="info">
    <slot />
  </button>
</template>

<style scoped lang='scss'>
button {
  background-color: var(--background);
  transition: height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), width 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.accent {
  background-color: var(--highlight);
}

.small {
  height: 1.75rem;
  width: 1.75rem;
  padding: 0.25rem
}


@media (max-width: 1250px) {
  button {
    height: 1.75rem;
    width: 1.75rem;
    padding: 0.25rem
  }
}
</style>