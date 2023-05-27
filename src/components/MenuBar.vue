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
    notification.alert('User disconnected')
    user.connectedUser = null
  })
}
</script>

<template>
  <nav>
    <div class="user">
      <router-link class="button-icon user__disconnect" to="/"><IconCircle /></router-link>
    </div>
    <!-- <div> -->
    <!-- <router-link class="button-icon user__disconnect" to="/"><IconCircle /></router-link> -->
    <!-- <router-link v-if="!user.connectedUser" to="auth">auth</router-link> -->
    <!-- <router-link v-if="user.connectedUser" to="library">library</router-link> -->
    <!-- </div> -->
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
      <!-- <router-link class="type notes" to="notes">
        <p class="type__link">notes</p>
        <button type="button" class="button-icon"><IconAdd /></button>
      </router-link> -->
    </div>
    <div class="user" v-if="user.connectedUser">
      <!-- <button type="button">{{ user.connectedUser.username }}</button> -->
      <button class="user__disconnect button-icon" type="button" @click="logoutUser()">
        <IconClose />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: absolute;
  top: 1rem;
  width: calc(100vw - 1rem);
  padding: 0 1rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  display: flex;
  border-radius: 2rem;
  padding: 0.25rem;
  gap: 1rem;

  &__disconnect {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.55rem;
    border-radius: 100%;
    border-radius: 100%;
  }
}
</style>
