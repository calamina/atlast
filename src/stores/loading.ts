import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loading: Ref<boolean> = ref(false)

  function setLoading(value: boolean) {
    loading.value = value
  }

  return { loading, setLoading }
})
