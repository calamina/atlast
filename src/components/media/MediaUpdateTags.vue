<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMediaFormStore } from '@/stores/media.form'
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <input placeholder="tags (separate with space)" class="tags" type="text" v-model="mediaForm.tagstring" />
</template>

<style lang="scss" scoped>
.tags {
  padding: 0.5rem 1rem;
  background-color: var(--background);
  color: var(--text);
  border-radius: 1rem;
  width: 100%;
  font-size: 0.85rem;
  font-size: 1rem;
  height: 2.5rem;
  font-family: var(--font-bold);
}
</style>
