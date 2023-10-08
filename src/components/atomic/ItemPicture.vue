<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>

<template>
  <img class="image" v-if="props.src" :src="props.src" />
  <div class="image" v-else />
</template>

<style scoped lang="scss">
.image {
  object-fit: cover;
  height: 5.5rem;
  width: 5.5rem;
  filter: saturate(0);
  border-radius: 1rem;
  background-color: #ddd;
}
</style>
