<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

const props = defineProps<{
  name: string
  type: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button class="primary" :type="type">
    {{ props.name }}
  </button>
</template>

<style scoped lang="scss">
.primary {
  margin-top: 0.5rem;
  font-family: var(--font-bold);
  font-size: 1.1rem;
  border-radius: 2rem;
  padding: 0.4rem 1.5rem;
  height: 3rem;
  color: var(--text);
  background-color: var(--highlight);
}
</style>
