<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import IconLike from '../icons/IconLike.vue'
import IconLikeFull from '../icons/IconLikeFull.vue'
import FilterButton from '../atomic/FilterButton.vue'

const { updateMediaFilters, resetFilters } = useMediaStore()
const { filters, filteredCount, count } = storeToRefs(useMediaStore())

function updateFilters() {
  filters.value.like = !filters.value.like
  updateMediaFilters(filters.value)
}
</script>

<template>
  <div class="icon-group">
    <FilterButton class="all" :selected="filteredCount === count" name="All" :info="count" @click="resetFilters()" />
    <button class="icon-button button-like" :class="{ active: filters.like }" @click="updateFilters()"
            aria-label="Favorite filter" v-tooltip="'Favorite filter'">
      <IconLike v-if="!filters.like" class="icon" />
      <IconLikeFull v-else class="icon like" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.icon-group {
  display: none;
  padding: 0.25rem 0.75rem;
  width: 100%;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.35rem;
  cursor: pointer;
  border-radius: 2.5rem;
  padding: 0.5rem;
}

.active {
  background-color: var(--white);
}

.like {
  color: var(--favorite);
}

.icon {
  border-radius: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 1250px) {
  .all {
    width: 100%;
  }

  .icon-group {
    display: flex;
    padding: 0;
    width: 100%;
    gap: 0.25rem;
  }

  .icon-button {
    background-color: var(--background-transparent-plus);
    padding: 0.35rem;

    &.active {
      background-color: var(--white);
    }
  }
}
</style>