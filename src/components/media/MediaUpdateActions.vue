<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { useMediaStore } from '@/stores/media'
import { storeToRefs } from 'pinia'

import type { MediaModel } from '@/models/media.model'
import { MediaActions } from '@/data/media-actions'

import { useConfirmStore } from '@/stores/confirm'
import { useMediaFormStore } from '@/stores/media.form'

import IconBack from '@/components/icons/IconBack.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import FormButton from '../atomic/FormButton.vue'
import { useMediaUtils } from '@/utils/media-utils'
import { useTooltipStore } from '@/stores/tooltip'

const { addMedia, editMedia, deleteMedia } = useMediaStore()
const { confirmOrCancel } = useConfirmStore()

const { action } = defineProps<{
  action: MediaActions
}>()

const { mediaFormToMedia } = useMediaUtils()
const { resetActive } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
const { resetTooltip } = useTooltipStore()

function closeMediaForm() {
  resetActive()
  resetTooltip()
}

const addAction = useThrottleFn(() => {
  mediaFormToMedia(mediaForm.value as MediaModel)
    .then(data => addMedia(data))
    .then(() => closeMediaForm())
}, 500)

const editAction = useThrottleFn(() => {
  if (!mediaForm.value) return
  mediaFormToMedia(mediaForm.value as MediaModel)
    .then(data => editMedia(data))
    .then(() => closeMediaForm())
}, 500)

const deleteAction = useThrottleFn((id: number) => {
  confirmOrCancel('Are you sure you want to delete this media ?')
    .then((confirm) => confirm ? deleteMedia(id) : Promise.reject())
    .then(() => closeMediaForm())
    .catch(() => console.info('canceled Media deletion !'))
}, 500)
</script>
<template>
  <div class="actions">
    <FormButton type="reset" @click="closeMediaForm()" info="Cancel">
      <IconBack />
    </FormButton>
    <FormButton v-if="action === MediaActions.EDIT" type="button" @click="deleteAction(mediaForm.id!)" info="Delete">
      <IconDelete />
    </FormButton>
    <FormButton type="submit" @click="action === MediaActions.CREATE ? addAction() : editAction()" info="Confirm"
                accent>
      <IconCheck />
    </FormButton>
  </div>
</template>
<style lang="scss" scoped>
.actions {
  display: flex;
  flex-flow: row;
  justify-content: end;
  gap: 0.5rem;
}
</style>
