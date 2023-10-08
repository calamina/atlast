<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

import type { MediaModel } from '@/models/media.model'

import actions from '@/utils/media-actions'
import categs from '@/utils/media-categs'

import IconEditVue from '@/components/icons/IconEdit.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import IconPlus from '../icons/IconPlus.vue'
import IconMinus from '../icons/IconMinus.vue'
import IconRating from '../icons/IconRating.vue'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'

const emits = defineEmits(['enableEdit'])
const props = defineProps<{ media: MediaModel }>()

const status = computed(() => {
  return actions.find((action: { name: string }) => action.name === props.media.action)
})
const categ = computed(() => {
  return categs.find((categ: { name: string }) => categ.name === props.media.categ)
})

const expanded: Ref<boolean | null> = ref(null)
</script>

<template>
  <div class="media" v-if="media.id">
    <div class="media__expand" @click="expanded = !expanded">
      <button class="button-icon media__expand--icon" type="button">
        <IconPlus v-if="!expanded" />
        <IconMinus v-else />
      </button>
    </div>
    <ItemPicture :src="media.thumbnail ?? null" :small="false" />
    <div class="media__content">
      <ItemTitle :title="media.title ?? null" :url="media.url ?? null">
        <IconLikeFull class="media__favorite" v-if="media.like" />
      </ItemTitle>
      <ItemDescription :description="media.description ?? null" />
      <TransitionGroup name="reveal">
        <TagGroup v-if="expanded && media.tags?.length" :max-height="true">
          <TagButton v-for="tag in media.tags" :key="tag" :name="tag" :selected="false" />
        </TagGroup>
        <p class="media__extract" v-if="expanded">{{ media.extract }}</p>
      </TransitionGroup>
      <transition name="reveal"> </transition>
      <div class="media__footer">
        <component
          class="media__status"
          :is="status!.component"
          :style="{ backgroundColor: status!.color }"
        />
        <p class="media__categ">
          {{ media.categ }}
        </p>
        <div class="media__score" v-if="media.score">
          <IconRating v-for="score in media.score" :key="score" class="media__score-icon" />
          <!-- <p class="media__score-text">{{ media.score }}</p> -->
        </div>
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
  gap: 0.75rem;
  padding: 1rem;
  background-color: #efefef;
  border-radius: 1.5rem;
  &:hover {
    background-color: #fff;
    .media__actions,
    .media__expand {
      display: flex;
    }
  }

  &__expand {
    position: absolute;
    top: 2.5rem;
    left: 2.5rem;
    z-index: 600;
    display: none;
    gap: 0.25rem;
    border-radius: 100%;

    &--icon {
      background-color: #fff;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.55rem;
      border-radius: 100%;
    }
  }

  &__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.3rem;
    overflow: hidden;
  }

  &__favorite {
    width: 1.1rem;
    height: 1.1rem;
    color: #dc6389;
  }

  &__extract {
    max-height: 30rem;
    padding-bottom: 0.5rem;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__status {
    height: 1.75rem;
    padding: 0.25rem;
    border-radius: 1rem;
  }

  &__categ {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.75rem;
    font-size: 0.9rem;
    padding: 0.25rem 1rem;
    width: 6rem;
    font-family: 'contaxBold', Arial, sans-serif;
    background-color: #ddd;
    border-radius: 1rem;
    cursor: default;
  }

  &__actions {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 600;
    display: none;
    padding: 0;
    gap: 0.25rem;
    border-radius: 100%;
  }

  &__action {
    background-color: #efefef;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.55rem;
    border-radius: 100%;
  }

  &__score {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.75rem;
    font-size: 0.9rem;
    font-family: 'contaxBold', Arial, sans-serif;
    background-color: #dc956333;
    border-radius: 1rem;
    padding: 0 0.5rem;
  }

  &__score-text {
    font-size: 0.9rem;
    line-height: 1.25rem;
    font-family: 'contaxBold', Arial, sans-serif;
  }

  &__score-icon {
    padding: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    color: #b97749aa;
  }
}

/* TRANSITIONS */
.reveal-enter-active,
.reveal-leave-active {
  transition: max-height 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    padding 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.reveal-enter-from,
.reveal-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
}
</style>
