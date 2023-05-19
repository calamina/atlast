<script setup lang="ts">
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import { useNotificationStore } from '@/stores/notification'

import IconEdit from '@/components/icons/iconEdit.vue'
import IconDelete from '@/components/icons/iconDelete.vue'
import router from '@/router/index'

const user = useUserStore()
const mediastore = useMediaStore()
const notification = useNotificationStore()

const props = defineProps<{
  media: any
}>()

const emits = defineEmits(['add', 'cancel'])

function addMedia(media: any) {
  media.tags = media.tagstring ? media.tagstring.split(' ') : null
  media.user = user.connectedUser.username
  mediastore
    .addUserMedia(media)
    .then(() => {
      emits('add')
      router.push('/media')
    })
    .catch((error) => {
      notification.error(error)
    })
}

let mediaNew: any = ref({
  id: props.media.id,
  title: props.media.title,
  url: `http://wikipedia.org/wiki/${props.media.title}`,
  description: props.media.description,
  tagstring: props.media.tags?.join(' '),
  category: props.media.category ?? 'etc',
  extract: props.media.excerpt
})
</script>
<template>
  <div class="link-wrapper">
    <div class="link link-edit">
      <div class="link__header">
        <div class="link__link">
          <p>title<span>*</span></p>
          <input type="text" v-model="mediaNew.title" />
          <p>url<span>*</span></p>
          <input type="text" v-model="mediaNew.url" />
        </div>
      </div>
      <div class="link__description">
        <p>description</p>
        <input type="text" v-model="mediaNew.description" name="description" />
      </div>
      <div class="link__description">
        <p>extract</p>
        <!-- <textarea ref="textarea" v-model="mediaNew.description" name="description" /> -->
        <input type="text" v-model="mediaNew.extract" name="description" />
      </div>
      <div class="link__footer">
        <p>tags (separate with space)</p>
        <input type="text" v-model="mediaNew.tagstring" />
      </div>
    </div>
    <div class="actions">
      <button type="button" class="button-icon" @click="addMedia(mediaNew)">
        <IconEdit />
      </button>
      <button type="button" class="button-icon" @click="$emit('cancel')">
        <IconDelete />
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.link {
  // width: 50vw;
  width: 100%;
  display: flex;
  flex-flow: column;
  border-radius: 2rem;
  border: 1.5px solid #ddd;
  padding: 0.5rem 1rem 1rem;

  &__header,
  &__footer,
  &__description {
    display: flex;
    padding: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    align-items: flex-start;
  }

  &__description {
    padding: 0 0.5rem;
  }

  &__footer {
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 0.5rem 0.25rem;
  }

  &__link {
    display: flex;
    flex-flow: column;
    text-decoration: none;
    color: black;
    flex: 1;
  }

  &__title {
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  &__url {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-style: oblique;
    color: #999;
  }

  &__description {
    padding-bottom: 1rem;
  }

  & textarea {
    resize: none;
    overflow: hidden;
  }

  &__tags {
    padding: 0.3rem 0.75rem;
    background-color: #c0a6cd;
    background-color: #ddd;
    border-radius: 1rem;
    width: fit-content;
    font-size: 0.85rem;
  }

  &__date {
    font-size: 0.85rem;
    color: #999;
    padding-top: 0.3rem;
    width: fit-content;
  }
}
.link {
  background-color: #fff;
  flex: 1;
}

.categ,
.actions {
  background-color: #eee;
  display: flex;
  flex-flow: column;
  height: fit-content;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;
  border-radius: 2rem;
}

p {
  font-size: 0.9rem;
  padding-left: 0.1rem;
  // text-transform: capitalize;
  font-variant: small-caps;
  color: #00000088;

  span {
    padding-left: 0.25rem;
    color: #c0a6cd;
    // font-size: 1rem;
  }
}

.categ {
  padding: 0.25rem;

  & button {
    border-radius: 100%;
  }
}

.categ .actions button {
  border-radius: 2rem;
}

.active {
  background-color: #c0a6cd;
}

.link__description,
.link__footer {
  flex-flow: column;
  align-items: flex-start;
  padding-bottom: 0;
  gap: 0;
}

.link__header {
  padding-bottom: 0;
}
</style>
