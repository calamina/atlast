<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { useTooltipStore } from '@/stores/tooltip'
import { useMediaFormStore } from '@/stores/media.form'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconLink from '@/components/icons/IconLink.vue'
import OptionButton from './OptionButton.vue'

const { resetTooltip } = useTooltipStore()
const { toggleActive } = useMediaFormStore()

const { id, url } = defineProps<{
  id: number
  url: string | undefined
}>()

const toggleEdit = useThrottleFn(() => {
  toggleActive(id)
  resetTooltip()
}, 500)

const openLink = (url: string | undefined) => window.open(url ?? '', "_blank")
</script>

<template>
  <div class="actions">
    <OptionButton @click="openLink(url)" info="Wikipedia link" background="clear">
      <IconLink />
    </OptionButton>
    <OptionButton @click="toggleEdit()" info="Edit" background="clear">
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


@media (max-width: 1250px) {
  .actions {
    // position: relative;
    // flex-flow: column;
    height: fit-content;
    width: fit-content;
    top: auto;
    bottom: 0.25rem;
    right: 0.25rem;
  }
}
</style>
