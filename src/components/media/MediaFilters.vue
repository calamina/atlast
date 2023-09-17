<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { useUserStore } from '@/stores/user'
import { type Ref, ref, type ComputedRef, computed, watch } from 'vue'

const emits = defineEmits(['toggleSearch'])

const mediastore = useMediaStore()
const user = useUserStore()
const filters: Ref<{
  sort: string
  categ?: string | null
  action?: string | null
  like?: boolean | null
}> = ref({
  sort: 'createdAt'
})

watch(
  () => [filters.value, mediastore.list],
  () => {
    mediastore.getFilteredMediaByUser(user.connectedUser.username, filters.value).then((result) => {
      mediastore.filteredList = result
    })
  },
  { deep: true }
)

const categs: ComputedRef<{ name: string; number: number }[]> = computed(() => {
  return countElements('categ') as { name: string; number: number }[]
})
const actions: ComputedRef<{ name: string; number: number }[]> = computed(() => {
  return countElements('action') as { name: string; number: number }[]
})
const favorites: ComputedRef<number> = computed(() => {
  return mediastore.filteredList.filter((media) => media.attributes.like === true).length
})

function countElements(property: string) {
  return Object.values(
    mediastore.filteredList
      .map((media) => media.attributes[property])
      .reduce((acc, element) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!acc.hasOwnProperty(element)) acc[element] = { name: element, number: 0 }
        acc[element].number++
        return acc
      }, {})
  )
}

function resetFilters() {
  filters.value.categ = null
  filters.value.action = null
  filters.value.like = null
}
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters">
      <div class="stats">
        <button class="stat stat--new" @click="$emit('toggleSearch')">
          <p class="stat__name">Add media</p>
          <p class="stat__count">ctrl + s</p>
        </button>
      </div>
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
          @click="filters.like === true ? (filters.like = false) : (filters.like = true)"
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
          v-for="categ in categs"
          :key="categ.name"
          @click="
            filters.categ === categ.name ? (filters.categ = '') : (filters.categ = categ.name)
          "
          :class="{ statSelected: filters.categ === categ.name }"
        >
          <p class="stat__name">{{ categ.name }}{{ categ.number > 1 ? 's' : '' }}</p>
          <p class="stat__count">{{ categ.number }}</p>
        </button>
      </div>
      <div class="stats">
        <h3>status</h3>
        <button
          class="stat"
          v-for="action in actions"
          :key="action.name"
          @click="
            filters.action === action.name ? (filters.action = '') : (filters.action = action.name)
          "
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
          @click="filters.sort = 'createdAt'"
          :class="{ statSelected: filters.sort === 'createdAt' }"
        >
          <p class="stat__name">Added</p>
        </button>
        <button
          class="stat"
          @click="filters.sort = 'title'"
          :class="{ statSelected: filters.sort === 'title' }"
        >
          <p class="stat__name">name</p>
        </button>
        <button
          type="button"
          class="stat"
          @click="filters.sort = 'score'"
          :class="{ statSelected: filters.sort === 'score' }"
        >
          <p class="stat__name">rating</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
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
  // opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}

h3 {
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'contaxItalic', 'Arial', sans-serif;
  opacity: 0.5;
  padding: 0 1rem;
}

.stats {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  border-radius: 1rem;
}

.stat {
  padding: 0.3rem 1rem;
  width: 15rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-radius: 1rem;

  &Selected {
    background-color: #fff;
  }

  &--new {
    background-color: #dfcfe8;
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
</style>
