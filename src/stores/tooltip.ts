import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTooltipStore = defineStore('tooltip', () => {
  const tooltip: Ref<string | number | null> = ref(null)

  function setTooltip(text: string | number | null) {
    tooltip.value = text 
  }

  function resetTooltip() {
    tooltip.value = null;
  }

  return { tooltip, setTooltip, resetTooltip }
})
