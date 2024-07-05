<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import type { Component } from 'vue'

const emits = defineEmits(['exit'])

const props = defineProps<{
  component: Component
}>()

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emits('exit')
  }
})
</script>

<template>
  <div class="overlay-background">
    <component :is="props.component" @exit="$emit('exit')"></component>
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: 0;
  background-color: var(--background-transparent);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 3rem 0 0 0;
  z-index: 100;
}
</style>
