<script setup lang="ts">
const props = defineProps<{
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
  gap: 0.5rem;
}

.tagsHeight {
  max-height: 10rem;
}
</style>
