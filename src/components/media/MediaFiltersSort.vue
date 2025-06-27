<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import { filterSorts } from '@/data/media-sorts'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import type { SortNameModel } from '@/models/sort.model'

const { updateMediaFilters } = useMediaStore()
const { filters } = storeToRefs(useMediaStore())

function updateFilters(value: SortNameModel) {
  if (filters.value.sort === value) {
    filters.value.order = filters.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    filters.value.sort = filters.value.sort === value ? null : value
  }
  updateMediaFilters(filters.value)
}
</script>

<template>
  <FilterGroup title="sort">
    <FilterButton v-for="sort in filterSorts" :key="sort.name ?? 1" :selected="filters.sort === sort.name"
      :name="sort.title" :sort="filters.order" @click="updateFilters(sort.name)" />
  </FilterGroup>
</template>