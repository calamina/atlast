<script setup lang="ts">
import { type ComputedRef, computed } from 'vue'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'

const { updateMediaFilters } = useMediaStore()
const { allMedia, filters } = storeToRefs(useMediaStore())

const tags: ComputedRef<Set<string>> = computed(() => {
  const tags: Set<string> = new Set()
  allMedia.value.map((media) => media.tags?.forEach((tag: string) => tags.add(tag)))
  return tags
})

function updateFilters(value: string) {
  filters.value.tag = filters.value.tag === value ? null : value
  updateMediaFilters(filters.value)
}
</script>

<template>
  <FilterGroup title="tags" v-if="tags.size">
    <TagGroup :maxHeight="false">
      <TagButton v-for="tag in tags" :key="tag" :name="tag" :selected="filters.tag === tag"
        @click="updateFilters(tag)" />
    </TagGroup>
  </FilterGroup>
</template>