import { watch, type Directive } from "vue"

export const inactive: Directive = {
  updated(el, binding) {
    el.inert = binding.value
    binding.value ? el.classList.add("mask") : el.classList.remove("mask")
  },
}