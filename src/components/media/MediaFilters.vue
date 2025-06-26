<script setup lang="ts">
import { type Ref, ref, type ComputedRef, computed } from 'vue'
import type { FilterModel } from '@/models/filter.model'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
import sorts from '@/utils/media-sorts'
import mediaStatus from '@/utils/media-status'
import mediaCategs from '@/utils/media-categs'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import IconLike from '../icons/IconLike.vue'
import IconLikeFull from '../icons/IconLikeFull.vue'

const emits = defineEmits(['refreshList'])
const mediastore = useMediaStore()
const { allMedia } = storeToRefs(useMediaStore())
const { displaySidebar } = storeToRefs(useStateStore())

const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'asc' })

const categs = mediaCategs.map(categ => categ.name)

const tags: ComputedRef<any> = computed(() => {
  const tags = new Set()
  mediastore.filteredList.map((media) => media.tags?.forEach((tag: string) => tags.add(tag)))
  return tags
})

function updateFilters(property: any, value: string | boolean | null) {
  if (property === 'sort' && filters.value[property] === value) {
    filters.value.order = filters.value.order === 'asc' ? 'desc' : 'asc'
  } else {
    filters.value[property] = filters.value[property] === value ? null : value
  }
  mediastore.updateFilters(filters.value)
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
  <div class="filter-wrapper">
    <div class="filters" v-if="displaySidebar">
      <FilterButton :selected="mediastore.filteredCount === mediastore.count" :name="'All'" :info="mediastore.count"
        @click="mediastore.resetFilters()" />
      <FilterGroup :title="'favorites'">
        <div class="icon-group">
          <button class="icon-button button-like" :class="{ activeStatus: filters.like }"
            @click="updateFilters('like', true)" aria-label="Favorite filter" v-tooltip="'Favorite filter'">
            <IconLike v-if="!filters.like" class="icon" />
            <IconLikeFull v-else class="icon" />
          </button>
        </div>
      </FilterGroup>
      <FilterGroup :title="'category'">
        <FilterButton v-for="categ in categs" :key="categ" :selected="filters.categ === categ" :name="categ"
          :info="countByCateg[categ]" @click="updateFilters('categ', categ)" />
      </FilterGroup>
      <FilterGroup :title="'status'">
        <div class="icon-group">
          <button class="icon-button" v-for="status in mediaStatus"
            :class="{ activeStatus: filters.status === status.name }" @click="updateFilters('status', status.name)"
            :aria-label="status + 'filter'" :key="status.name">
            <component class="icon" :is="status!.component" :style="{ backgroundColor: status!.color }"
              v-tooltip="status!.name" />
          </button>
        </div>
      </FilterGroup>
      <FilterGroup :title="'sort'">
        <FilterButton v-for="sort in sorts" :key="sort.name" :selected="filters.sort === sort.name" :name="sort.title"
          :sort="filters.order === 'asc' ? 'ascending' : 'descending'" @click="updateFilters('sort', sort.name)" />
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
  overflow-y: scroll;
}

.user {
  background-color: var(--highlight);
  cursor: default;
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
  filter: saturate(0);

  &.activeStatus {
    background-color: var(--white);
    filter: saturate(1);
  }
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
}

.button-like {
  padding: 0.5rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &.activeStatus .icon {
    color: var(--favorite);
  }

}
</style>