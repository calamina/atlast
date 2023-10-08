<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="filter-categ">
    <h3 v-if="props.title.length">{{ props.title }}</h3>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.filter-categ {
  display: flex;
  flex-flow: column;
  border-radius: 1rem;
}

h3 {
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1rem;
  font-family: 'contaxItalic', 'Arial', sans-serif;
  color: #999;
  padding: 0 1rem 0.25rem;
}
</style>
