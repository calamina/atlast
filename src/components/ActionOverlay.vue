<script setup lang="ts">
import type { Component } from 'vue'

const { component } = defineProps<{
  component: Component
}>()
</script>

<template>
  <div class="overlay-background">
    <component :is="component" @exit="$emit('exit')"></component>
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: 0;
  background-color: var(--background);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 4rem 0 0 0;
  z-index: 400;
}
</style>
