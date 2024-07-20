import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const size: Ref<boolean> = ref(true)
  const sidebar: Ref<boolean> = ref(true)

  function toggleSize() {
    size.value = !size.value
  }

  function toggleSidebar() {
    sidebar.value = !sidebar.value
  }

  return { size, sidebar, toggleSize, toggleSidebar }
})
