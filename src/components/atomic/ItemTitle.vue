<script setup lang="ts">
const props = defineProps<{
  title: string
  url: string
}>()
</script>

<template>
  <a class="title" :href="props.url" target="_blank">
    {{ props.title }}
    <slot />
  </a>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  line-height: 1.55rem;
  font-size: 1.5rem;
  margin-top: 0.1rem;
  margin-bottom: -0.25rem;
  font-family: 'contaxBold', Arial, sans-serif;
  text-transform: capitalize;
  text-decoration: none;
  color: black;
  transition: padding 0.3s, font-style 0.3s;
}
</style>
