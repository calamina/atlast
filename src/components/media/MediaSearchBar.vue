<script setup lang="ts">
import ActionOverlay from '@/components/ActionOverlay.vue'
import IconCancel from '@/components/icons/IconCancel.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import type { Component } from 'vue';

const search = defineModel<string>({required: true})
const props = defineProps<{
  component: Component
  placeholder: string
}>()
</script>

<template>
  <teleport to="#menu-search">
    <div class="media__search">
      <input type="text" name="search" v-model="search" id="search" :placeholder="props.placeholder" autocomplete="off" />
      <IconSearch v-if="!search.length" class="button-icon" />
      <IconCancel v-if="!!search.length" class="button-icon" @click="search = ''" />
    </div>
  </teleport>
  <transition name="search" mode="out-in">
    <ActionOverlay v-if="!!search.length" class="overlay" :component="props.component" @exit="search = ''" />
  </transition>
</template>

<style lang="scss" scoped>
.media__search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  width: fit-content;
  padding: 0 0.5rem;
  border-radius: 3rem;
  width: 25rem;
  height: 3rem;
  z-index: 800;

  input[type='text'] {
    padding: 0 1rem;
    text-align: center;
    font-size: 1.1rem;
    border-radius: 3rem;
    height: 3rem;
    font-family: var(--font-bold);
  }

  .button-icon {
    cursor: pointer;
  }
}
</style>
