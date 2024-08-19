<script setup lang="ts">
import type { Component } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const { connectedUser } = storeToRefs(useUserStore())

const props = defineProps<{
  route: string
  name: string
  icon: Component
}>()
</script>

<template>
  <router-link class="type" :to="{ name: props.route, params: { username: connectedUser?.username } }">
    <div class="button-icon">
      <component :is="props.icon" />
    </div>
    <span>{{ props.name }}</span>
  </router-link>
</template>

<style scoped lang="scss">
.type {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  height: 2.5rem;
  background-color: var(--background-darker);
  transition: filter 0.3s;
  transition: background-color 0.2s;
  text-decoration: none;
  width: 100%;

  span {
    padding-right: 1rem;
    padding-bottom: 0.15rem;
    font-family: var(--font-bold);
    color: var(--text);
    text-transform: capitalize;
  }
}

.router-link-active,
.type:hover {
  background-color: var(--highlight);
}


.button-icon {
  background-color: transparent;
}
</style>
