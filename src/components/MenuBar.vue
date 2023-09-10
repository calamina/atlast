<script setup lang="ts">
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

import IconClose from './icons/IconClose.vue'
import IconAdd from './icons/IconAdd.vue'
import IconCircle from './icons/IconCircle.vue'

const emits = defineEmits(['toggleSearch', 'openLinks', 'openMedia'])

const user = useUserStore()
const notification = useNotificationStore()

async function logoutUser() {
  router.push('/auth').then(() => {
    localStorage.removeItem('user')
    notification.addNotification({
      type: 'alert',
      message: 'Goodbye ' + user.connectedUser.username + ' !'
    })
    user.connectedUser = null
  })
}

function testNotification() {
  notification.addNotification({
    type: 'alert',
    message: 'This is a test notification'
  })
}
</script>

<template>
  <nav>
    <div class="user">
      <router-link class="button-icon user__disconnect" to="/" @click="testNotification()"
        ><IconCircle
      /></router-link>
    </div>
    <div class="types">
      <router-link class="type media" to="media">
        <p class="type__link">media</p>
        <button
          type="button"
          class="button-icon"
          @click="$event.preventDefault, $emit('openMedia')"
        >
          <IconAdd />
        </button>
      </router-link>
      <!-- <router-link class="type media" to="library">
        <p class="type__link">HERE !!!</p>
        <button
          type="button"
          class="button-icon"
          @click="$event.preventDefault, $emit('openLibrary')"
        >
          <IconAdd />
        </button>
      </router-link> -->
      <router-link class="type links" to="links">
        <p class="type__link">links</p>
        <button
          type="button"
          class="button-icon"
          @click="$event.preventDefault, $emit('openLinks')"
        >
          <IconAdd />
        </button>
      </router-link>
    </div>
    <div class="user" v-if="user.connectedUser">
      <button type="button">{{ user.connectedUser.username }}</button>
      <button class="user__disconnect button-icon" type="button" @click="logoutUser()">
        <IconClose />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  // position: absolute;
  // margin: 0.5rem auto 0.5rem auto;
  // width: calc(100vw - 1.5rem);
  width: 100%;
  padding: 1rem;
  border-radius: 5rem;
  // height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background-color: #93cfae;
  // background-color: #ccc;

  & > div {
    display: flex;
    flex-flow: row;
    gap: 1rem;
  }

  & a {
    color: #000;
    text-decoration: none;
    transition: color 0.3s;
  }
}

.types {
  display: flex;
  gap: 2rem;
}

.type {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background-color: #ddd;
  filter: saturate(0);
  transition: filter 0.3s;

  &__link {
    display: flex;
    justify-content: center;
    border-radius: 2rem;
    padding: 0.6rem 1rem;
    width: 8rem;
    transition: width 0.3s;
  }

  button {
    width: 3rem;
    height: 2.25rem;
    border-radius: 100%;
    transition: width 0.3s;

    svg {
      width: 1.2rem;
      height: 1.2rem;
      transition: transform 0.2s;
    }
    &:hover {
      & svg {
        transform: rotate(90deg);
      }
    }
  }

  &:not(.router-link-active) .button-icon {
    display: none;
  }

  &.router-link-active,
  &:hover {
    filter: saturate(1);
  }
}

.media {
  & .type__link {
    background-color: #93cfae;
  }
  & .router-link-active {
    background-color: #93cfae;
  }
}
.links {
  & .type__link {
    background-color: #dfcfe8;
  }
  & .router-link-active {
    background-color: #dfcfe8;
  }
}
.notes {
  & .type__link {
    background-color: #da98ad;
  }
  & .router-link-active {
    background-color: #da98ad;
  }
}

.user {
  background-color: #ddd;
  // border: 1px solid #000;
  display: flex;
  border-radius: 2rem;
  padding: 0.25rem;
  padding-left: 1rem;
  gap: 0.5rem;

  &__disconnect {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.55rem;
    border-radius: 100%;
    border-radius: 100%;
  }
}
</style>
