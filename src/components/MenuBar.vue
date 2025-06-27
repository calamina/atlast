<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useMediaStore } from '@/stores/media'
import { useStateStore } from '@/stores/state'

import DatabaseMenu from './DatabaseMenu.vue'
import MenuLink from './atomic/MenuLink.vue'
import IconBook from './icons/IconBook.vue'
import IconLayout from './icons/IconLayout.vue'
import IconCharts from './icons/IconCharts.vue'

const { mediaSearch } = storeToRefs(useMediaStore())
const { toggleOptions } = useStateStore();
const { displayOptions } = storeToRefs(useStateStore())
</script>

<template>
  <nav>
    <div class="submenu">
      <div class="types" :class="{ mask: mediaSearch.length }">
        <MenuLink route="home" :icon="IconBook" name="library" />
        <MenuLink route="data" :icon="IconCharts" name="data" />
      </div>
    </div>
    <div class="sep" :class="{ mask: mediaSearch.length }">
      <button class="button-icon" @click="toggleOptions" v-tooltip="'Show Options'" aria-label="Show Options"
        :aria-pressed="displayOptions">
        <IconLayout />
      </button>
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

.sep {
  border-right: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .button-icon &:disabled {
    color: var(--active-plus);
  }
}

.mask {
  opacity: 0.3;
  pointer-events: none;
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
