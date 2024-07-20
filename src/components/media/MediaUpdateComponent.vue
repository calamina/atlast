<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useWiki } from '@/stores/wiki'

import actions from '@/utils/media-actions'

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

const route = useRoute()
const user = useUserStore()
const mediastore = useMediaStore()
const wikiservice = useWiki()
const { confirmOrCancel } = useConfirmStore()
const { displaySmall, displayImages } = storeToRefs(useStateStore())

const props = defineProps<{
  media: MediaModel
  action: string
}>()
const emits = defineEmits(['cancel', 'confirm'])

const categories = mediaCategs.map(categ => categ.name)
const media: Ref<MediaModel> = ref({})

onMounted(() => {
  if (props.action === 'editMedia' && route.params.username === user.connectedUser!.username) {
    media.value = {
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
      image: props.media?.image,
      key: props.media?.key
    }
  } else
    wikiservice.getWikiByLink(props.media.key!).then((data) => {
      media.value = {
        ...data,
        tagstring: props.media.tags?.join(' '),
        score: 0,
        action: 'completed',
        categ: 'movie',
        key: props.media.key
      }
    })
})

const addMedia = useThrottleFn((media: MediaModel) => {
  if (media.action === 'planning') media.score = 0
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  media.user = user.connectedUser!.username
  mediastore
    .addUserMedia(media)
    .then(() => emits('confirm'))
}, 500)

const editMedia = useThrottleFn((media?: MediaModel) => {
  if (!media) return
  if (media.action === 'planning') media.score = 0
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  mediastore
    .editUserMedia(media)
    .then(() => emits('confirm'))
}, 500)

const deleteMedia = useThrottleFn((id: number) => {
  confirmOrCancel('Are you sure you want to delete this media ?')
    .then((confirm: boolean) => {
      if (confirm) {
        mediastore
          .deleteUserMedia(id)
          .then(() => emits('cancel'))
      }
    })
}, 500)
</script>
<template>
  <div class="media" :class="{mediaSmall: displaySmall}" v-if="media">
    <ItemPicture :src="media.image ?? null" :small="displaySmall" v-if="displayImages" />
    <div class="media__content">
      <ItemTitle :title="media.title ?? null" :small="displaySmall" />
      <!-- <ItemTitle :title="media.title ?? null" :url="media.url ?? null" /> -->
      <ItemDescription :description="media.description ?? null" />
      <p class="media__extract">{{ media.extract }}</p>
      <button class="media__favorite button-icon" type="button" @click="media.like = !media.like">
        <IconLikeFull class="love" v-if="media.like === true" />
        <IconLike v-else />
      </button>
      <div class="media__form">
        <div class="choices">
          <button v-for="action in actions" type="button" class="rating" :key="action.name"
            @click="media.action = action.name" :style="{
              backgroundColor: media.action === action.name ? action.color : 'var(--background)'
            }" :class="{ active: media.action === action.name }">
            {{ action.name }}
          </button>
        </div>
        <div class="choices">
          <button v-for="category in categories" type="button" class="rating" :key="category"
            @click="media.categ = category" :class="{ active: media.categ === category }">
            {{ category }}
          </button>
        </div>
        <div class="choices" v-if="media.action !== 'planning'">
          <button v-for="index in 10" type="button" class="rating-icon" :key="index" @click="media.score = index"
            :class="{ iconActive: media.score! >= index }">
            <IconRating />
          </button>
        </div>
        <div class="media__footer">
          <input placeholder="tags (separate with space)" class="media__tags" type="text" v-model="media.tagstring" />
          <div class="media__actions" v-if="props.action === 'createMedia'">
            <button class="button-icon media__cancel" type="reset" @click="$emit('cancel', props.media)">
              <IconBack />
            </button>
            <button class="button-icon media__submit" type="submit" @click="addMedia(media)">
              <IconCheck />
            </button>
          </div>
          <div class="media__actions" v-if="props.action === 'editMedia'">
            <button class="button-icon media__cancel" type="reset" @click="$emit('cancel', props.media)">
              <IconBack />
            </button>
            <button class="button-icon media__cancel" type="button" @click="deleteMedia(props.media.id!)">
              <IconDelete />
            </button>
            <button class="button-icon media__submit" type="button" @click="editMedia(media)">
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
  display: flex;
  flex-flow: row;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--white);
  border-radius: 1rem;

  &.mediaSmall {
    padding: 0.5rem;
    border-radius: 1rem;
    // font-size: 0.8rem;

    .media__extract {
      padding-bottom: 0.25rem;
    }
    .media__form {
      gap: 0.25rem;
    }
    .rating, .media__tags, .media__footer {
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
  .media__content {
    margin-top: -0.5rem;
  }

  // img {
  //   display: none;
  // }
  .choices .rating {
    height: 2.5rem;
    border-radius: 2.5rem;
  }

  .choices {
    flex-flow: row wrap;
    // gap: 0.5rem;
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
