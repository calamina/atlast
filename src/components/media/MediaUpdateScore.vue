<script setup lang="ts">
import { storeToRefs } from 'pinia'
import IconScore from '@/components/icons/IconScore.vue'
import { useMediaFormStore } from '@/stores/media.form'
import { useStateStore } from '@/stores/state'

const { displaySmall } = storeToRefs(useStateStore())
const { setScore } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <div class="choices" v-if="mediaForm.status !== 'planning'">
    <button v-for="index in 10" type="button" class="score-icon" :key="index" @click="setScore(index)"
      :class="{ iconActive: mediaForm.score! >= index, smallButton: displaySmall }" v-tooltip="index + ' / 10'"
      :aria-label="index + ' / 10'">
      <IconScore />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.choices {
  display: flex;
  align-items: center;
  gap: 0.25rem;

}

.score-icon {
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

.iconActive {
  color: var(--score);
  background-color: var(--score-background);
}

.smallButton {
  padding: 0.1rem 0.75rem;
  height: 1.75rem;
  width: 1.75rem;
  padding: 0.2rem;
  line-height: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 1250px) {
  .choices {
    flex-flow: row wrap;
  }

  // .score-icon {
  //   width: 2rem;
  //   height: 2rem;
  // }
}
</style>
