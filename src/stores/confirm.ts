import { defineStore } from 'pinia'
import { useConfirmDialog } from '@vueuse/core'
import { ref, type Ref } from 'vue'

export const useConfirmStore = defineStore('confirm', () => {
  const { isRevealed, reveal, confirm, cancel } = useConfirmDialog()
  const dialogMessage: Ref<string | null> = ref('Confirm ?')

  async function confirmOrCancel(message: string) {
    dialogMessage.value = message
    const { isCanceled } = await reveal()
    if (!isCanceled) {
      dialogMessage.value = null
      return true
      }
    dialogMessage.value = null
    return false
  }

  return { confirmOrCancel, confirm, cancel, isRevealed, dialogMessage }
})
