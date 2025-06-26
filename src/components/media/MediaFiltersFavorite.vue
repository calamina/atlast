<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import IconLike from '../icons/IconLike.vue'
import IconLikeFull from '../icons/IconLikeFull.vue'

const { updateMediaFilters } = useMediaStore()
const { filters } = storeToRefs(useMediaStore())


function updateFilters() {
  filters.value.like = !filters.value.like
  updateMediaFilters(filters.value)
}
</script>

<template>
  <FilterGroup :title="'favorites'">
    <div class="icon-group">
      <button class="icon-button button-like" :class="{ activeStatus: filters.like }" @click="updateFilters()"
        aria-label="Favorite filter" v-tooltip="'Favorite filter'">
        <IconLike v-if="!filters.like" class="icon" />
        <IconLikeFull v-else class="icon" />
      </button>
    </div>
  </FilterGroup>
</template>

<style lang="scss" scoped>
.icon-group {
  display: flex;
  padding: 0.25rem 0.75rem;
  width: 100%;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.35rem;
  cursor: pointer;
  border-radius: 2.5rem;
  padding: 0.5rem;

  &.activeStatus {
    background-color: var(--white);
    color: var(--favorite);
  }
}

.icon {
  border-radius: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
}
</style>