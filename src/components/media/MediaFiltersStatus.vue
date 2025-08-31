<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'
import { mediaStatus } from '@/data/media-status'
import FilterGroup from '@/components/atomic/FilterGroup.vue'
import type { StatusNameModel } from '@/models/status.model'

const { updateMediaFilters } = useMediaStore()
const { filters } = storeToRefs(useMediaStore())

function updateFilters(value: StatusNameModel) {
  filters.value.status = filters.value.status === value ? null : value
  updateMediaFilters(filters.value)
}
</script>

<template>
  <FilterGroup title="status">
    <div class="icon-group">
      <button class="icon-button" v-for="status in mediaStatus"
        :class="{ activeStatus: filters.status === status.name }" @click="updateFilters(status.name)"
        :aria-label="status + 'filter'" :key="status.name ?? 1">
        <component class="icon" :is="status!.component" :style="{ backgroundColor: status!.color }"
          v-tooltip="status!.name" />
      </button>
    </div>
  </FilterGroup>
</template>

<style lang="scss" scoped>
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

@media (max-width: 1250px) {
  .icon-group {
    padding: 0;
    gap: 0.75rem;
  }

  .icon-button {
    background-color: var(--background-transparent-plus);
    padding: 0.4rem;
    flex-shrink: 0;
    border-radius: 100%;
    // width: 2rem;
    // height: 2rem;
    // padding: 0;
  }

  // .icon {
  //   width: 1.25rem;
  //   height: 1.25rem;
  // }
}
</style>