import { useTooltipStore } from "@/stores/tooltip"
import type { Directive } from "vue"

export const tooltip: Directive = {
  mounted(el: HTMLElement, binding: any) {
    const { setTooltip, resetTooltip } = useTooltipStore()

    el.addEventListener(
      "mouseover",
      () => setTooltip(binding.value))

    el.addEventListener(
      "mouseout",
      () => resetTooltip())
  },
}