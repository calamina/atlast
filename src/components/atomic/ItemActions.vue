<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'

import { useTooltipStore } from '@/stores/tooltip'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconLink from '@/components/icons/IconLink.vue'

const { setTooltip, resetTooltip } = useTooltipStore()

const emits = defineEmits(['enableEdit'])
const props = defineProps<{
  url: string
}>()

const toggleEdit = useThrottleFn(() => {
  resetTooltip()
  emits('enableEdit')
}, 500)

function openLink(url: string | undefined) {
  if (url) window.open(url, "_blank");
}
</script>

<template>
  <div class="actions">
    <button class="button-icon action" type="button" @click="openLink(props.url)"
      @mouseover="setTooltip('Wikipedia link')" @mouseleave="resetTooltip()" aria-label="Open link">
      <IconLink />
    </button>
    <button class="button-icon action" type="button" @click="toggleEdit" @mouseover="setTooltip('Edit')"
      @mouseleave="resetTooltip()" aria-label="Edit media">
      <IconEdit />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.actions {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 300;
  display: flex;
  padding: 0;
  gap: 0.25rem;
  border-radius: 100%;
}

.action {
  background-color: var(--background);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.55rem;
  border-radius: 100%;
}
</style>
