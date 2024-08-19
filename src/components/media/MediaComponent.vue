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
const props = defineProps<{ media: MediaModel }>()

const expanded: Ref<boolean | null> = ref(null)
const displayActions: Ref<boolean | null> = ref(null)

const toggleEdit = useThrottleFn(() => {
  resetTooltip()
  emits('enableEdit')
}, 500)
</script>

<template>
  <div class="media" :class="{ mediaSmall: displaySmall }" v-if="props.media.id" @click="expanded = !expanded"
    @mouseenter="displayActions = true" @mouseleave="displayActions = false">
    <ItemPicture v-if="displayImages" :src="props.media.thumbnail ?? null" :small="displaySmall" />
    <div class="content">
      <ItemTitle :title="props.media.title ?? null" :like="props.media.like ?? null" :small="displaySmall" />
      <Transition name="reveal">
      <ItemDescription v-if="!displaySmall || expanded && displaySmall" :description="props.media.description ?? null" :small="displaySmall" />
      </Transition>
      <TransitionGroup name="reveal">
        <!-- <ItemDescription v-if="expanded && displaySmall" :description="props.media.description ?? null" :small="displaySmall" /> -->
        <TagGroup v-if="expanded && props.media.tags?.length" :max-height="true">
          <TagButton v-for="tag in props.media.tags" :key="tag" :name="tag" :selected="false" />
        </TagGroup>
        <ItemExtract v-if="expanded" :extract="props.media.extract!" :small="displaySmall"/>
      </TransitionGroup>
      <div class="footer" :class="{ smallFooter: displaySmall }">
        <ItemStatus :status="props.media.action!"
          :dates="{ created: props.media.createdAt!, updated: props.media.updatedAt! }" :small="displaySmall" />
        <ItemCateg :categ="props.media.categ" :small="displaySmall" />
        <ItemRating :score="props.media.score!" :small="displaySmall" />
      </div>
    </div>
    <ItemActions v-if="displayActions" :url="media.url!" :user="media.user!" @enableEdit="toggleEdit()" />
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
  border-radius: 1.5rem;
  cursor: pointer;

  &.mediaSmall {
    padding: 0.5rem;
    border-radius: 1rem;
  }

  &:hover {
    background-color: var(--white);
  }
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
