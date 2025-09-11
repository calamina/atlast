<script setup lang="ts">
import { computed } from 'vue'
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

const selected = computed(() => count.value === filteredCount.value)
</script>

<template>
  <div class="filter-wrapper">
    <transition name="fade">
      <div class="filters" v-if="displaySidebar">
        <FilterButton :selected name="All" :info="count" @click="resetFilters()" />
        <MediaFiltersFavorite />
        <MediaFiltersCateg />
        <MediaFiltersStatus />
        <MediaFiltersSort />
        <MediaFiltersTags />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-self: flex-start;
  align-items: flex-end;
  grid-column: 1;
  padding-top: 1.25rem;
}

.filters {
  padding: 2px;
  position: sticky;
  top: var(--fixed);
  padding-left: 1rem;
  display: flex;
  flex-flow: column;
  width: 18rem;
  gap: 0.5rem;
  height: fit-content;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  max-height: calc(100vh - var(--fixed));
  overflow-y: auto;
}
</style>