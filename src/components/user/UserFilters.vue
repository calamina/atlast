<script setup lang="ts">
import { type Ref, ref, type ComputedRef, computed } from 'vue'
import type { FilterModel } from '@/models/filter.model'
import { useUserStore } from '@/stores/user'
import FilterButton from '@/components/atomic/FilterButton.vue'
import FilterGroup from '@/components/atomic/FilterGroup.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['refreshList'])
const userStore = useUserStore()
const filters: Ref<FilterModel> = ref({ sort: 'createdAt', order: 'asc' })

const friends: ComputedRef<any> = computed(() => {
  // return userStore.filteredList.filter((media) => media?.like === true).length
  return 4
})

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
    <div class="filters" v-if="!!userStore.filteredList?.length">
      <FilterGroup :title="''">
        <FilterButton
          :selected="userStore.filteredList.length === userStore.list.length"
          :name="'All'"
          :info="userStore.list.length"
          @click="userStore.resetFilters()"
        />
      </FilterGroup>
      <FilterGroup :title="'friends'" v-if="friends > 0">
        <FilterButton
          :selected="filters.like === true"
          :name="'favorite'"
          :info="friends"
          @click="updateFilters('like', true)"
        />
      </FilterGroup>
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
