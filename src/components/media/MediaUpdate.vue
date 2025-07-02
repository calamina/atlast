<script setup lang="ts">
import { onMounted } from 'vue'
import { onKeyStroke, templateRef } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import type { MediaModel } from '@/models/media.model'
import { MediaActions } from '@/data/media-actions'

import { useStateStore } from '@/stores/state'
import { useMediaFormStore } from '@/stores/media.form'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import ItemExtract from '@/components/atomic/ItemExtract.vue'
import MediaUpdateStatus from './MediaUpdateStatus.vue'
import MediaUpdateCateg from './MediaUpdateCateg.vue'
import MediaUpdateFavorite from './MediaUpdateFavorite.vue'
import MediaUpdateScore from './MediaUpdateScore.vue'
import MediaUpdateActions from './MediaUpdateActions.vue'
import MediaUpdateTags from './MediaUpdateTags.vue'

const { displaySmall, displayImages } = storeToRefs(useStateStore())
const { setupMediaForm, resetActive } = useMediaFormStore()
const { mediaForm } = storeToRefs(useMediaFormStore())

const { media, action } = defineProps<{
  media: MediaModel
  action: MediaActions
}>()

const form = templateRef<HTMLButtonElement | null>("form")

onMounted(() => {
  setupMediaForm(media, action)
  form.value?.focus()
})

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    resetActive()
  }
})
</script>

<template>
  <button ref="form" class="media" :class="{ mediaSmall: displaySmall }" v-if="mediaForm">
    <ItemPicture v-if="displayImages" :src="mediaForm.image" :small="displaySmall" />
    <form class="content" @submit.prevent>
      <ItemTitle v-if="mediaForm.title" :title="mediaForm.title" />
      <ItemDescription v-if="mediaForm.description" :description="mediaForm.description" />
      <ItemExtract v-if="mediaForm.extract" :extract="mediaForm.extract" />
      <MediaUpdateFavorite />
      <div class="form">
        <MediaUpdateStatus />
        <MediaUpdateCateg />
        <MediaUpdateScore />
        <div class="footer">
          <MediaUpdateTags />
          <MediaUpdateActions :action />
        </div>
      </div>
    </form>
  </button>
</template>

<style lang="scss" scoped>
.media {
  position: relative;
  display: flex;
  flex-flow: row;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: var(--white);
  width: 100%;
  transition: padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), gap 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53), border-radius 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);

  &:focus {
    outline: 2px solid var(--background-darker);
  }
}

.content {
  display: flex;
  flex-flow: column;
  gap: 0.3rem;
  flex: 1;
  overflow: hidden;
}

.form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  transition: gap 0.2s;
}

.footer {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: start;
  gap: 5rem;
}

.mediaSmall {
  padding: 0.5rem;
  // gap: 0.5rem;
  border-radius: 1rem;

  .form {
    gap: 0.25rem;
  }
}

@media (max-width: 1250px) {
  .media {
    flex-flow: column;
    padding: 0.5rem;
    border-radius: 0.75rem;
  }

  .footer {
    gap: 1rem;
  }
}
</style>
