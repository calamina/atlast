<script setup lang="ts">
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import { mediaStatus } from '@/data/media-status';
import { useStateStore } from '@/stores/state';
import type { StatusModel, StatusNameModel } from '@/models/status.model';

const { displaySmall } = useStateStore()
const { status, created, updated } = defineProps<{
  status: StatusNameModel | undefined
  created: Date | undefined
  updated: Date | undefined
}>()

const selectedStatus: StatusModel | undefined = mediaStatus.find(s => s.name === status)

function formatDate(created?: Date | undefined, updated?: Date | undefined): string {
  const date = updated ?? created
  if (!date) return ''
  return useDateFormat(date, 'DD/MM/YY').value + ' — ' + useTimeAgo(date).value
}
</script>

<template>
  <component v-if="selectedStatus" class="status" :class="{ smallStatus: displaySmall }" :is="selectedStatus?.component"
    v-tooltip="selectedStatus?.name + ' — ' + formatDate(created ?? undefined, updated ?? undefined)" />
</template>

<style scoped lang="scss">
.status {
  height: 1.75rem;
  padding: 0.25rem;
  border-radius: 1rem;
  background-color: v-bind('selectedStatus?.color');

  &.smallStatus {
    height: 1.5rem;
  }
}

@media (max-width: 1250px) {
  .status {
    height: 2rem;
  }
}
</style>
