<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import { mediaCategs } from '@/data/media-categs'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import type { CategNameModel } from '@/models/categ.model'

const { updateMediaFilters } = useMediaStore()
const { allMedia, filters } = storeToRefs(useMediaStore())

const categs = mediaCategs.map(categ => categ.name) ?? []

function updateFilters(value: CategNameModel) {
  filters.value.categ = (filters.value.categ !== value ? value : null)
  updateMediaFilters(filters.value)
}

const countByCateg: ComputedRef<Record<string, number>> = computed(() => {
  const counts: Record<string, number> = {}
  allMedia.value.forEach(media => {
    if (!media.categ) return
    counts[media.categ] = (counts[media.categ] || 0) + 1
  })
  return counts
})
</script>

<template>
  <FilterGroup :title="'category'">
    <FilterButton v-for="categ in categs" :key="categ ?? 1" :selected="filters.categ === categ" :name="categ"
      :info="countByCateg[categ ?? 1]" @click="updateFilters(categ)" />
  </FilterGroup>
</template>