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

const { resetFilters } = useMediaStore()
const { count, filteredCount } = storeToRefs(useMediaStore())
const { displaySidebar } = storeToRefs(useStateStore())
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters" v-if="displaySidebar">
      <FilterButton :selected="filteredCount === count" name="All" :info="count" @click="resetFilters()" />
      <MediaFiltersFavorite />
      <MediaFiltersCateg />
      <MediaFiltersStatus />
      <MediaFiltersSort />
      <MediaFiltersTags />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-self: flex-end;
  align-items: flex-end;
  min-height: 90vh;
  overflow-y: auto;
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
  .filter-wrapper {
    display: none;
  }
}
</style>