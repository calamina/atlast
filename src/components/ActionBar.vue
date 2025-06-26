<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStateStore } from '@/stores/state';

import IconDetail from './icons/IconDetail.vue';
import IconImage from './icons/IconImage.vue';
import IconFilters from './icons/IconFilters.vue';

const { toggleSize, toggleSidebar, toggleImages } = useStateStore()
const { displayOptions } = storeToRefs(useStateStore())
</script>

<template>
  <div class="optionBar">
    <div class="options" v-if="displayOptions">
      <div class="options-display">
        <!-- TODO : button icon component -->
        <button class="button-icon" @click="toggleSize()" v-tooltip="'Toggle size'" aria-label="Toggle size">
          <IconDetail />
        </button>
        <button class="button-icon" @click="toggleImages()" v-tooltip="'Toggle images'" aria-label="Toggle Images">
          <IconImage />
        </button>
        <button class="button-icon" @click="toggleSidebar()" v-tooltip="'Show sidebar'" aria-label="Toggle sidebar">
          <IconFilters />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.optionBar {
  position: relative;
  display: flex;
  flex-flow: column;
  border-right: 1px solid var(--border);
  align-items: center;
}

.options {
  position: fixed;
  top: var(--fixed);
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
}

.options-display {
  background-color: var(--background-darker);
  border-radius: 2rem;

  button {
    border-radius: 100%;
  }

  &.smallRadius {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
