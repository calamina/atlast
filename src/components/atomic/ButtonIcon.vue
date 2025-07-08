<!-- different views / states / backgrounds / size / hover ? -->
<script setup lang="ts">
const { } = defineProps<{
  onClick: ((...args: any[]) => void)
  info?: string
  size?: number
  padding?: number
  element?: string
  cursor?: 'pointer' | 'default'
  clazz?: any
}>()
</script>

<template>
  <button @click="onClick" :class="clazz" v-tooltip="'Show Options'" aria-label="Show Options">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.55rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  &:focus {
    outline-color: var(--text);
  }
}
</style>