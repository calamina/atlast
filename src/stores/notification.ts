import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message: Ref<string | null> = ref(null)
  const type: Ref<string | null> = ref(null)
  const delay = (time: number) => new Promise((res) => setTimeout(res, time))

  async function alert(alertMessage: string) {
    message.value = alertMessage
    type.value = 'alert'
    autoClear()
  }

  async function error(error: any | string) {
    if (typeof error === 'string') {
      message.value = error
    } else {
      error = error.data.error
      message.value = `${error.status} : ${error.message}`
    }
    type.value = 'error'
    autoClear()
  }

  function clear() {
    message.value = null
  }

  async function autoClear() {
    await delay(2500)
    clear()
  }

  return { message, type, alert, error, clear }
})
