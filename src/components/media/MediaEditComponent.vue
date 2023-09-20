<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import type { MediaModel } from '@/models/media.model'

const props = defineProps<{
  media: MediaModel
}>()

const emits = defineEmits(['confirmEdit', 'cancelEdit'])

const actions: string[] = ['planning', 'watching', 'completed', 'dropped', 'paused']
const categories: string[] = ['movie', 'series', 'game', 'book', 'comic']

let mediaEdit: Ref<MediaModel> = ref({
  id: props.media?.id,
  title: props.media?.title,
  url: props.media?.url,
  description: props.media?.description,
  tagstring: props.media?.tags?.join(' '),
  categ: props.media?.categ,
  action: props.media?.action,
  score: props.media?.score,
  like: props.media?.like,
  extract: props.media?.extract,
  image: props.media?.image
})
</script>
<template>
  <div class="media" v-if="mediaEdit">
    <img class="media__image" v-if="mediaEdit.image" :src="mediaEdit.image" />
    <div class="media__content">
      <a class="media__link" :href="mediaEdit.url" target="_blank">
        {{ mediaEdit.title }}
      </a>
      <p class="media__description">{{ mediaEdit.description }}</p>
      <p class="media__extract">{{ mediaEdit.extract }}</p>
      <button
        class="media__favorite button-icon"
        type="button"
        @click="mediaEdit.like = !mediaEdit.like"
      >
        <IconLikeFull class="love" v-if="mediaEdit.like === true" />
        <IconLike v-else />
      </button>
      <div class="media__form">
        <div>
          <p class="label">rating</p>
          <div class="ratings">
            <button
              v-for="index in 10"
              type="button"
              class="rating"
              :key="index"
              @click="mediaEdit.score = index"
              :class="{ active: mediaEdit.score === index }"
            >
              {{ index }}
            </button>
          </div>
        </div>
        <div>
          <p class="label">action</p>
          <div class="ratings">
            <button
              v-for="action in actions"
              type="button"
              class="rating"
              :key="action"
              @click="mediaEdit.action = action"
              :class="{ active: mediaEdit.action === action }"
            >
              {{ action }}
            </button>
          </div>
        </div>
        <div>
          <p class="label">category</p>
          <div class="ratings">
            <button
              v-for="category in categories"
              type="button"
              class="rating"
              :key="category"
              @click="mediaEdit.categ = category"
              :class="{ active: mediaEdit.categ === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="media__footer">
          <div class="media__tags-wrapper">
            <p class="label">tags (separate with space)</p>
            <input class="media__tags" type="text" v-model="mediaEdit.tagstring" />
          </div>
          <div class="media__actions">
            <button class="button-icon" type="reset" @click="$emit('cancelEdit', props.media)">
              <IconDelete />
            </button>
            <button
              class="button-icon media__submit"
              type="button"
              @click="$emit('confirmEdit', mediaEdit)"
            >
              <IconCheck />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.media {
  position: relative;
  width: 45rem;
  display: flex;
  flex-flow: row;
  flex: 1;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 1rem;

  &__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.25rem;
    overflow: hidden;
  }

  &__image {
    object-fit: cover;
    height: 5rem;
    width: 5rem;
    filter: saturate(0);
    border-radius: 1rem;
  }

  &__info {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    overflow: hidden;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    font-size: 1.5rem;
    margin-bottom: -0.5rem;
    font-family: 'contaxBold', Arial, sans-serif;
    text-transform: capitalize;
    text-decoration: none;
    color: black;
    transition: padding 0.3s, font-style 0.3s;
  }

  &__description {
    font-family: 'contaxItalic', Arial, sans-serif;
    opacity: 0.7;
  }

  &__extract {
    padding-bottom: 1rem;
  }

  &__form {
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  &__favorite {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    padding: 0.55rem;
  }

  &__footer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: end;
    gap: 5rem;
  }

  &__tags-wrapper {
    flex: 1;
  }

  &__tags {
    padding: 0.5rem 1rem;
    background-color: #efefef;
    border-radius: 1rem;
    width: 100%;
    font-size: 0.85rem;
  }

  &__actions {
    display: flex;
    flex-flow: row;
    justify-content: end;
    gap: 0.5rem;
  }

  &__submit {
    background-color: #dfcfe8;
    border-radius: 100%;
  }
}

.love {
  color: #dc6389;
  // color: #bfa3d0;
}

.ratings {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;

  & .rating {
    font-family: 'contaxBold', Arial, sans-serif;
    // background-color: #ccc;
    font-size: 1rem;
    min-width: 2rem;
    padding: 0.1rem 1rem;
    height: 2rem;
    border-radius: 1rem;
    color: #999;
    background-color: #efefef;
  }
  & .active {
    opacity: 1;
    background-color: #dfcfe8;
    color: #323232;
    opacity: 1;
  }
}

.label {
  font-size: 0.9rem;
  text-transform: capitalize;
  opacity: 0.5;
  padding-bottom: 0.25rem;
  font-family: 'contaxBold', Arial, sans-serif;
}

// TRANSITIONS
.reveal-enter-active,
.reveal-leave-active {
  transition: max-height 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.reveal-enter-from,
.reveal-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
