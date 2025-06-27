<script setup lang="ts">
import { mediaCategs } from '@/data/media-categs';
import { useMediaFormStore } from '@/stores/media.form';
import { storeToRefs } from 'pinia';

const { setCateg } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())

const categories = mediaCategs.map(categ => categ.name)
</script>

<template>
  <div class="choices">
    <button v-for="category in categories" type="button" class="rating" :key="category ?? ''"
      @click="setCateg(category)" :class="{ active: mediaForm.categ === category }">
      {{ category }}
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
    color: var(--text);
    background-color: var(--highlight);
  }
}

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
