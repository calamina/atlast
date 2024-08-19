<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'
import { useTooltipStore } from '@/stores/tooltip'
import { useStateStore } from '@/stores/state'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconLink from '@/components/icons/IconLink.vue'

const { connectedUser } = storeToRefs(useUserStore())
const { setTooltip, resetTooltip } = useTooltipStore()
// const { displaySmall, displayImages } = storeToRefs(useStateStore())

const emits = defineEmits(['enableEdit'])
const props = defineProps<{ 
  url: string
  user: string
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
      <button class="button-icon action" type="button"
        @click="openLink(props.url)" @mouseover="setTooltip('Wikipedia link')" @mouseleave="resetTooltip()">
        <IconLink />
      </button>
      <button v-if="connectedUser?.username === props.user" class="button-icon action" type="button"
        @click="toggleEdit" @mouseover="setTooltip('Edit')" @mouseleave="resetTooltip()">
        <IconEdit />
      </button>
      <button v-else class="button-icon action" type="button" @click="toggleEdit">
        <IconPlus />
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
