<script setup lang="ts">
import IconSortAscending from '../icons/IconSortAscending.vue';
import IconSortDescending from '../icons/IconSortDescending.vue';

const props = defineProps<{
  name: string
  info?: string | number
  selected?: boolean
  sort?: string
}>()
</script>

<template>
  <button class="filter" :class="{ selected: props.selected }">
    <p class="filter__name">{{ props.name }}</p>
    <p class="filter__info">{{ props.info }}</p>
    <template v-if="selected && sort">
      <IconSortAscending class="filter__icon" v-if="sort === 'ascending'" />
      <IconSortDescending class="filter__icon" v-if="sort === 'descending'" />
    </template>
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

  &.selected {
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

  &__icon {
    height: 1rem;
    width: 1rem;
    opacity: 0.7;
  }
}
</style>
