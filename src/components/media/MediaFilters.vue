<script setup lang="ts">
import { type Ref, ref, type ComputedRef, computed } from 'vue'
import type { FilterModel } from '@/models/filter.model'
import { useMediaStore } from '@/stores/media'

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

function resetFilters() {
  filters.value.categ = null
  filters.value.action = null
  filters.value.like = null
  mediastore.updateFilters(filters.value)
}

function updateFilters(property: any, value: string | boolean | null) {
  if (property === 'sort' && filters.value[property] === value) {
    filters.value.order = filters.value.order === 'asc' ? 'desc' : 'asc'
    mediastore.updateFilters(filters.value)
    return
  }
  filters.value[property] = filters.value[property] === value && property !== 'sort' ? null : value
  mediastore.updateFilters(filters.value)
}
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters" v-if="!!mediastore.filteredList.length">
      <div class="stats">
        <button
          class="stat"
          @click="resetFilters()"
          :class="{ statSelected: mediastore.filteredList.length === mediastore.list.length }"
        >
          <p class="stat__name">All</p>
          <p class="stat__count">{{ mediastore.list.length }}</p>
        </button>
      </div>
      <div class="stats" v-if="favorites > 0">
        <h3>favorites</h3>
        <button
          class="stat"
          @click="updateFilters('like', true)"
          :class="{ statSelected: filters.like === true }"
        >
          <p class="stat__name">favorite{{ favorites > 1 ? 's' : '' }}</p>
          <p class="stat__count">{{ favorites }}</p>
        </button>
      </div>
      <div class="stats">
        <h3>category</h3>
        <button
          class="stat"
          v-for="(categ, index) in categs"
          :key="index"
          @click="updateFilters('categ', categ.name)"
          :class="{ statSelected: filters.categ === categ.name }"
        >
          <p class="stat__name">{{ categ.name }}</p>
          <p class="stat__count">{{ categ.number }}</p>
        </button>
      </div>
      <div class="stats">
        <h3>status</h3>
        <button
          class="stat"
          v-for="action in actions"
          :key="action.name"
          @click="updateFilters('action', action.name)"
          :class="{ statSelected: filters.action === action.name }"
        >
          <p class="stat__name">{{ action.name }}</p>
          <p class="stat__count">{{ action.number }}</p>
        </button>
      </div>

      <div class="stats">
        <h3>sort by</h3>
        <button
          class="stat"
          @click="updateFilters('sort', 'createdAt')"
          :class="{ statSelected: filters.sort === 'createdAt' }"
        >
          <p class="stat__name">added</p>
          <p class="stat__count">{{ filters.order === 'asc' ? '01 — 12' : '12 — 01' }}</p>
        </button>
        <button
          class="stat"
          @click="updateFilters('sort', 'title')"
          :class="{ statSelected: filters.sort === 'title' }"
        >
          <p class="stat__name">name</p>
          <p class="stat__count">{{ filters.order === 'asc' ? 'a — z' : 'z — a' }}</p>
        </button>
        <button
          type="button"
          class="stat"
          @click="updateFilters('sort', 'score')"
          :class="{ statSelected: filters.sort === 'score' }"
        >
          <p class="stat__name">rating</p>
          <p class="stat__count">{{ filters.order === 'asc' ? '1 — 10' : '10 — 1' }}</p>
        </button>
      </div>
      <div class="stats" v-if="tags.size">
        <h3>tags</h3>
        <div class="media__tags">
          <button
            class="media__tag"
            v-for="(tag, index) in tags"
            :key="index"
            @click="updateFilters('tag', tag)"
            :class="{ tagSelected: filters.tag === tag }"
          >
            {{ tag }}
          </button>
        </div>
      </div>
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
  top: 0;
  height: fit-content;
  display: flex;
  flex-flow: column;
  padding: 1rem;
  gap: 1rem;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

h3 {
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'contaxItalic', 'Arial', sans-serif;
  color: #999;
  padding: 0 1rem 0.25rem;
}

.stats {
  display: flex;
  flex-flow: column;
  border-radius: 1rem;
}

.stat {
  padding: 0.35rem 1.25rem;
  width: 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;

  &Selected {
    background-color: #fff;
  }

  &__name {
    font-family: 'contaxBold', Arial, sans-serif;
    font-size: 1rem;
    text-transform: capitalize;
  }
  &__count {
    font-family: 'contaxBold', Arial, sans-serif;
    opacity: 0.5;
  }
}

.media__tags {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
  width: 15rem;
}

.media__tag {
  height: 1.75rem;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  background-color: #ddd;
  width: fit-content;
  font-family: 'contaxBold', Arial, sans-serif;
  color: #777;
  border-radius: 1rem;
  font-size: 0.85rem;
  &::before {
    content: '#';
  }
}

.tagSelected {
  background-color: #fff;
}
</style>
