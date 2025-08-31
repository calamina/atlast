<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import IconScore from '../icons/IconScore.vue';

const { displaySmall } = useStateStore()
const { score } = defineProps<{
  score: number
}>()
</script>

<template>
  <div class="widescreen-score" v-if="score" :class="{ smallScore: displaySmall }" v-tooltip="score + ' / 10'"
    :aria-label="'Media score:' + score + ' / 10'">
    <IconScore v-for="point in score" :key="point" class="icon" />
  </div>
  <div class="mobile-score" v-if="score" :class="{ smallScore: displaySmall }"
    :aria-label="'Media score:' + score + ' / 10'">
    <p>{{ score }}</p>
    <IconScore class="icon" />
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.25rem;
  height: 1.75rem;
  background-color: var(--score-background);
  border-radius: 1rem;
  padding: 0 0.5rem;

}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  color: var(--score);
}

p {
  color: var(--score-text);
}

.smallScore {
  height: 1.5rem;
  gap: 0.1rem;
  padding: 0 0.25rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.mobile-score {
  display: none;
}

@media (max-width: 1250px) {
  .widescreen-score {
    display: none;
  }

  .mobile-score {
    display: flex;
  }

  // .icon {
  //   width: 1.1rem;
  //   height: 1.1rem;
  // }
}
</style>
