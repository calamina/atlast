<script setup lang="ts">
import strings from '@/utils/strings';

const props = defineProps<{
  src: string | null
  small: boolean | null
}>()
</script>

<template>
  <img class="image" v-if="props.src" :src="props.src" :class="{ imagesmall: small }" />
  <div class="image empty" v-else :class="{ imagesmall: small }" >{{ strings.SAD }}</div>
</template>

<style scoped lang="scss">
.image {
  object-fit: cover;
  height: 5.5rem;
  width: 5.5rem;
  filter: saturate(0);
  border-radius: 1rem;
  background-color: var(--active);
  flex-shrink: 0;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--active-plus)
}

.imagesmall {
  height: 3rem;
  width: 3rem;
  border-radius: 0.75rem;

  &.empty {
    font-size: 0.6rem;
  }
}
</style>
