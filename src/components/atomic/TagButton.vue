<script setup lang="ts">
const props = defineProps<{
  name: string
  selected?: boolean
}>()
</script>
<template>
  <button class="media__tag" :class="{ tagSelected: selected }">
    {{ props.name }}
  </button>
</template>
<style scope lang="scss">
.media__tag {
  height: 1.75rem;
  font-size: 0.9rem;
  padding: 0.25rem 1rem;
  background-color: #ddd;
  width: fit-content;
  font-family: 'contaxBold', Arial, sans-serif;
  color: #777;
  border-radius: 1rem;
  font-size: 0.85rem;
  &::before {
    content: '#';
  }
}

.tagSelected {
  background-color: #fff;
}
</style>
