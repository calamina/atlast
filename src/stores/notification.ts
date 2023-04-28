import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message: Ref<string | null> = ref(null)
  const type: Ref<string | null> = ref(null)

  function alert(alertMessage: string) {
    message.value = alertMessage
    type.value = 'alert'
  }

  function error(error: any) {
    error = error.data.error
    message.value = `${error.status} : ${error.message}`
    type.value = 'error'
  }

  function clear() {
    message.value = null
  }

  return { message, type, alert, error, clear }
})
