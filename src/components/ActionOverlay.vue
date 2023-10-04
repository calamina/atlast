<script setup lang="ts">
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import IconCancel from '@/components/icons/IconCancel.vue'
import type { Component } from 'vue'

const props = defineProps<{
  component: Component
}>()

const emits = defineEmits(['toggleSearch'])

const ctrl = useKeyModifier('Control')
onKeyStroke(['Escape'], (e) => {
  if (ctrl.value || e.key === 'Escape') {
    e.preventDefault()
    emits('toggleSearch')
  }
})
</script>

<template>
  <div class="overlay-background">
    <component :is="props.component" @exit="$emit('toggleSearch')"></component>
    <button type="button" class="button-icon exit" @click="$emit('toggleSearch')">
      <IconCancel />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: 0;
  background-color: #efefefde;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 5rem;
  z-index: 100;
}

.exit {
  position: fixed;
  top: 2.25rem;
  right: auto;
  left: auto;
  border-radius: 100%;
  background-color: #ddd;
}
</style>
