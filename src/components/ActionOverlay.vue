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
    <component class="wrapper" :is="props.component" @exit="$emit('toggleSearch')"></component>
    <button type="button" class="button-icon exit" @click="$emit('toggleSearch')">
      <IconCancel />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.overlay-background {
  top: 0;
  background-color: #efefefcc;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 5rem;
}
.wrapper {
  display: flex;
  flex-flow: column;
  min-height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
}

.exit {
  position: fixed;
  top: 1.1rem;
  right: 1.1rem;
  border-radius: 100%;
  background-color: #ddd;
}
</style>
