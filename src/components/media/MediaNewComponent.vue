<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useNotificationStore } from '@/stores/notification'
import { useWikiService } from '@/services/wiki.service'

import IconLikeFull from '@/components/icons/IconLikeFull.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const user = useUserStore()
const mediastore = useMediaStore()
const notification = useNotificationStore()

const wikiservice = useWikiService()

const props = defineProps<{
  media: any
}>()

const emits = defineEmits(['add', 'cancel'])

const actions: string[] = ['planning', 'watching', 'completed', 'dropped', 'paused']
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
      <div class="media__form">
        <div>
          <p class="label">rating</p>
          <div class="ratings">
            <button
              v-for="index in 10"
              type="button"
              class="rating"
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
              v-for="action in actions"
              type="button"
              class="rating"
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
              v-for="category in categories"
              type="button"
              class="rating"
              :key="category"
              @click="mediaNew.categ = category"
              :class="{ active: mediaNew.categ === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div>
          <p class="label">tags (separate with space)</p>
          <input class="media__tags" type="text" v-model="mediaNew.tagstring" />
        </div>
      </div>
      <div class="media__actions">
        <button class="button-icon" type="reset" @click="$emit('cancel')"><IconDelete /></button>
        <button class="button-icon media__submit" type="submit" @click="addMedia(mediaNew)">
          <IconCheck />
        </button>
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
  }

  &__form {
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  &__favorite {
    position: absolute;
    right: 0;
    padding: 0.55rem;
  }

  &__tags {
    padding: 0.5rem 1rem;
    background-color: #ddd;
    border-radius: 1rem;
    width: 100%;
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
    background-color: #ccc;
    border-radius: 100%;
  }
}

.love {
  color: #dc6389;
}

.ratings {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  & .rating {
    font-family: 'contaxBold', Arial, sans-serif;
    // background-color: #ccc;
    font-size: 1rem;
    min-width: 2rem;
    padding: 0.1rem 1rem;
    height: 2rem;
    border-radius: 1rem;
    opacity: 0.5;
  }
  & .active {
    opacity: 1;
    background-color: #dfcfe8;
    opacity: 1;
  }
}

.label {
  font-size: 0.9rem;
  text-transform: capitalize;
  opacity: 0.5;
  font-family: 'contaxBold', Arial, sans-serif;
}
</style>
