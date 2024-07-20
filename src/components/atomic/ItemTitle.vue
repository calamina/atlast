<script setup lang="ts">
const props = defineProps<{
  title: string | null
  small?: boolean
  // url: string | null
}>()
</script>

<template>
  <!-- <a v-if="props.title && props.url" class="title" :href="props.url" target="_blank">
    {{ props.title }}
    <slot />
  </a> -->
  <div v-if="props.title" class="title" :class="{smallTitle: props.small}">
    <h2>{{ props.title }}</h2>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  width: fit-content;
  line-height: 1.55rem;
  margin-top: 0.1rem;
  margin-bottom: -0.25rem;

  &.smallTitle {
    margin-top: -0.2rem;

    h2 {
      font-size: 1.2rem;
    }
  }
}

h2 {
  font-size: 1.5rem;
  font-weight: 400;
  font-family: var(--font-bold);
  text-transform: capitalize;
  text-decoration: none;
  color: var(--text);

  
}
</style>
