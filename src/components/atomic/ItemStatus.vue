<script setup lang="ts">
import { useTooltipStore } from '@/stores/tooltip';
import { useDateFormat, useTimeAgo } from '@vueuse/core';
import mediaStatus from '@/utils/media-status';
import type { StatusModel } from '@/models/status.model';

const { setTooltip, resetTooltip } = useTooltipStore()

const props = defineProps<{
  status: string
  dates: { created: Date | undefined, updated: Date | undefined }
  small?: boolean
}>()

const selectedStatus: StatusModel | undefined = mediaStatus.find(status => status.name === props.status)

function formatDate(created?: Date | undefined, updated?: Date | undefined): string {
  // if (!created) return ''
  const date = updated ?? created
  if (!date) return ''
  return useDateFormat(date, 'DD/MM/YY').value + ' — ' + useTimeAgo(date).value
}
</script>

<template>
  <component v-if="selectedStatus" class="status" :class="{ smallStatus: props.small }" :is="selectedStatus?.component"
    @mouseover="setTooltip(selectedStatus?.name + ' — ' + formatDate(props.dates.created ?? undefined, props.dates.updated ?? undefined))"
    @mouseleave="resetTooltip()" />
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
