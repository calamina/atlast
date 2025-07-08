<script setup lang="ts">
import type { MediaModel } from '@/models/media.model';
import MediaMock from './media/MediaMock.vue';
import { lazyLoadComponentIfVisible } from '@/utils/intersect';
const { media } = defineProps<{
  media: MediaModel
}>();

const component = lazyLoadComponentIfVisible({
  componentLoader: () => import('../components/media/MediaSwitch.vue'),
  loadingComponent: MediaMock,
});
</script>

<template>
  <component :is="component" :media></component>
</template>