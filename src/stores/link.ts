import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useLinkStore = defineStore('links', () => {
  const list: Ref<Array<any>> = ref([])

  return {
    list
  }
})
