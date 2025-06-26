<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const { name, type } = defineProps<{
  name: string
  type: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button class="secondary" :type="type">
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
