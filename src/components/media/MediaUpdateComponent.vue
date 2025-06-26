<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { onKeyStroke, templateRef, useThrottleFn } from '@vueuse/core'
import { useMediaStore } from '@/stores/media'
import { useWiki } from '@/stores/wiki'

import status from '@/utils/media-status'

import type { MediaModel } from '@/models/media.model'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'

import IconLike from '@/components/icons/IconLike.vue'
import IconBack from '@/components/icons/IconBack.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconRating from '../icons/IconRating.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import mediaCategs from '@/utils/media-categs'
import { useConfirmStore } from '@/stores/confirm'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/state'
import ItemExtract from '../atomic/ItemExtract.vue'
import { useMediaUtils } from '@/utils/media-utils'
import { MediaActions } from '@/utils/media-actions'

const mediastore = useMediaStore()
const wikiservice = useWiki()
const { confirmOrCancel } = useConfirmStore()
const { displaySmall, displayImages } = storeToRefs(useStateStore())
const { mediaToMediaForm } = useMediaUtils()

const { media, action } = defineProps<{
  media: MediaModel
  action: MediaActions
}>()
const emits = defineEmits(['cancel', 'confirm'])

const categories = mediaCategs.map(categ => categ.name)
const mediaTemp: Ref<MediaModel> = ref({})
const form = templateRef<HTMLButtonElement | null>("form")

onMounted(() => {
  if (action === MediaActions.EDIT) {
    mediaTemp.value = mediaToMediaForm(media)
  } else
    wikiservice.getWikiByLink(media.key!)
      .then((data) => mediaTemp.value = data ?? {})
  form.value?.focus()
})

onKeyStroke(['Escape'], (e) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    emits('cancel')
  }
})

const addMedia = useThrottleFn((media: MediaModel) => {
  if (media.status === 'planning') media.score = 0
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  mediastore
    .addMedia(media)
    .then(() => emits('confirm'))
}, 500)

const editMedia = useThrottleFn((media?: MediaModel) => {
  if (!media) return
  if (media.status === 'planning') media.score = 0
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  mediastore
    .editMedia(media)
    .then(() => emits('confirm'))
}, 500)

const deleteMedia = useThrottleFn((id: number) => {
  confirmOrCancel('Are you sure you want to delete this media ?')
    .then((confirm: boolean) => {
      if (confirm) {
        mediastore
          .deleteMedia(id)
          .then(() => emits('cancel'))
      }
    })
}, 500)
</script>
<template>
  <button ref="form" class="media" :class="{ mediaSmall: displaySmall }" v-if="mediaTemp">
    <ItemPicture :src="mediaTemp.image ?? null" v-if="displayImages" />
    <div class="media__content">
      <ItemTitle :title="mediaTemp.title ?? null" />
      <ItemDescription :description="mediaTemp.description ?? null" />
      <ItemExtract :extract="mediaTemp.extract!" />
      <button class="media__favorite button-icon" type="button" @click="mediaTemp.like = !mediaTemp.like">
        <IconLikeFull class="love" v-if="mediaTemp.like === true" />
        <IconLike v-else />
      </button>
      <div class="media__form">
        <div class="choices">
          <button v-for="s in status" type="button" class="rating" :key="s.name" @click="mediaTemp.status = s.name"
            :style="{
              backgroundColor: mediaTemp.status === s.name ? s.color : 'var(--background)'
            }" :class="{ active: mediaTemp.status === s.name }">
            {{ s.name }}
          </button>
        </div>
        <div class="choices">
          <button v-for="category in categories" type="button" class="rating" :key="category"
            @click="mediaTemp.categ = category" :class="{ active: mediaTemp.categ === category }">
            {{ category }}
          </button>
        </div>
        <div class="choices" v-if="mediaTemp.status !== 'planning'">
          <button v-for="index in 10" type="button" class="rating-icon" :key="index" @click="mediaTemp.score = index"
            :class="{ iconActive: mediaTemp.score! >= index }">
            <IconRating />
          </button>
        </div>
        <div class="media__footer">
          <input placeholder="tags (separate with space)" class="media__tags" type="text"
            v-model="mediaTemp.tagstring" />
          <div class="media__actions" v-if="action === MediaActions.CREATE">
            <button class="button-icon media__cancel" type="reset" @click="$emit('cancel', media)">
              <IconBack />
            </button>
            <button class="button-icon media__submit" type="submit" @click="addMedia(mediaTemp)">
              <IconCheck />
            </button>
          </div>
          <div class="media__actions" v-if="action === MediaActions.EDIT">
            <button class="button-icon media__cancel" type="reset" @click="$emit('cancel', media)">
              <IconBack />
            </button>
            <button class="button-icon media__cancel" type="button" @click="deleteMedia(media.id!)">
              <IconDelete />
            </button>
            <button class="button-icon media__submit" type="button" @click="editMedia(mediaTemp)">
              <IconCheck />
            </button>
          </div>
        </div>
      </div>
    </div>
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

  &:focus {
    // outline: none;
    outline: 2px solid var(--background-darker);
  }

  &.mediaSmall {
    padding: 0.5rem;
    border-radius: 1rem;

    .media__extract {
      padding-bottom: 0.25rem;
    }

    .media__form {
      gap: 0.25rem;
    }

    .rating,
    .media__tags,
    .media__footer {
      height: 2rem;
    }

    .rating-icon {
      width: 2rem;
      height: 2rem;
    }

    .media__actions button {
      height: 2rem;
      width: 2rem;
      padding: 0.3rem;
    }
  }

  &__content {
    display: flex;
    flex-flow: column;
    gap: 0.3rem;
    flex: 1;
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
    border-radius: 100%;
  }

  &__footer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: start;
    gap: 5rem;
  }

  &__tags {
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

  &__actions {
    display: flex;
    flex-flow: row;
    justify-content: end;
    gap: 0.5rem;
  }

  &__submit {
    background-color: var(--highlight);
    border-radius: 100%;
  }

  &__cancel {
    background-color: var(--background);
    border-radius: 100%;
  }
}

.love {
  color: var(--favorite);
}

.choices {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & .rating {
    font-family: var(--font-bold);
    font-size: 1rem;
    padding: 0.1rem 1rem;
    padding: 0.1rem 1rem 0.2rem;
    height: 2rem;
    border-radius: 1rem;
    color: var(--active-plus);
    background-color: var(--background);
  }

  & .active {
    background-color: var(--highlight);
    color: var(--text);
  }

  & .rating-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    width: 2.2rem;
    height: 2.2rem;
    color: var(--active-plus);
    border-radius: 100%;
    background-color: var(--background);
  }

  & .iconActive {
    color: var(--score);
    background-color: var(--score-background);
  }
}

@media (max-width: 1250px) {
  .choices .rating {
    height: 2.5rem;
    border-radius: 2.5rem;
  }

  .choices {
    flex-flow: row wrap;
  }

  .media__form {
    padding-top: 0.5rem;
    gap: 1rem;
  }

  .media__extract {
    display: none;
  }

  .media__footer {
    gap: 1rem;
  }
}
</style>
