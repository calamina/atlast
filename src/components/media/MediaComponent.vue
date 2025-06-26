<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useTooltipStore } from '@/stores/tooltip'
import { useStateStore } from '@/stores/state'

import type { MediaModel } from '@/models/media.model'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import ItemRating from '@/components/atomic/ItemRating.vue'
import ItemCateg from '@/components/atomic/ItemCateg.vue'
import ItemStatus from '@/components/atomic/ItemStatus.vue'
import ItemActions from '../atomic/ItemActions.vue'
import ItemExtract from '../atomic/ItemExtract.vue'

const { resetTooltip } = useTooltipStore()
const { displaySmall, displayImages } = storeToRefs(useStateStore())

const emits = defineEmits(['enableEdit'])
const { media } = defineProps<{ media: MediaModel }>()

const expanded: Ref<boolean | null> = ref(null)

const toggleEdit = useThrottleFn(() => {
  resetTooltip()
  emits('enableEdit')
}, 500)
</script>

<template>
  <button class="media" :class="{ mediaSmall: displaySmall }" v-if="media.id" @click="expanded = !expanded">
    <ItemPicture v-if="displayImages" :src="media.thumbnail ?? null" />
    <div class="content">
      <ItemTitle :title="media.title ?? null" :like="media.like ?? null" />
      <Transition name="reveal">
        <ItemDescription v-if="!displaySmall || expanded && displaySmall" :description="media.description ?? null" />
      </Transition>
      <TransitionGroup name="reveal">
        <TagGroup v-if="expanded && media.tags?.length" :max-height="true">
          <TagButton v-for="tag in media.tags" :key="tag" :name="tag" :selected="false" />
        </TagGroup>
        <ItemExtract v-if="expanded" :extract="media.extract!" />
      </TransitionGroup>
      <div class="footer" :class="{ smallFooter: displaySmall }">
        <ItemStatus :status="media.action!" :dates="{ created: media.createdAt, updated: media.updatedAt }" />
        <ItemCateg :categ="media.categ" />
        <ItemRating :score="media.score!" />
      </div>
    </div>
    <ItemActions class="actions" :url="media.url!" @enableEdit="toggleEdit()" />
  </button>
</template>

<style lang="scss" scoped>
.media {
  animation: enter 0.3s ease-in-out;
  transform-origin: left;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-flow: row;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1.5rem;
  outline: none;

  &:focus {
    outline: none;
  }

  // cursor: pointer;

  &.mediaSmall {
    padding: 0.5rem;
    border-radius: 1rem;
  }

  &:hover,
  &:focus-within {
    background-color: var(--white);

    .actions {
      display: flex;
    }
  }
}

.actions {
  display: none;
}

.content {
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 0.3rem;
  overflow: hidden;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  &.smallFooter {
    gap: 0.25rem;
    padding-top: 0.1rem;
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
