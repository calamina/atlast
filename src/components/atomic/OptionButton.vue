<script setup lang='ts'>
const { onClick, info, background } = defineProps<{
  onClick: ((...args: any[]) => void)
  info: string
  background?: 'clear' | 'dark'
}>()
</script>

<template>
  <button class="button-icon" :class="{ clear: background === 'clear', dark: background === 'dark' }" @click="onClick"
          v-tooltip="info" :aria-label="info">
    <slot />
  </button>
</template>

<style scoped lang='scss'>
.clear {
  background-color: var(--background);
}

.dark {
  background-color: var(--background-darker);
}


@media (max-width: 1250px) {
  .button-icon {
    height: 1.75rem;
    width: 1.75rem;
    padding: 0.25rem;
  }

  .clear {
    background-color: var(--background-darker);
  }
}
</style>