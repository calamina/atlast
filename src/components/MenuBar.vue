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
    <div class="user">
      <button class="button-icon"><IconGlobe /></button>
    </div>
    <div class="types">
      <router-link class="type" to="media"> media </router-link>
      <router-link class="type" to="links"> links </router-link>
    </div>
    <div class="user" v-if="user.connectedUser">
      <button class="button-icon" type="button" @click="logoutUser()">
        <IconUser />
      </button>
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
  background-color: #ddd;
  border-radius: 2rem;
  padding: 0.25rem;
}
</style>
