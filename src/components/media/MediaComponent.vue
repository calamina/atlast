<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useMediaStore } from '@/stores/media'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEditVue from '@/components/icons/IconEdit.vue'
import actions from '@/utils/media-actions'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import type { MediaModel } from '@/models/media.model'
// import IconLike from '@/components/icons/IconLike.vue'

const mediastore = useMediaStore()

const emits = defineEmits(['enableEdit'])
const props = defineProps<{ media: MediaModel }>()

const status = computed(() => {
  return actions.find((action: { name: string }) => action.name === props.media.action)
})

const expanded: Ref<boolean | null> = ref(null)

function deleteMedia(id: number) {
  mediastore.deleteUserMedia(id)
}
</script>

<template>
  <div class="media" v-if="media.id">
    <img class="media__img" @click="expanded = !expanded" :src="media.thumbnail" alt="cover" />
    <div class="media__content">
      <a class="media__link" :href="media.url" target="_blank">
        {{ media.title }}
        <!-- <IconLikeFull class="media__favorite" v-if="media.like" /> -->
        <!-- <span class="media__status1" :style="{ backgroundColor: status!.color }"></span> -->
      </a>
      <p class="media__description">{{ media.description }}</p>
      <transition name="reveal">
        <p class="media__extract" v-if="expanded">{{ media.extract }}</p>
      </transition>
      <div class="media__footer">
        <!-- <button class="media__status" :style="{ backgroundColor: status!.color }">
          {{ media.action }}
        </button> -->
        <IconLikeFull class="media__favorite" v-if="media.like" />
        <button class="media__tag" v-for="tag in media.tags" :key="tag">
          {{ tag }}
        </button>
      </div>
      <!-- <p class="media__score">{{ media.score }}</p> -->
    </div>

    <div class="media__actions">
      <button class="button-icon action" type="button" @click="$emit('enableEdit')">
        <IconEditVue />
      </button>
      <button class="button-icon action" type="button" @click="deleteMedia(media.id)">
        <IconDelete />
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
  &:hover {
    .media__actions {
      display: flex;
    }
  }

  &__img {
    object-fit: cover;
    height: 5rem;
    width: 5rem;
    filter: saturate(0);
    border-radius: 1rem;
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
  }

  &__status {
    padding: 0.05rem 0.5rem;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  &__status1 {
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 100%;
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
    gap: 0.5rem;
  }

  &__favorite {
    width: 1.1rem;
    height: 1.1rem;
    color: #dc6389;
  }

  &__tag {
    padding: 0.05rem 0.5rem;
    background-color: #ddd;
    color: #000000;
    font-size: 0.85rem;
    opacity: 0.5;
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
    top: 0.5rem;
    right: 0.5rem;
    display: none;
    padding: 0;
    gap: 0.25rem;
  }

  &__action {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.55rem;
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
