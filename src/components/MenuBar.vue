<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

import IconClose from './icons/iconClose.vue'

const user = useUserStore()
const notification = useNotificationStore()

async function logoutUser() {
  router.push('auth').then(() => {
    localStorage.removeItem('user')
    notification.alert('User disconnected')
    user.connectedUser = null
  })
}
</script>

<template>
  <nav>
    <div>
      <router-link to="/">home</router-link>
      <router-link v-if="!user.connectedUser" to="auth">auth</router-link>
      <router-link v-if="user.connectedUser" to="library">library</router-link>
    </div>
    <div>
      <router-link to="/library">links</router-link>
      <router-link to="/404">media</router-link>
      <router-link to="/">notes</router-link>
    </div>
    <div class="user" v-if="user.connectedUser">
      <button type="button">{{ user.connectedUser.username }}</button>
      <button class="user__disconnect" type="button" @click="logoutUser()">
        <IconClose />
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: absolute;
  top: 1rem;
  width: calc(100vw - 2rem);
  padding: 0.5rem 2rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ddd;

  & div {
    display: flex;
    flex-flow: row;
    gap: 2rem;
  }

  & a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.3s;

    &.router-link-active {
      color: black;
    }
  }
}

.user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  &__disconnect {
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>
