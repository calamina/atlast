<script setup lang="ts">
import { mediaStatus } from '@/data/media-status'
import type { StatusModel } from '@/models/status.model';
import { useMediaFormStore } from '@/stores/media.form';
import { storeToRefs } from 'pinia';

const { setStatus } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())

const getBackground = (status: StatusModel) =>
  mediaForm.value.status === status.name ? status.color : 'var(--background)'
</script>

<template>
  <div class="choices">
    <button v-for="s in mediaStatus" type="button" class="rating" :key="s.name ?? 1" @click="setStatus(s.name)"
      :style="{ backgroundColor: getBackground(s) }" :class="{ active: mediaForm.status === s.name }">
      {{ s.name }}
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
