<script setup lang="ts">
const props = defineProps<{
  description: string | null
}>()
</script>

<template>
  <p class="description" v-if="props.description">{{ props.description }}</p>
  <p class="description" v-else>No description :(</p>
</template>

<style scoped lang="scss">
.description {
  font-family: var(--font-italic);
  opacity: 0.7;
}
</style>
