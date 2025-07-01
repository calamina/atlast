<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'
import { useStateStore } from '@/stores/state'

import DatabaseMenu from './DatabaseMenu.vue'
import MenuLink from './atomic/MenuLink.vue'
import IconBook from './icons/IconBook.vue'
import IconLayout from './icons/IconLayout.vue'
import IconCharts from './icons/IconCharts.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const { mediaSearch } = storeToRefs(useMediaStore())
const { toggleOptions } = useStateStore();
const { displayOptions } = storeToRefs(useStateStore())

const options = ref(null)
onClickOutside(options, _event => displayOptions.value = false)
</script>

<template>
  <nav>
    <div class="submenu">
      <div class="types" :class="{ mask: mediaSearch.length }">
        <MenuLink route="home" :icon="IconBook" name="library" />
        <MenuLink route="data" :icon="IconCharts" name="data" />
      </div>
    </div>
    <div class="options" ref="options" :class="{ mask: mediaSearch.length }">
      <button class="button-icon" @click="toggleOptions" v-tooltip="'Show Options'" aria-label="Show Options"
        :aria-pressed="displayOptions">
        <IconLayout />
      </button>
      <div id="menu-options"></div>
    </div>
    <div id="menu-search"></div>
    <DatabaseMenu :class="{ mask: mediaSearch.length }" />
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: fit-content;
  margin: 0 auto;
  padding: 0;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 5;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  transition: 0.3s;
}

.submenu {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.types {
  display: flex;
  gap: 0.5rem;
  width: 18rem;
  padding-left: 1rem;
}

.button-icon {
  background-color: var(--background-darker);
  border-radius: 100%;
}

.options {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.mask {
  opacity: 0.3;
  pointer-events: none;
}

#menu-options {
  position: fixed;
  top: var(--fixed);
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
  background-color: var(--background-darker);
}

#menu-search {
  display: flex;
  min-width: 40vw;
}

@media (max-width: 1250px) {
  #menu-search {
    min-width: 0;
  }
}
</style>
