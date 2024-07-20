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
import mediaCategs from '@/utils/media-categs'
import mediaActions from '@/utils/media-actions'
import { useStateStore } from '@/stores/state'
import { useTooltipStore } from '@/stores/tooltip'
import IconLike from '../icons/IconLike.vue'
import IconLikeFull from '../icons/IconLikeFull.vue'

const route = useRoute()

const emits = defineEmits(['refreshList'])
const mediastore = useMediaStore()
const { displaySidebar } = storeToRefs(useStateStore())
const { setTooltip, resetTooltip } = useTooltipStore()

const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'asc' })

const categs = mediaCategs.map(categ => categ.name)

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
    <div class="filters" v-if="!!mediastore.count && displaySidebar">
      <FilterGroup :title="''">
        <FilterButton :selected="mediastore.filteredCount === mediastore.count" :name="'All'" :info="mediastore.count"
          @click="mediastore.resetFilters((route.params.username) as string)" />
      </FilterGroup>
      <FilterGroup :title="'favorites'">
        <div class="icon-group">
          <button class="icon-button" :class="{ activeStatus: filters.like }" @click="updateFilters('like', true)">
            <IconLike v-if="!filters.like" class="icon" />
            <IconLikeFull v-else class="icon icon-like" />
          </button>
        </div>
      </FilterGroup>
      <FilterGroup :title="'category'">
        <FilterButton v-for="categ in categs" :key="categ" :selected="filters.categ === categ" :name="categ" :info="'0'"
          @click="updateFilters('categ', categ)" />
      </FilterGroup>
      <FilterGroup :title="'status'">
        <div class="icon-group">
          <button class="icon-button" v-for="action in mediaActions"
            :class="{ activeStatus: filters.action === action.name }" @click="updateFilters('action', action.name)">
            <component class="icon" :is="action!.component" :style="{ backgroundColor: action!.color }"
              @mouseover="setTooltip(action!.name)" @mouseleave="resetTooltip()" />
          </button>
        </div>
      </FilterGroup>
      <FilterGroup :title="'sort by'">
        <FilterButton v-for="sort in sorts" :key="sort.name" :selected="filters.sort === sort.name" :name="sort.title"
          :info="filters.order === 'asc' ? sort.orderAsc : sort.orderDesc" @click="updateFilters('sort', sort.name)" />
      </FilterGroup>
      <FilterGroup :title="'tags'" v-if="tags.size">
        <TagGroup :maxHeight="false">
          <TagButton v-for="tag in tags" :key="tag.name" :name="tag" :selected="filters.tag === tag"
            @click="updateFilters('tag', tag)" />
        </TagGroup>
      </FilterGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  position: relative;
  display: flex;
  flex-flow: column;
  width: 16rem;
  justify-self: flex-end;
}

.filters {
  position: fixed;
  top: 7rem;
  padding: 0 1rem;
  display: flex;
  flex-flow: column;
  width: 16rem;
  gap: 0.5rem;
  height: fit-content;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.icon-group {
  display: flex;
  padding: 0.25rem 0.75rem;
  width: 100%;
  justify-content: space-between;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.35rem;
  cursor: pointer;
  border-radius: 2.5rem;

  &.activeStatus {
    background-color: var(--white);
  }
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
}

.icon-like {
  color: var(--favorite);
}


@media (max-width: 1250px) {
  .filter-wrapper {
    display: none;
  }
}
</style>
