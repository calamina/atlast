<script setup lang="ts">
const { maxHeight } = defineProps<{
  maxHeight: boolean
}>()
</script>
<template>
  <div class="tags" :class="{ tagsHeight: maxHeight }">
    <slot />
  </div>
</template>
<style scope lang="scss">
.tags {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
}

.tagsHeight {
  max-height: 10rem;
}
</style>
