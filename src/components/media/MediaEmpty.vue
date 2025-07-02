<script setup lang="ts">
import strings from '@/utils/strings';
import MediaMock from './MediaMock.vue';

const { count } = defineProps < {
  count: number
} > ()
</script>

<template>
  <template v-if="count">
    <p v-if="count">{{ "Empty for now" + strings.SAD }}</p>
  </template>
  <template v-else>
    <MediaMock v-for="i of 2" :key="i" />
    <p>{{ "Add some media by searching" + strings.HAPPY }}</p>
  </template>
</template>
