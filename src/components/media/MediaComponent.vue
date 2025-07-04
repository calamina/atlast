<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useStateStore } from '@/stores/state'

import type { MediaModel } from '@/models/media.model'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'
import TagButton from '@/components/atomic/TagButton.vue'
import TagGroup from '@/components/atomic/TagGroup.vue'
import ItemScore from '@/components/atomic/ItemScore.vue'
import ItemCateg from '@/components/atomic/ItemCateg.vue'
import ItemStatus from '@/components/atomic/ItemStatus.vue'
import ItemActions from '../atomic/ItemActions.vue'
import ItemExtract from '../atomic/ItemExtract.vue'

const { displaySmall, displayImages } = storeToRefs(useStateStore())
const { media } = defineProps<{ media: MediaModel }>()
const expanded: Ref<boolean | null> = ref(null)
const showDescription: ComputedRef<boolean> = computed(() => !displaySmall || expanded && !displaySmall.value)
</script>

<template>
  <button class="media" :class="{ mediaSmall: displaySmall }" v-if="media.id" @click="expanded = !expanded">
    <ItemPicture v-if="displayImages" :src="media.thumbnail" />
    <div class="content">
      <ItemTitle v-if="media.title" :title="media.title" :like="media.like ?? false" />
      <Transition name="reveal">
        <ItemDescription v-if="media.description && showDescription" :description="media.description" />
      </Transition>
      <TransitionGroup name="reveal">
        <ItemDescription v-if="expanded && media.description && !showDescription" :description="media.description" />
        <TagGroup v-if="expanded && media.tags?.length" :max-height="true">
          <TagButton v-for="tag in media.tags" :key="tag" :name="tag" :selected="false" />
        </TagGroup>
        <ItemExtract v-if="expanded" :extract="media.extract!" />
      </TransitionGroup>
      <div class="footer" :class="{ smallFooter: displaySmall }">
        <ItemStatus :key="media.status ?? 1" :status="media.status" :updated="media.updatedAt"
                    :created="media.createdAt" />
        <ItemCateg :categ="media.categ" />
        <ItemScore :score="media.score!" />
      </div>
    </div>
    <ItemActions class="actions" :url="media.url" :id="media.id" />
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
  transition: max-height 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    opacity 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53),
    padding 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.reveal-enter-from,
.reveal-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0;
}

@media (max-width: 1250px) {
  .media {
    padding: 0.5rem;
    border-radius: 0.75rem;
    // flex-flow: column;
  }

  .actions {
    display: flex;
  }
}
</style>
