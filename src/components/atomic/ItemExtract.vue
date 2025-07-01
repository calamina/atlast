<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import { storeToRefs } from 'pinia';

const { displaySmall } = storeToRefs(useStateStore())
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
  transition: font-size 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.small {
  font-size: 0.9rem;
}
</style>
