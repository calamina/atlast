<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMediaFormStore } from '@/stores/media.form'
import IconLike from '@/components/icons/IconLike.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'

const { setFavorite } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <button class="favorite button-icon" type="button" @click="setFavorite()">
    <IconLikeFull class="love" v-if="mediaForm.like === true" />
    <IconLike v-else />
  </button>
</template>

<style lang="scss" scoped>
.favorite {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  padding: 0.55rem;
  border-radius: 100%;
}

.love {
  color: var(--favorite);
}
</style>
