<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  type: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button class="secondary" :type="props.type">
    or <span>{{ name }}</span>
  </button>
</template>

<style scoped lang="scss">
.secondary {
  background-color: transparent;

  span {
    font-family: var(--font-bold);
  }
}
</style>
