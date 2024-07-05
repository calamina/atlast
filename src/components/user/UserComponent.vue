<script setup lang="ts">
import { useThrottleFn, useDateFormat } from '@vueuse/core'

import type { UserModel } from '@/models/user.model'

import IconPlus from '@/components/icons/IconPlus.vue'
import IconLikeFull from '@/components/icons/IconLikeFull.vue'

import ItemTitle from '@/components/atomic/ItemTitle.vue'
import ItemDescription from '@/components/atomic/ItemDescription.vue'
import ItemPicture from '@/components/atomic/ItemPicture.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['enableEdit'])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{ user: UserModel }>()

const toggleEdit = useThrottleFn(() => {
  emits('enableEdit')
}, 500)
</script>

<template>
  <div
    class="media"
    v-if="user.id"
    :to="{ name: 'media', params: { username: user.username } }"
  >
    <!-- <ItemPicture :src="user.thumbnail ?? null" :small="false" /> -->
    <div class="media__content">
      <ItemTitle :title="user.username ?? null">
        <!-- <IconLikeFull class="media__favorite" v-if="user.like" /> -->
      </ItemTitle>
      <ItemDescription :description="'heyo :)' ?? null" />
      <!-- <div class="media__footer">
        <p class="media__categ">
          {{ useDateFormat(user.createdAt, 'DD/MM/YY') }}
        </p>
      </div> -->
    </div>
    <div class="media__actions">
      <button class="button-icon media__action" type="button" @click="toggleEdit">
        <IconPlus />
      </button>
    </div>
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
  width: 100%;
  padding: 1rem;
  background-color: var(--background);
  border-radius: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--white);
    .media__actions,
    .media__expand {
      display: flex;
    }
  }

  &__content {
    display: flex;
    flex-flow: column;
    flex: 1;
    gap: 0.3rem;
    overflow: hidden;
  }

  &__favorite {
    width: 1.1rem;
    height: 1.1rem;
    color: var(--favorite);
  }

  &__extract {
    max-height: 30rem;
    padding-bottom: 0.5rem;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__status {
    height: 1.75rem;
    padding: 0.25rem;
    border-radius: 1rem;
  }

  &__categ {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.75rem;
    font-size: 0.9rem;
    padding: 0.25rem 1rem;
    width: 6rem;
    font-family: var(--font-bold);
    background-color: var(--background-darker);
    border-radius: 1rem;
    cursor: default;
  }

  &__actions {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 600;
    display: none;
    padding: 0;
    gap: 0.25rem;
    border-radius: 100%;
  }

  &__action {
    background-color: var(--background);
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.55rem;
    border-radius: 100%;
  }

  &__score {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 0.25rem;
    height: 1.75rem;
    font-size: 0.9rem;
    font-family: var(--font-bold);
    background-color: var(--background-darker);
    border-radius: 1rem;
    padding: 0 0.5rem;
  }

  &__score-text {
    font-size: 0.9rem;
    line-height: 1.25rem;
    font-family: var(--font-bold);
  }

  &__score-icon {
    padding: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    color: var(--score);
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

// @keyframes enter {
//   0% {
//     transform: scale(0.8);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
@media (max-width: 1250px) {
  .media__extract {
    max-height: 50rem;
  }
  .media__actions {
    left: 2.5rem;
    top: 2.5rem;
    border-radius: 0.5rem;
    z-index: 30;
    display: flex;
  }
}
</style>
