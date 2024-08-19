import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStateStore = defineStore('state', () => {
  const displaySmall: Ref<boolean> = ref(useStorage('display-small', false))
  const displaySidebar: Ref<boolean> = ref(useStorage('display-sidebar', true))
  const displayImages: Ref<boolean> = ref(useStorage('display-images', true))
  const displayActions: Ref<boolean> = ref(useStorage('display-actions', true))

  function toggleSize() {
    displaySmall.value = !displaySmall.value
  }

  function toggleSidebar() {
    displaySidebar.value = !displaySidebar.value
  }
  
  function toggleImages() {
    displayImages.value = !displayImages.value
  }

  function toggleActions() {
    displayActions.value = !displayActions.value
  }

  return { displaySmall, displaySidebar, displayImages, displayActions, toggleSize, toggleSidebar, toggleImages, toggleActions }
})
