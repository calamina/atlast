<script setup lang="ts">
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import { mediaStatus } from '@/data/media-status';
import { useStateStore } from '@/stores/state';
import type { StatusModel } from '@/models/status.model';

const { displaySmall } = useStateStore()
const { status, dates } = defineProps<{
  status: string
  dates: { created: Date | undefined, updated: Date | undefined }
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
    v-tooltip="selectedStatus?.name + ' — ' + formatDate(dates.created ?? undefined, dates.updated ?? undefined)" />
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
</style>
