<script setup lang="ts">
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

import IconGlobe from '@/components/icons/IconGlobe.vue'
import IconUser from '@/components/icons/IconUser.vue'

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
</script>

<template>
  <nav>
    <div class="menu-icon">
      <button class="button-icon"><IconGlobe /></button>
    </div>
    <div class="types">
      <router-link class="type" to="media"> media </router-link>
      <router-link class="type" to="links"> links </router-link>
    </div>
    <div class="user">
      <div class="menu-icon">
        <button class="button-icon" type="button" @click="logoutUser()">
          <IconUser />
        </button>
      </div>
      <div class="user__menu">
        <p class="user__name">{{ user.connectedUser.username }}</p>
        <button class="user__button">Disconnect</button>
        <button class="user__button">Settings</button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  width: 100vw;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.types {
  display: flex;
  gap: 1rem;
}

.type {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background-color: #ddd;
  transition: filter 0.3s;
  padding: 0.6rem 1rem;
  width: 8rem;
  font-family: 'contaxBold', Arial, sans-serif;
  color: #343434;
  text-decoration: none;
  transition: background-color 0.2s;
}

.router-link-active,
.type:hover {
  background-color: var(--highlight);
  color: #000;
}

.user {
  position: relative;
  &:hover .user__menu {
    display: flex;
  }

  &__menu {
    position: absolute;
    top: 4rem;
    top: 0rem;
    right: 0rem;
    flex-flow: column;
    align-items: start;
    // padding: 2rem;
    border-radius: 2rem;
    overflow: hidden;
    display: none;
    width: 10rem;
    gap: 0.25rem;
  }

  &__name {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    // text-align: start;
    background-color: #ddd;
    font-family: 'contaxBold', Arial, sans-serif;
    border-radius: 2rem;
    padding: 0 2rem;
  }

  &__button {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    // text-align: start;
    background-color: #fff;
    font-family: 'contaxBold', Arial, sans-serif;
    border-radius: 2rem;
    padding: 0 2rem;
  }
}
.menu-icon {
  background-color: #ddd;
  border-radius: 2rem;
  padding: 0.25rem;
  position: relative;
  z-index: 1;
}
</style>
