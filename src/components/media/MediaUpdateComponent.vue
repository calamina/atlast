<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'

import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useNotificationStore } from '@/stores/notification'
import { useWikiService } from '@/services/wiki.service'

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

const user = useUserStore()
const mediastore = useMediaStore()
const notification = useNotificationStore()

const wikiservice = useWikiService()

const props = defineProps<{
  media: MediaModel
  action: string
}>()

const emits = defineEmits(['cancel', 'confirm'])

const categories: string[] = ['movie', 'series', 'game', 'book', 'comic']

const media: Ref<MediaModel> = ref({})

onMounted(() => {
  if (props.action === 'editMedia') {
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
  } else if (props.action === 'createMedia')
    wikiservice.getWikiByLink(props.media.key!).then((data) => {
      media.value = {
        id: data.id,
        title: data.title,
        url: data.content_urls?.desktop?.page,
        description: data.description,
        tagstring: props.media.tags?.join(' '),
        extract: data.extract,
        image: data.originalimage?.source,
        thumbnail: data.thumbnail?.source,
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
  media.user = user.connectedUser.username
  mediastore
    .addUserMedia(media)
    .then(() => {
      emits('confirm')
    })
    .catch((error) => {
      notification.addNotification({ message: error, type: 'error' })
    })
}, 500)

const editMedia = useThrottleFn((media?: MediaModel) => {
  if (!media) return
  if (media.action === 'planning') media.score = 0
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  mediastore
    .editUserMedia(media)
    .then(() => {
      emits('confirm')
    })
    .catch((error) => {
      notification.addNotification({ message: error, type: 'error' })
    })
}, 500)

const deleteMedia = useThrottleFn((id: number) => {
  mediastore.deleteUserMedia(id)
  emits('cancel')
}, 500)
</script>
<template>
  <div class="media" v-if="media">
    <ItemPicture :src="media.image ?? null" :small="false" />
    <div class="media__content">
      <ItemTitle :title="media.title ?? null" />
      <!-- <ItemTitle :title="media.title ?? null" :url="media.url ?? null" /> -->
      <ItemDescription :description="media.description ?? null" />
      <p class="media__extract">{{ media.extract }}</p>
      <button class="media__favorite button-icon" type="button" @click="media.like = !media.like">
        <IconLikeFull class="love" v-if="media.like === true" />
        <IconLike v-else />
      </button>
      <div class="media__form">
        <div class="choices">
          <button
            v-for="action in actions"
            type="button"
            class="rating"
            :key="action.name"
            @click="media.action = action.name"
            :style="{
              backgroundColor: media.action === action.name ? action.color : '#efefef'
            }"
            :class="{ active: media.action === action.name }"
          >
            {{ action.name }}
          </button>
        </div>
        <div class="choices">
          <button
            v-for="category in categories"
            type="button"
            class="rating"
            :key="category"
            @click="media.categ = category"
            :class="{ active: media.categ === category }"
          >
            {{ category }}
          </button>
        </div>
        <div class="choices" v-if="media.action !== 'planning'">
          <button
            v-for="index in 10"
            type="button"
            class="rating-icon"
            :key="index"
            @click="media.score = index"
            :class="{ iconActive: media.score! >= index }"
          >
            <IconRating />
          </button>
        </div>
        <div class="media__footer">
          <input
            placeholder="tags (separate with space)"
            class="media__tags"
            type="text"
            v-model="media.tagstring"
          />
          <div class="media__actions" v-if="props.action === 'createMedia'">
            <button
              class="button-icon media__cancel"
              type="reset"
              @click="$emit('cancel', props.media)"
            >
              <IconBack />
            </button>
            <button class="button-icon media__submit" type="submit" @click="addMedia(media)">
              <IconCheck />
            </button>
          </div>
          <div class="media__actions" v-if="props.action === 'editMedia'">
            <button
              class="button-icon media__cancel"
              type="reset"
              @click="$emit('cancel', props.media)"
            >
              <IconBack />
            </button>
            <button
              class="button-icon media__cancel"
              type="button"
              @click="deleteMedia(props.media.id!)"
            >
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
  background-color: #fff;
  border-radius: 1rem;

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
    background-color: #efefef;
    color: #323232;
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
    background-color: #efefef;
    border-radius: 100%;
  }
}

.love {
  color: #dc6389;
}

.choices {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & .rating {
    font-family: var(--font-bold);
    font-size: 1rem;
    padding: 0.1rem 1rem;
    height: 2rem;
    border-radius: 1rem;
    color: #999;
    background-color: #efefef;
  }
  & .active {
    background-color: var(--highlight);
    color: #323232;
  }
  & .rating-icon {
    width: 2.2rem;
    height: 2.2rem;
    color: #999;
    border-radius: 100%;
    background-color: #efefef;
  }
  & .iconActive {
    color: #b97749;
    background-color: #dc956366;
  }
}

@media (max-width: 1250px) {
  .choices {
    flex-flow: row wrap;
  }
}
</style>
