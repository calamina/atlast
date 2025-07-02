<script setup lang="ts">
import { mediaCategs } from '@/data/media-categs';
import { useMediaFormStore } from '@/stores/media.form';
import { useStateStore } from '@/stores/state';
import { storeToRefs } from 'pinia';

const { displaySmall } = storeToRefs(useStateStore())
const { setCateg } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <div class="choices">
    <button v-for="category in mediaCategs" type="button" class="score" :key="category.name ?? ''"
            @click="setCateg(category.name)"
            :class="{ active: mediaForm.categ === category.name, smallButton: displaySmall }">
      {{ category.single }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.choices {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.score {
  font-family: var(--font-bold);
  font-size: 1rem;
  padding: 0.1rem 1rem 0.2rem;
  height: 2rem;
  border-radius: 1rem;
  color: var(--active-plus);
  background-color: var(--background);
  transition: padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), line-height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), font-size 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.active {
  color: var(--text);
  background-color: var(--highlight);
}

.smallButton {
  padding: 0.1rem 0.75rem;
  height: 1.75rem;
  line-height: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 1250px) {
  .choices {
    flex-flow: row wrap;
  }

  .score {
    height: 2rem;
    border-radius: 2rem;
    padding: 0.1rem 0.75rem 0.2rem;
  }
}
</style>
