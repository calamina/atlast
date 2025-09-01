<script setup lang="ts">
import { ref } from 'vue'
import MediaFiltersCateg from './MediaFiltersCateg.vue'
import MediaFiltersStatus from './MediaFiltersStatus.vue'
import MediaFiltersSort from './MediaFiltersSort.vue'
import MediaFiltersTags from './MediaFiltersTags.vue'
import MediaFiltersAllFavorite from './MediaFiltersAllFavorite.vue'
import IconFilters from '../icons/IconFilters.vue'

const active = ref(false)
</script>

<template>
  <transition name="fade">
    <div class="filter-wrapper" :class="{ 'inactive': !active }">
      <button class="toggle" @click="active = !active" :class="{ 'untoggled': !active }">
        <IconFilters class="icon" />
        Filters
      </button>
      <transition name="showFilters">
        <div class="filters" v-if="active">
          <MediaFiltersAllFavorite />
          <MediaFiltersCateg />
          <MediaFiltersStatus />
          <MediaFiltersSort />
          <MediaFiltersTags />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  width: calc(100% - 1rem);
  margin: 0 auto;
  height: fit-content;
  justify-self: flex-start;
  align-items: center;
  grid-column: span 5;
  min-height: 0;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: var(--background-darker);
  transition: padding 0.2s;

  &.inactive {
    padding: 0.25rem 0.5rem;
  }
}

.filters {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  max-height: 80vh;
  overflow: hidden;
}

.toggle {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--background-transparent);
  border-radius: 1rem;
  padding: 0.25rem 0;
  transition: padding 0.2s, background-color 0.2s;
  outline: none;

  &.untoggled {
    background-color: transparent;
    padding: 0;
  }
}

.icon {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.25rem;
}

/* TRANSITIONS */
.showFilters-enter-active,
.showFilters-leave-active {
  transition: max-height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    opacity 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.showFilters-enter-from,
.showFilters-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
}
</style>