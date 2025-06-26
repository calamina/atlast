<script setup lang="ts">
import { useStateStore } from '@/stores/state';

const { displaySmall } = useStateStore()
const { categ } = defineProps<{
  categ: string | undefined
}>()
</script>

<template>
  <p :class="{ smallCateg: displaySmall }">
    {{ categ }}
  </p>
</template>

<style scoped lang="scss">
p {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.25rem;
  height: 1.75rem;
  font-size: 0.9rem;
  padding: 0 0 0.25rem;
  width: 6rem;
  font-family: var(--font-bold);
  background-color: var(--background-darker);
  border-radius: 1rem;
  cursor: default;

  &.smallCateg {
    height: 1.5rem;
  }
}
</style>
