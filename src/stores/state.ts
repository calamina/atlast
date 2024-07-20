import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const displaySmall: Ref<boolean> = ref(false)
  const displaySidebar: Ref<boolean> = ref(true)
  const displayImages: Ref<boolean> = ref(true)

  function toggleSize() {
    displaySmall.value = !displaySmall.value
  }

  function toggleSidebar() {
    displaySidebar.value = !displaySidebar.value
  }
  
  function toggleImages() {
    displayImages.value = !displayImages.value
  }

  return { displaySmall, displaySidebar, displayImages, toggleSize, toggleSidebar, toggleImages }
})
