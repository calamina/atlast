<script setup lang="ts">
import { type Ref, ref, type ComputedRef, computed } from 'vue'
import type { FilterModel } from '@/models/filter.model'
import { useMediaStore } from '@/stores/media'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import sorts from '@/utils/media-sorts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['refreshList'])
const mediastore = useMediaStore()
const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'asc' })

const categs: ComputedRef<{ name: string; number: number }[]> = computed(() => {
  return countElements('categ') as { name: string; number: number }[]
})
const actions: ComputedRef<{ name: string; number: number }[]> = computed(() => {
  return countElements('action') as { name: string; number: number }[]
})
const favorites: ComputedRef<number> = computed(() => {
  return mediastore.filteredList.filter((media) => media.attributes.like === true).length
})

const tags: ComputedRef<any> = computed(() => {
  const tags = new Set()
  mediastore.filteredList.map((media) => {
    media.attributes.tags?.forEach((tag: string) => tags.add(tag))
  })
  return tags
})

function countElements(property: string) {
  return Object.values(
    mediastore.filteredList
      .map((media) => media.attributes[property])
      .reduce((mapping: any, item: string) => {
        const { [item]: matchingItem } = mapping
        matchingItem ? matchingItem.number++ : (mapping[item] = { name: item, number: 1 })
        return mapping
      }, {})
  )
}

function updateFilters(property: any, value: string | boolean | null) {
  if (property === 'sort' && filters.value[property] === value) {
    filters.value.order = filters.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    filters.value[property] = filters.value[property] === value ? null : value
  }
  mediastore.updateFilters(filters.value)
}
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters" v-if="!!mediastore.filteredList?.length">
      <FilterGroup :title="''">
        <FilterButton
          :selected="mediastore.filteredList.length === mediastore.list.length"
          :name="'All'"
          :info="mediastore.list.length"
          @click="mediastore.resetFilters()"
        />
      </FilterGroup>
      <FilterGroup :title="'favorites'" v-if="favorites > 0">
        <FilterButton
          :selected="filters.like === true"
          :name="'favorite'"
          :info="favorites"
          @click="updateFilters('like', true)"
        />
      </FilterGroup>
      <FilterGroup :title="'category'">
        <FilterButton
          v-for="categ in categs"
          :key="categ.name"
          :selected="filters.categ === categ.name"
          :name="categ.name"
          :info="categ.number"
          @click="updateFilters('categ', categ.name)"
        />
      </FilterGroup>
      <FilterGroup :title="'status'">
        <FilterButton
          v-for="action in actions"
          :key="action.name"
          :selected="filters.action === action.name"
          :name="action.name"
          :info="action.number"
          @click="updateFilters('action', action.name)"
        />
      </FilterGroup>

      <FilterGroup :title="'sort by'">
        <FilterButton
          v-for="sort in sorts"
          :key="sort.name"
          :selected="filters.sort === sort.name"
          :name="sort.title"
          :info="filters.order === 'asc' ? sort.orderAsc : sort.orderDesc"
          @click="updateFilters('sort', sort.name)"
        />
      </FilterGroup>
      <TagGroup v-if="tags.size" :maxHeight="false">
        <TagButton
          v-for="tag in tags"
          :key="tag.name"
          :name="tag"
          :selected="filters.tag === tag"
          @click="updateFilters('tag', tag)"
        />
      </TagGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-end;
}

.filters {
  position: sticky;
  top: 1rem;
  height: fit-content;
  display: flex;
  flex-flow: column;
  padding: 1rem;
  gap: 0.5rem;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  width: 18rem;

  & > :last-child {
    margin-top: 1rem;
  }
}

@media (max-width: 1250px) {
  .filter-wrapper {
    display: none;
  }
}
</style>
