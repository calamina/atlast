<script setup lang="ts">
import { useStateStore } from '@/stores/state';

const { displaySmall } = useStateStore()
const { extract } = defineProps<{
  extract: string | null | undefined
}>()
</script>

<template>
  <p :class="{ small: displaySmall }">{{ extract }}</p>
</template>

<style scoped lang="scss">
p {
  max-height: 30rem;
  padding-bottom: 0.5rem;
  text-align: left;

  &.small {
    font-size: 0.9rem;
  }
}
</style>
