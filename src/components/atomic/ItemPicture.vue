<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import strings from '@/utils/strings';
import { storeToRefs } from 'pinia';
import { computed, type ComputedRef } from 'vue';

const { displaySmall } = storeToRefs(useStateStore())
const { src, small } = defineProps<{
  src: string | null | undefined
  small?: boolean
}>()

const isSmall: ComputedRef<boolean> = computed(() => small === undefined ? displaySmall.value : small || displaySmall.value)
</script>

<template>
  <img class="image" v-if="src" :src="src" loading="lazy" :class="{ imagesmall: isSmall }"
       alt="Wikipedia entry image" />
  <div class="image empty" v-else :class="{ imagesmall: displaySmall || small }">{{ strings.SAD }}</div>
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
  transition: width 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), border-radius 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
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

@media (max-width: 1250px) {
  .image {
    height: 3rem;
    width: 3rem;
    border-radius: 0.5rem;
  }
}
</style>
