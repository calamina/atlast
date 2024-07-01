<script setup lang="ts">
import { type Ref, ref, type ComputedRef, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { FilterModel } from '@/models/filter.model'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import sorts from '@/utils/media-sorts'
import MediaPagination from '@/components/media/MediaPagination.vue'
import mediaCategs from '@/utils/media-categs'
import mediaActions from '@/utils/media-actions'

const route = useRoute()

const emits = defineEmits(['refreshList'])
const mediastore = useMediaStore()
const { pagination } = storeToRefs(useMediaStore())

const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'asc' })

const categs = mediaCategs.map(categ => categ.name)
const actions = mediaActions.map(action => action.name)

const tags: ComputedRef<any> = computed(() => {
  const tags = new Set()
  mediastore.filteredList.map((media) => {
    media.attributes.tags?.forEach((tag: string) => tags.add(tag))
  })
  return tags
})

function updateFilters(property: any, value: string | boolean | null) {
  if (property === 'sort' && filters.value[property] === value) {
    filters.value.order = filters.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    filters.value[property] = filters.value[property] === value ? null : value
  }
  mediastore.updateFilters(filters.value, (route.params.username) as string)
}
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters" v-if="!!mediastore.count">
      <FilterGroup :title="''">
        <FilterButton :selected="mediastore.filteredCount === mediastore.count" :name="'All'" :info="mediastore.count"
          @click="mediastore.resetFilters((route.params.username) as string)" />
      </FilterGroup>
      <FilterGroup :title="'favorites'">
        <FilterButton :selected="filters.like === true" :name="'favorites'" :info="''"
          @click="updateFilters('like', true)" />
      </FilterGroup>
      <FilterGroup :title="'category'">
        <FilterButton v-for="categ in categs" :key="categ" :selected="filters.categ === categ"
          :name="categ" :info="''" @click="updateFilters('categ', categ)" />
      </FilterGroup>
      <FilterGroup :title="'status'">
        <FilterButton v-for="action in actions" :key="action" :selected="filters.action === action"
          :name="action" :info="''" @click="updateFilters('action', action)" />
      </FilterGroup>
      <FilterGroup :title="'sort by'">
        <FilterButton v-for="sort in sorts" :key="sort.name" :selected="filters.sort === sort.name" :name="sort.title"
          :info="filters.order === 'asc' ? sort.orderAsc : sort.orderDesc" @click="updateFilters('sort', sort.name)" />
      </FilterGroup>
      <TagGroup v-if="tags.size" :maxHeight="false">
        <TagButton v-for="tag in tags" :key="tag.name" :name="tag" :selected="filters.tag === tag"
          @click="updateFilters('tag', tag)" />
      </TagGroup>
      <MediaPagination v-if="pagination.pageCount > 1" />
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
  height: calc(100vh - 6rem);
  position: sticky;
  top: 1rem;
  display: flex;
  flex-flow: column;
  padding: 1rem;
  gap: 0.5rem;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  width: 18rem;

  &> :last-child {
    margin-top: 1rem;
  }
}

@media (max-width: 1250px) {
  .filter-wrapper {
    display: none;
  }
}
</style>
