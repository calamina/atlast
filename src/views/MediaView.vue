<script setup lang="ts">
import { computed, watch, watchEffect, type ComputedRef } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMediaStore } from '@/stores/media'
import IconDelete from '@/components/icons/iconDelete.vue'

const mediastore = useMediaStore()

const user = useUserStore()

watchEffect(() => {
  mediastore.getMediaByUser(user.connectedUser.username).then((result) => {
    mediastore.list = result
    mediastore.filteredList = result
  })
})

watch(
  () => mediastore.list,
  () => {
    mediastore.filteredList = mediastore.list
  },
  { deep: true }
)

const filteredMedia: ComputedRef<any[]> = computed(() => {
  let list: any[] = mediastore.filteredList
  list = list.map((media) => {
    const id = media.id
    media = media.attributes
    media.id = id
    return media
  })
  return list
})
</script>

<template>
  <main>
    <div class="links" v-if="mediastore.filteredList.length !== 0">
      <TransitionGroup name="list">
        <div class="TEST" v-for="media of filteredMedia" :key="media.id">
          <div class="link-wrapper">
            <div class="link__image" :style="`background-image: url(${media.thumbnail})`"></div>
            <div class="link__content">
              <a class="link__link" :href="media.url" target="_blank">
                <p class="link__title">{{ media.title }}</p>
                <p class="link__description">{{ media.description }}</p>
              </a>
              <!-- <p>{{ media.extract }}</p> -->
              <!-- <p>{{ media.categ }}</p> -->
              <!-- <p>{{ media.action }}</p> -->
              <!-- <p>{{ media.score }}</p> -->
            </div>
            <button class="button-icon" type="button" @click="mediastore.deleteUserMedia(media.id)">
              <IconDelete />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h3 {
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 0.15rem;
}

main {
  width: calc(100vw - 2rem);
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.links {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  flex: 1;
  align-items: center;
}

.link-wrapper {
  position: relative;
  display: flex;
  flex: 1;
  gap: 0.5rem;
  gap: 1rem;
  align-items: center;
  transition: height 0.3s;
  padding: 0.25rem 0.5rem;
  padding-bottom: 0.5rem;
}

.TEST {
  width: 100%;
}

.link {
  display: flex;
  flex-flow: column;
  padding: 0rem;

  &__header,
  &__footer,
  &__description {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    flex: 1;
  }

  &__footer {
    margin-top: 0.1rem;
    justify-content: flex-start;
    gap: 0.25rem;
  }

  &__link {
    display: flex;
    line-height: 1.4rem;
    flex-flow: column;
    text-decoration: none;
    color: black;
    flex: 1;
    gap: 0.1rem;
    max-width: 80%;
  }

  &__title {
    font-size: 1.25rem;
    text-transform: capitalize;
  }

  &__url {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-style: oblique;
    color: #999;
  }

  &__tags {
    padding: 0.05rem 0.5rem;
    background-color: #ddd;
    border-radius: 1rem;
    width: fit-content;
    font-size: 0.85rem;
    opacity: 0.5;
    transition: opacity 0.3s;

    &::before {
      content: '#';
    }

    &:hover {
      opacity: 1;
    }
  }

  &__description {
    font-size: 0.85rem;
    color: #999;
    width: fit-content;
  }
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
.list-leave-active {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
</style>
