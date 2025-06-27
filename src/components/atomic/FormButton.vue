<script setup lang='ts'>
const { type, info, accent } = defineProps<{
  type: 'submit' | 'button' | 'reset'
  info: string
  accent?: boolean
}>()
</script>

<template>
  <button class="button-icon" :class="{ accent: accent }" :type v-tooltip="info" :aria-label="info">
    <slot />
  </button>
</template>

<style scoped lang='scss'>
button {
  background-color: var(--background);
}

.accent {
  background-color: var(--highlight);
}
</style>