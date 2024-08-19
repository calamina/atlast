<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useMediaStore } from '@/stores/media';
import { useStateStore } from '@/stores/state';
import { useTooltipStore } from '@/stores/tooltip';

import IconDetail from './icons/IconDetail.vue';
import IconImage from './icons/IconImage.vue';
import IconFilters from './icons/IconFilters.vue';
import MediaPagination from './media/MediaPagination.vue';

const { toggleSize, toggleSidebar, toggleImages } = useStateStore()
const { displayActions } = storeToRefs(useStateStore())
const { setTooltip, resetTooltip } = useTooltipStore()
const { pagination } = storeToRefs(useMediaStore())
</script>

<template>
  <div class="actionBar">
    <div class="actions" v-if="displayActions">
      <div class="actions-display" :class="{ smallRadius: pagination.pageCount > 1 }">
        <button class="button-icon" @click="toggleSize()" @mouseover="setTooltip('Toggle size')"
          @mouseleave="resetTooltip()">
          <IconDetail />
        </button>
        <button class="button-icon" @click="toggleImages()" @mouseover="setTooltip('Toggle images')"
          @mouseleave="resetTooltip()">
          <IconImage />
        </button>
        <button class="button-icon" @click="toggleSidebar()" @mouseover="setTooltip('Toggle sidebar')"
          @mouseleave="resetTooltip()">
          <IconFilters />
        </button>
      </div>
      <MediaPagination v-if="pagination.pageCount > 1" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actionBar {
  position: relative;
  display: flex;
  flex-flow: column;
  border-right: 1px solid var(--border);
  align-items: center;
}

.actions {
  position: sticky;
  top: var(--fixed);
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  gap: 1rem;
  gap: 0.5rem;
  height: fit-content;
  border-radius: 2rem;
}

.actions-display {
  background-color: var(--background-darker);
  border-radius: 2rem;

  &.smallRadius {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
