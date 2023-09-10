<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useNotificationStore } from '@/stores/notification'

import { useWikiService } from '@/services/wiki.service'
import IconLikeFull from '../icons/IconLikeFull.vue'
import IconLike from '../icons/IconLike.vue'
import router from '@/router/index'

const user = useUserStore()
const mediastore = useMediaStore()
const notification = useNotificationStore()

const wikiservice = useWikiService()

const props = defineProps<{
  media: any
}>()

const emits = defineEmits(['add', 'cancel'])

const actions: string[] = ['planning', 'watching', 'completed', 'rewatching', 'dropped', 'paused']
const categories: string[] = ['movie', 'series', 'game', 'book', 'comic']

let mediaNew: Ref<any> = ref(null)

onMounted(() => {
  wikiservice.getWikiByLink(props.media.key).then((data) => {
    mediaNew.value = {
      id: data.id,
      title: data.title,
      url: data.content_urls?.desktop?.page,
      description: data.description,
      tagstring: props.media.tags?.join(' '),
      extract: data.extract,
      image: data.originalimage?.source,
      thumbnail: data.thumbnail?.source,
      score: 1,
      action: 'completed',
      categ: 'movie'
    }
  })
})

function addMedia(media: any) {
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  media.user = user.connectedUser.username
  mediastore
    .addUserMedia(media)
    .then(() => {
      emits('add')
    })
    .catch((error) => {
      notification.addNotification({ message: error, type: 'error' })
    })
}
</script>
<template>
  <div class="media" v-if="mediaNew">
    <img class="media__image" v-if="mediaNew.image" :src="mediaNew.image" />
    <div class="media__content">
      <div class="media__info">
        <a class="media__link" :href="mediaNew.url" target="_blank">
          {{ mediaNew.title }}
        </a>
        <p class="media__description">{{ mediaNew.description }}</p>
        <p>{{ mediaNew.extract }}</p>
      </div>
      <button
        class="media__favorite button-icon"
        type="button"
        @click="mediaNew.like = !mediaNew.like"
      >
        <IconLikeFull class="love" v-if="mediaNew.like === true" />
        <IconLike v-else />
      </button>
      <div>
        <p class="label">rating</p>
        <div class="ratings">
          <button
            type="button"
            class="rating"
            v-for="index in 10"
            :key="index"
            @click="mediaNew.score = index"
            :class="{ active: mediaNew.score === index }"
          >
            {{ index }}
          </button>
        </div>
      </div>
      <div>
        <p class="label">action</p>
        <div class="ratings">
          <button
            type="button"
            v-for="action in actions"
            :key="action"
            @click="mediaNew.action = action"
            :class="{ active: mediaNew.action === action }"
          >
            {{ action }}
          </button>
        </div>
      </div>
      <div>
        <p class="label">category</p>
        <div class="ratings">
          <button
            type="button"
            v-for="category in categories"
            :key="category"
            @click="mediaNew.categ = category"
            :class="{ active: mediaNew.categ === category }"
          >
            {{ category }}
          </button>
        </div>
        <div>
          <p class="label">tags (separate with space)</p>
          <input type="text" v-model="mediaNew.tagstring" />
        </div>
      </div>
      <div class="media__actions">
        <button class="media__submit" type="submit" @click="addMedia(mediaNew)">Add</button>
        <button class="media__reset" type="reset" @click="$emit('cancel')">Cancel</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.media {
  position: relative;
  display: flex;
  flex-flow: row;
  gap: 1rem;

  &__content {
    display: flex;
    flex-flow: column;
    padding-bottom: 1rem;
  }

  &__image {
    height: 10rem;
    width: 10rem;
    object-fit: contain;
    object-position: right;
  }

  &__info {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    padding-bottom: 1rem;
  }

  &__link {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    width: fit-content;
    font-size: 1.5rem;
    line-height: 1.4rem;
    font-family: 'contaxBold', Arial, sans-serif;
    text-transform: capitalize;
    text-decoration: none;
    color: black;
  }

  &__description {
    font-family: 'contaxItalic', Arial, sans-serif;
    opacity: 0.7;
    padding-bottom: 0.5rem;
  }

  &__favorite {
    position: absolute;
    right: 0;
    padding: 0.55rem;
  }

  &__tags {
    padding: 0.3rem 0.75rem;
    background-color: #ddd;
    border-radius: 1rem;
    width: fit-content;
    font-size: 0.85rem;
  }

  &__actions {
    display: flex;
    flex-flow: row;
    justify-content: end;
    gap: 0.5rem;
    padding: 0.5rem 0.25rem;
  }

  &__submit {
    font-size: 1.2rem;
    color: #000;
    border: 1px solid #000;
    border-radius: 1.5rem;
    padding: 0.4rem 1.5rem;
    overflow: hidden;
  }

  &__reset {
    text-decoration: underline;
    font-size: 1rem;
    color: #000;
  }
}

.love {
  color: #dc6389;
}

.ratings {
  display: flex;
  align-items: center;
  gap: 1rem;

  & .rating {
    font-family: 'contaxBold', Arial, sans-serif;
    width: 2rem;
    height: 2rem;
    opacity: 0.5;
  }
  & .active {
    border: 1px solid #000;
    opacity: 1;
  }
}

.label {
  font-size: 0.9rem;
  padding-left: 0.1rem;
  font-variant: small-caps;
  color: #00000088;
}
</style>
