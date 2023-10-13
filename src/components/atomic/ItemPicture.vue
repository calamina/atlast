<script setup lang="ts">
const props = defineProps<{
  src: string | null
  small: boolean | null
}>()
</script>

<template>
  <img class="image" v-if="props.src" :src="props.src" :class="{ imagesmall: small }" />
  <div class="image" v-else :class="{ imagesmall: small }" />
</template>

<style scoped lang="scss">
.image {
  object-fit: cover;
  height: 5.5rem;
  width: 5.5rem;
  filter: saturate(0);
  border-radius: 1rem;
  background-color: #ddd;
  flex-shrink: 0;
}

.imagesmall {
  height: 3rem;
  width: 3rem;
}
</style>
