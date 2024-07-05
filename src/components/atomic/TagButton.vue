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
  display: flex;
  align-items: center;
  height: 1.75rem;
  font-size: 0.9rem;
  padding: 0.25rem 1rem 0.4rem;
  background-color: var(--active);
  width: fit-content;
  font-family: var(--font-bold);
  color: var(--text-light);
  border-radius: 1rem;
  font-size: 0.85rem;
  &::before {
    content: '#';
  }
}

.tagSelected {
  background-color: var(--white);
}
</style>
