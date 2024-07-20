<script setup lang="ts">
const props = defineProps<{
  name: string
  info: string | number
  selected?: boolean
}>()
</script>

<template>
  <button class="filter" :class="{ filterSelected: props.selected }">
    <p class="filter__name">{{ props.name }}</p>
    <p class="filter__info">{{ props.info }}</p>
  </button>
</template>

<style scoped lang="scss">
.filter {
  padding: 0.35rem 1.25rem;
  // width: 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;

  &Selected {
    background-color: var(--white);
  }

  &__name {
    font-family: var(--font-bold);
    font-size: 1rem;
    text-transform: capitalize;
  }
  &__info {
    font-family: var(--font-bold);
    opacity: 0.5;
  }
}
</style>
