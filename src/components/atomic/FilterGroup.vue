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
  width: 100%;
  }
  
  h3 {
    text-transform: capitalize;
    font-weight: 400;
    font-size: 1rem;
    font-family: 'contax_pro_66_med_italicIt', 'Arial', sans-serif;
    color: var(--active-plus);
    padding: 0 1rem;
}

</style>
