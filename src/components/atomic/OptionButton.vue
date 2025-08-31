<script setup lang='ts'>
const { onClick, info, background, active = true } = defineProps<{
  onClick: ((...args: any[]) => void)
  info: string
  background?: 'clear' | 'dark'
  active?: boolean
}>()
</script>

<template>
  <button class="button-icon"
    :class="{ clearButton: background === 'clear', darkButton: background === 'dark', activeButton: active }"
    @click="onClick" v-tooltip="info" :aria-label="info">
    <slot />
  </button>
</template>

<style scoped lang='scss'>
.clearButton {
  background-color: var(--background);
}

.darkButton {
  background-color: var(--background-darker);
}

button:not(.activeButton) {
  color: var(--text-light);
}

@media (max-width: 1250px) {
  // .button-icon {
  //   height: 1.75rem;
  //   width: 1.75rem;
  //   padding: 0.25rem;
  // }

  .clear {
    background-color: var(--background-darker);
  }
}
</style>