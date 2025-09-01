<script setup lang="ts">
import MediaFiltersViewLarge from './MediaFiltersViewLarge.vue';
import MediaFiltersViewSmall from './MediaFiltersViewSmall.vue';
</script>

<template>
  <MediaFiltersViewLarge class="large" />
  <MediaFiltersViewSmall class="small" />
</template>

<style lang="scss" scoped>
.large {
  display: flex;
}

.small {
  display: none;
}

@media (max-width: 1250px) {
  .large {
    display: none;
  }

  .small {
    display: flex;
  }
}
</style>