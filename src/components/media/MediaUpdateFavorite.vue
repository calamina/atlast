<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMediaFormStore } from '@/stores/media.form'
import IconLike from '@/components/icons/IconLike.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import { useStateStore } from '@/stores/state'

const { displaySmall } = storeToRefs(useStateStore())
const { setFavorite } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())
</script>

<template>
  <button class="favorite button-icon" type="button" :class="{ smallButton: displaySmall }" @click="setFavorite()">
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
  transition: width 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);

  &:focus {
    outline-color: var(--background-darker);
  }
}

.smallButton {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.25rem;
}

.love {
  color: var(--favorite);
}

@media (max-width: 1250px) {
  // .favorite {
  //   width: 1.75rem;
  //   height: 1.75rem;
  //   padding: 0.25rem;
  // }
}
</style>
