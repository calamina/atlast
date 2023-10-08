<script setup lang="ts">
import type { MediaModel } from '@/models/media.model'
import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'

const props = defineProps<{ media: MediaModel }>()
</script>

<template>
  <div class="media">
    <ItemPicture :src="props.media.thumbnail?.url ?? null" :small="true" />
    <div class="media__content">
      <ItemTitle
        :title="props.media.title ?? null"
        :url="`http://en.wikipedia.com/wiki/${props.media.key}` ?? null"
      />
      <ItemDescription :description="props.media.description ?? null" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media {
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: #fff;

  &:hover {
    background-color: #efefef;
  }
}
</style>
