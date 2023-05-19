<script setup lang="ts">
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

import IconClose from './icons/iconClose.vue'
import IconAdd from './icons/iconAdd.vue'

const emits = defineEmits(['toggleSearch'])

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
    <!-- <div> -->
    <!-- <router-link to="/">home</router-link> -->
    <!-- <router-link v-if="!user.connectedUser" to="auth">auth</router-link> -->
    <!-- <router-link v-if="user.connectedUser" to="library">library</router-link> -->
    <!-- </div> -->
    <div class="types">
      <div class="type media">
        <router-link class="type__link" to="media">media</router-link>
        <button type="button" class="button-icon" @click="$emit('toggleSearch')">
          <IconAdd />
        </button>
      </div>
      <div class="type links">
        <router-link class="type__link" to="links">links</router-link>
        <button type="button" class="button-icon"><IconAdd /></button>
      </div>
      <div class="type notes">
        <router-link class="type__link" to="notes">notes</router-link>
        <button type="button" class="button-icon"><IconAdd /></button>
      </div>
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

    &.router-link-active {
      opacity: 1;
    }
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
  color: #000;
  background-color: #ddd;

  &__link {
    display: flex;
    justify-content: center;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
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
      transition: transform 0.3s;
    }
    &:hover {
      & svg {
        transform: rotate(90deg);
      }
    }
  }
}

.media {
  & .type__link {
    background-color: #93cfae;
  }
}
.links {
  & .type__link {
    background-color: #dfcfe8;
  }
}
.notes {
  & .type__link {
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
