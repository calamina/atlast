<script setup lang="ts">
import { useStateStore } from '@/stores/state';
import IconLikeFull from '../icons/IconLikeFull.vue';

const { displaySmall } = useStateStore()
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
  align-items: baseline;
  gap: 0.5rem;
  width: fit-content;
  line-height: 1.55rem;
  margin-top: 0.1rem;
  margin-bottom: -0.25rem;
  white-space: nowrap;
  text-overflow: ellipsis;

  &.smallTitle {
    margin-top: -0.2rem;

    h2 {
      font-size: 1.2rem;
    }
  }
}

h2 {
  font-size: 1.5rem;
  font-weight: 400;
  font-family: var(--font-bold);
  text-transform: capitalize;
  text-decoration: none;
  color: var(--text);
}

.like {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--favorite);
}
</style>
