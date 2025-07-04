import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStateStore = defineStore('state', () => {
  const displaySmall: Ref<boolean> = ref(useStorage('display-small', false))
  const displaySidebar: Ref<boolean> = ref(useStorage('display-sidebar', true))
  const displayImages: Ref<boolean> = ref(useStorage('display-images', true))
  const displayOptions: Ref<boolean> = ref(useStorage('display-options', false))

  function toggleSize() {
    displaySmall.value = !displaySmall.value
  }

  function toggleSidebar() {
    displaySidebar.value = !displaySidebar.value
  }

  function toggleImages() {
    displayImages.value = !displayImages.value
  }

  function toggleOptions() {
    displayOptions.value = !displayOptions.value
  }

  return { displaySmall, displaySidebar, displayImages, displayOptions, toggleSize, toggleSidebar, toggleImages, toggleOptions }
})
