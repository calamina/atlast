<script setup lang="ts">
import { useOffsetPagination } from '@vueuse/core';

const { pageSize, filteredCount } = defineProps<{
  filteredCount: number
  pageSize: number
}>()

const emit = defineEmits<{
  (e: 'changePage', value: number, count: number): void
}>()

function changePage() {
  emit('changePage', currentPage.value, pageCount.value)
  window.scrollTo(0, 0)
}

const {
  currentPage,
  isFirstPage,
  isLastPage,
  prev,
  next,
  pageCount,
} = useOffsetPagination({
  total: filteredCount,
  page: 1,
  pageSize,
  onPageChange: changePage,
})
</script>
<template>
  <div class="pagination" v-if="pageCount > 1">
    <button class="pagination-button" type="button" :disabled="isFirstPage" @click="prev">Previous</button>
    <button class="pagination-button" :class="{ activepage: currentPage === item }" v-for="item in pageCount"
            :key="item" :disabled="currentPage === item" @click="currentPage = item">
      {{ item }}
    </button>
    <button class="pagination-button" type="button" :disabled="isLastPage" @click="next">Next</button>
  </div>
</template>
<style lang="scss" scoped>
.pagination {
  padding: 1rem 0 2rem;
  display: flex;
  gap: 0.25rem;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-darker);
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 2rem;

  &:not(.activepage):disabled {
    opacity: 0.5;
  }

  &:disabled {
    cursor: default;
  }

  &:focus {
    outline-color: var(--text);
  }
}

.activepage {
  background-color: var(--highlight);
}
</style>