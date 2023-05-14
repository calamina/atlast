import type { linkModel } from '@/models/link.model'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useLinkStore = defineStore('links', () => {
  const list: Ref<Array<linkModel>> = ref([])
  const filteredList: Ref<Array<linkModel>> = ref([])

  return {
    list,
    filteredList
  }
})
