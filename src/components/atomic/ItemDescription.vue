<script setup lang="ts">
import strings from '@/utils/strings';

const props = defineProps<{
  description: string | null
  small?: boolean
}>()
</script>

<template>
  <p class="description" :class="{ smallDescription: props.small }" v-if="props.description">{{ props.description ?? ('No description ' + strings.SAD) }}</p>
</template>

<style scoped lang="scss">
.description {
  font-family: var(--font-italic);
  opacity: 0.7;
  max-height: 3rem;

  &.smallDescription {
    font-size: 0.9rem;
  }
}

@media (max-width: 1250px) {
  .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
