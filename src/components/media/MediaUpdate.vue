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
    <ItemPicture :src="mediaForm.image ?? null" v-if="displayImages" />
    <form class="content" @submit.prevent>
      <ItemTitle :title="mediaForm.title ?? null" />
      <ItemDescription :description="mediaForm.description ?? null" />
      <ItemExtract :extract="mediaForm.extract ?? null" />
      <MediaUpdateFavorite />
      <div class="form">
        <MediaUpdateStatus />
        <MediaUpdateCateg />
        <MediaUpdateScore />
        <div class="footer">
          <input placeholder="tags (separate with space)" class="tags" type="text" v-model="mediaForm.tagstring" />
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

  &:focus {
    outline: 2px solid var(--background-darker);
  }

  &.mediaSmall {
    padding: 0.5rem;
    border-radius: 1rem;

    .form {
      gap: 0.25rem;
    }

    .tags,
    .footer {
      height: 2rem;
    }
  }
}

.content {
  display: flex;
  flex-flow: column;
  gap: 0.3rem;
  flex: 1;
}

.form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.footer {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: start;
  gap: 5rem;
}

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

@media (max-width: 1250px) {
  .media__form {
    padding-top: 0.5rem;
    gap: 1rem;
  }

  .media__footer {
    gap: 1rem;
  }
}
</style>
