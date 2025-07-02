<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import IconLikeFull from '../icons/IconLikeFull.vue';
import { storeToRefs } from 'pinia';

const { displaySmall } = storeToRefs(useStateStore())
const { title, like } = defineProps<{
  title: string | null
  like?: boolean | null
}>()
</script>

<template>
  <div v-if="title" class="title" :class="{ smallTitle: displaySmall }">
    <h2>{{ title }}</h2>
    <IconLikeFull class="like" v-if="like" />
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  width: fit-content;
  line-height: 1.55rem;
  margin-top: 0.1rem;
  margin-bottom: -0.25rem;
  width: 100%;
  overflow: hidden;
  transition: margin-top 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.smallTitle {
  margin-top: -0.2rem;

  h2 {
    font-size: 1.2rem;
  }
}

h2 {
  font-size: 1.5rem;
  font-weight: 400;
  font-family: var(--font-bold);
  text-transform: capitalize;
  text-decoration: none;
  color: var(--text);
  transition: font-size 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.like {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--favorite);
}

@media (max-width: 1250px) {
  .title {
    flex-flow: row-reverse;
  }

  h2 {
    // width: 100%;
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
