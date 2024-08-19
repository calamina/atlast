<script setup lang="ts">
const props = defineProps<{
  extract: string | null
  small?: boolean
}>()
</script>

<template>
  <p :class="{ small: props.small }">{{ props.extract }}</p>
</template>

<style scoped lang="scss">
p {
  max-height: 30rem;
  padding-bottom: 0.5rem;

  &.small {
    font-size: 0.9rem;
  }
}
</style>
