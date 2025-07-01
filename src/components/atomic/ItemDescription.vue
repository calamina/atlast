<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import strings from '@/utils/strings';
import { storeToRefs } from 'pinia';

const { displaySmall } = storeToRefs(useStateStore())
const { description } = defineProps<{
  description: string | null
}>()
</script>

<template>
  <p class="description" :class="{ smallDescription: displaySmall }" v-if="description">{{ description ??
    ('No description ' + strings.SAD) }}</p>
</template>

<style scoped lang="scss">
.description {
  font-family: var(--font-italic);
  opacity: 0.7;
  max-height: 3rem;
  text-align: left;
  transition: font-size 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.smallDescription {
  font-size: 0.9rem;
}

@media (max-width: 1250px) {
  .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
