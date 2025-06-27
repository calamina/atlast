<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconRating from '@/components/icons/IconRating.vue'
import { useMediaFormStore } from '@/stores/media.form'

const { setScore } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <div class="choices" v-if="mediaForm.status !== 'planning'">
    <button v-for="index in 10" type="button" class="rating-icon" :key="index" @click="setScore(index)"
      :class="{ iconActive: mediaForm.score! >= index }" v-tooltip="index + ' / 10'" :aria-label="index + ' / 10'">
      <IconRating />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.choices {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & .rating {
    font-family: var(--font-bold);
    font-size: 1rem;
    padding: 0.1rem 1rem;
    padding: 0.1rem 1rem 0.2rem;
    height: 2rem;
    border-radius: 1rem;
    color: var(--active-plus);
    background-color: var(--background);
  }

  & .active {
    background-color: var(--highlight);
    color: var(--text);
  }

  & .rating-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    width: 2.2rem;
    height: 2.2rem;
    color: var(--active-plus);
    border-radius: 100%;
    background-color: var(--background);
  }

  & .iconActive {
    color: var(--score);
    background-color: var(--score-background);
  }
}

// smol
// .rating
// {
//   height: 2rem;
// }

// .rating-icon {
//   width: 2rem;
//   height: 2rem;
// }

@media (max-width: 1250px) {
  .choices .rating {
    height: 2.5rem;
    border-radius: 2.5rem;
  }

  .choices {
    flex-flow: row wrap;
  }
}
</style>
