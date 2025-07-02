<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
import FilterButton from '@/components/atomic/FilterButton.vue'
import MediaFiltersCateg from './MediaFiltersCateg.vue'
import MediaFiltersFavorite from './MediaFiltersFavorite.vue'
import MediaFiltersStatus from './MediaFiltersStatus.vue'
import MediaFiltersSort from './MediaFiltersSort.vue'
import MediaFiltersTags from './MediaFiltersTags.vue'
import MediaFiltersAllFavorite from './MediaFiltersAllFavorite.vue'

const { resetFilters } = useMediaStore()
const { count, filteredCount } = storeToRefs(useMediaStore())
const { displaySidebar } = storeToRefs(useStateStore())
</script>

<template>
  <div class="filter-wrapper">
    <transition name="fade">
      <div class="filters" v-if="displaySidebar">
        <MediaFiltersAllFavorite />
        <div class="widescreen-filters">
          <FilterButton :selected="filteredCount === count" name="All" :info="count" @click="resetFilters()" />
          <MediaFiltersFavorite />
        </div>
        <MediaFiltersCateg />
        <MediaFiltersStatus />
        <MediaFiltersSort />
        <MediaFiltersTags />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.widescreen-filters {
  display: flex;
  flex-flow: column;
  width: 100%;
  gap: 0.5rem;
}

.filter-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-self: flex-end;
  align-items: flex-end;
  min-height: 90vh;
  overflow-y: auto;
  border-right: 1px solid var(--border);
}

.filters {
  padding: 2px;
  position: sticky;
  position: fixed;
  top: var(--fixed);
  padding-left: 1rem;
  display: flex;
  flex-flow: column;
  width: 18rem;
  gap: 0.5rem;
  height: fit-content;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  max-height: 85vh;
  overflow-y: auto;
}

@media (max-width: 1250px) {
  .widescreen-filters {
    display: none;
  }

  .filter-wrapper {
    gap: 0.5rem;
    height: fit-content;
    grid-column: span 5;
    align-items: center;
    width: 100%;
    min-height: 0;
    z-index: 3;
    padding: 0.5rem 0.5rem 0.25rem;
    border-right: none;
  }

  .filters {
    position: relative;
    top: 0;
    width: 100%;
    padding: 0.5rem;
    border-radius: 1rem;
    gap: 1rem;
    background-color: var(--background-darker);
  }
}
</style>