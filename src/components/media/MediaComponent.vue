<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'
import { useDateFormat, useMouseInElement, useThrottleFn, useTimeAgo } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/user'
import { useTooltipStore } from '@/stores/tooltip'

import type { MediaModel } from '@/models/media.model'

import actions from '@/utils/media-actions'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import IconRating from '../icons/IconRating.vue'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import IconLink from '../icons/IconLink.vue'

const route = useRoute()
const { connectedUser } = storeToRefs(useUserStore())
const { setTooltip, resetTooltip } = useTooltipStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['enableEdit'])
const props = defineProps<{ media: MediaModel }>()

const status = computed(() => {
  return actions.find((action: { name: string }) => action.name === props.media.action)
})

const expanded: Ref<boolean | null> = ref(null)

const toggleEdit = useThrottleFn(() => {
  resetTooltip()
  emits('enableEdit')
}, 500)

// TODO :: move to utils ?
function openLink(url: string | undefined) {
  if (url) window.open(url, "_blank");
}

function formatDate(created?: Date, updated?: Date) : string {
  if(!created) return ''
  const date = updated ?? created
  return useDateFormat(date, 'DD/MM/YY').value + ' — ' + useTimeAgo(date).value
}
</script>

<template>
  <div class="media" v-if="media.id" @click="expanded = !expanded">
    <ItemPicture :src="media.thumbnail ?? null" :small="false" />
    <div class="media__content">
      <!-- <ItemTitle :title="media.title ?? null" :url="media.url ?? null"> -->
      <ItemTitle :title="media.title ?? null">
        <IconLikeFull class="media__favorite" v-if="media.like" />
      </ItemTitle>
      <ItemDescription :description="media.description ?? null" />
      <TransitionGroup name="reveal">
        <TagGroup v-if="expanded && media.tags?.length" :max-height="true">
          <TagButton v-for="tag in media.tags" :key="tag" :name="tag" :selected="false" />
        </TagGroup>
        <p class="media__extract" v-if="expanded">{{ media.extract }}</p>
      </TransitionGroup>
      <div class="media__footer">
        <component class="media__status" :is="status!.component" :style="{ backgroundColor: status!.color }"
          @mouseover="setTooltip(status!.name + ' — ' + formatDate(media.createdAt, media.updatedAt))" @mouseleave="resetTooltip()" />
        <p class="media__categ">
          {{ media.categ }}
        </p>
        <div class="media__score" v-if="media.score" @mouseover="setTooltip(media.score + ' / 10')"
          @mouseleave="resetTooltip()">
          <IconRating v-for="score in media.score" :key="score" class="media__score-icon" />
        </div>
      </div>
    </div>
    <div class="media__actions">
      <button v-if="connectedUser?.username === route.params.username" class="button-icon media__action" type="button"
        @click="openLink(media.url)" @mouseover="setTooltip('Wikipedia link')" @mouseleave="resetTooltip()">
        <IconLink />
      </button>
      <button v-if="connectedUser?.username === route.params.username" class="button-icon media__action" type="button"
        @click="toggleEdit" @mouseover="setTooltip('Edit')" @mouseleave="resetTooltip()">
        <IconEdit />
      </button>
      <!-- <button v-else class="button-icon media__action" type="button" @click="toggleAdd">
        <IconPlus />
      </button> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.media {
  animation: enter 0.3s ease-in-out;
  transform-origin: left;
  position: relative;
  display: flex;
  flex-flow: row;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--white);
    .media__actions {
      display: flex;
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
    color: var(--favorite);
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
    padding: 0 0 0.25rem;
    width: 6rem;
    font-family: var(--font-bold);
    background-color: var(--background-darker);
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
    background-color: var(--background);
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.55rem;
    border-radius: 100%;
    // transition: color 0.1s, background-color 0.1s;

    // &:hover {
    //   color: var(--white);
    //   background-color: var(--highlight);
    // }
  }

  &__score {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.75rem;
    background-color: var(--score-background);
    border-radius: 1rem;
    padding: 0 0.5rem;
  }

  &__score-icon {
    padding: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    color: var(--score);
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
