<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'

import { useTooltipStore } from '@/stores/tooltip'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconLink from '@/components/icons/IconLink.vue'
import OptionButton from './OptionButton.vue'

const { resetTooltip } = useTooltipStore()

const emits = defineEmits([
  'enableEdit'
])
const { url } = defineProps<{
  url: string
}>()

const toggleEdit = useThrottleFn(() => {
  resetTooltip()
  emits('enableEdit')
}, 500)

const openLink = (url: string | undefined) => {
  if (url) window.open(url, "_blank");
}
</script>

<template>
  <div class="actions">
    <OptionButton @click="openLink(url)" :info="'Wikipedia link'" :background="'clear'">
      <IconLink />
    </OptionButton>
    <OptionButton @click="toggleEdit()" :info="'Edit'" :background="'clear'">
      <IconEdit />
    </OptionButton>
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
</style>
