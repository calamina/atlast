<script setup lang="ts">
import router from '@/router/index'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

// import IconClose from '@/components/icons/IconClose.vue'
// import IconCircle from '@/components/icons/IconCircle.vue'

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
      <!-- <button class="button-icon user__disconnect"><IconCircle /></button> -->
    </div>
    <div class="types">
      <router-link class="type media" to="media">
        <p class="type__link">media</p>
      </router-link>
      <router-link class="type links" to="links">
        <p class="type__link">links</p>
      </router-link>
    </div>
    <div class="user" v-if="user.connectedUser">
      <button class="user__disconnect button-icon" type="button" @click="logoutUser()">
        <!-- <IconClose /> -->
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  width: 100%;
  padding: 1rem;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // opacity: 0.5;
  transition: opacity 0.3s cubic-bezier(0.81, 0.06, 0.14, 0.53);

  &:hover {
    opacity: 1;
  }

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
    font-family: 'contaxBold', Arial, sans-serif;
  }

  &:not(.router-link-active) .button-icon {
    display: none;
  }

  &.router-link-active,
  &:hover {
    filter: saturate(1);
  }
}

.type__link {
  background-color: #dfcfe8;
}
.router-link-active {
  background-color: #dfcfe8;
}
.user {
  background-color: #ddd;
  display: flex;
  border-radius: 2rem;
  padding: 0.25rem;
  gap: 0.5rem;
  font-family: 'contaxBold', Arial, sans-serif;

  &__disconnect {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.55rem;
    border-radius: 100%;
  }
}
</style>
