<script setup lang="ts">
import { onKeyStroke, useKeyModifier } from '@vueuse/core'
import type { Component } from 'vue'
import IconCancel from './icons/IconCancel.vue'

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
  <main>
    <div class="wrapper">
      <transition name="modal" mode="out-in">
        <component :is="props.component" @exit="$emit('toggleSearch')"></component>
      </transition>
    </div>
    <button type="button" class="button-icon exit" @click="$emit('toggleSearch')">
      <IconCancel />
    </button>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: rgba(239, 239, 239, 1);
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background-color: #ddd;
  border-radius: 2rem;
}

// modal transition
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    transform 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-1rem);
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
