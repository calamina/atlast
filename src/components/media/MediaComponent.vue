<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import IconEditVue from '@/components/icons/IconEdit.vue'
import actions from '@/utils/media-actions'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import type { MediaModel } from '@/models/media.model'

const emits = defineEmits(['enableEdit'])
const props = defineProps<{ media: MediaModel }>()

const status = computed(() => {
  return actions.find((action: { name: string }) => action.name === props.media.action)
})

const expanded: Ref<boolean | null> = ref(null)
</script>

<template>
  <div class="media" v-if="media.id">
    <img
      class="media__image"
      v-if="media.image"
      @click="expanded = !expanded"
      :src="media.thumbnail"
    />
    <div class="media__image" v-else @click="expanded = !expanded"></div>
    <div class="media__content">
      <a class="media__link" :href="media.url" target="_blank">
        {{ media.title }}
        <IconLikeFull class="media__favorite" v-if="media.like" />
      </a>
      <p class="media__description">{{ media.description }}</p>
      <transition name="reveal">
        <p class="media__extract" v-if="expanded">{{ media.extract }}</p>
      </transition>
      <div class="media__footer">
        <p class="media__status" :style="{ backgroundColor: status!.color }">
          {{ media.action }}
        </p>
        <p class="media__tag" v-for="tag in media.tags" :key="tag">
          {{ tag }}
        </p>
      </div>
    </div>

    <div class="media__actions">
      <button class="button-icon media__action" type="button" @click="$emit('enableEdit')">
        <IconEditVue />
      </button>
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
  background-color: #efefef;
  border-radius: 1.5rem;
  &:hover {
    background-color: #fff;
    .media__actions {
      display: flex;
    }
  }

  &__image {
    object-fit: cover;
    height: 5rem;
    width: 5rem;
    filter: saturate(0);
    border-radius: 1rem;
    background-color: #ddd;
    display: flex;
    font-size: 0.9rem;
    color: #777;
    align-items: center;
    justify-content: center;
    font-family: 'contaxBold', Arial, sans-serif;
  }

  &__score {
    font-size: 1rem;
    font-family: 'contaxBold', Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 2.5rem;
  }

  &__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.25rem;
    overflow: hidden;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    font-size: 1.5rem;
    // line-height: 1.4rem;
    margin-bottom: -0.5rem;
    font-family: 'contaxBold', Arial, sans-serif;
    text-transform: capitalize;
    text-decoration: none;
    color: black;
    transition: padding 0.3s, font-style 0.3s;

    // &:hover {
    //   color: #b48bcc;
    // }
  }

  &__status {
    padding: 0.1rem 0.75rem;
    font-size: 0.85rem;
    border-radius: 1rem;
    color: #343434aa;
    font-family: 'contaxBold', Arial, sans-serif;
  }

  &__description {
    font-family: 'contaxItalic', Arial, sans-serif;
    opacity: 0.7;
  }

  &__extract {
    max-height: 30rem;
  }

  &__footer {
    margin-top: -0.05rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }

  &__favorite {
    width: 1.1rem;
    height: 1.1rem;
    color: #dc6389;
  }

  &__tag {
    padding: 0.1rem 0.75rem;
    background-color: #ddd;
    border-radius: 1rem;
    color: #777;
    font-size: 0.85rem;
    transition: opacity 0.3s;
    &::before {
      content: '#';
    }
    &:hover {
      opacity: 1;
    }
  }

  &__actions {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    // top: 2.25rem;
    // left: 2.25rem;
    // right: 2.25rem;
    z-index: 600;
    display: none;
    padding: 0;
    gap: 0.25rem;
  }

  &__action {
    background-color: #fff;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.55rem;
    border-radius: 100%;
  }
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
