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
  top: 4rem;
  width: 90vw;
  padding: 1.2rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;
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
  align-items: center;
  justify-content: center;

  &__disconnect {
    position: absolute;
    right: 2rem;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    outline: none;
  }
}
</style>
