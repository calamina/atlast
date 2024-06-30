<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

import IconGlobe from '@/components/icons/IconGlobe.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconUserOff from '@/components/icons/IconUserOff.vue'

const { logout } = useUserStore()
const { connectedUser } = storeToRefs(useUserStore())
</script>

<template>
  <nav>
    <div class="submenu" v-if="connectedUser">
      <!-- <p class="user__name">{{ connectedUser?.username }}'s library</p> -->
      <div class="types">
        <router-link class="type" :to="{ name: 'media', params: { username: connectedUser.username } }">
          <div class="button-icon"><IconGlobe /></div>
          <span>media</span>
        </router-link>
        <!-- <router-link        class="type user__info"        :to="{ name: 'user', params: { username: connectedUser.username } }">
          <div class="menu-icon">
            <div class="button-icon"><IconUser /></div>
          </div>
          user
        </router-link> -->
        <!-- <router-link
          class="type"
          :to="{ name: 'media', params: { username: connectedUser.username } }"
        >
          media
        </router-link> -->
        <!-- <router-link class="type" :to="{ name: 'media', params: { username: 'test' } }">
          test's library
        </router-link> -->
        <!-- <router-link class="type" to="/links"> links </router-link> -->
      </div>
    </div>
    <div id="menu-search"></div>
    <div class="user" v-if="connectedUser">
      <div class="menu-icon">
        <p>{{ connectedUser.username }}</p>
        <div class="button-icon"><IconUser /></div>
      </div>
      <div class="user__actions">
        <button class="button-icon" type="button" @click="logout()">
          <IconUserOff />
        </button>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  width: 100vw;
  margin: 0 auto;
  padding: 1rem 0 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr 1fr 1fr;
}

.submenu {
  display: flex;
  gap: 1rem;
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
  height: 3rem;
  background-color: #ddd;
  transition: filter 0.3s;
  transition: background-color 0.2s;
  text-decoration: none;
  
  span {
    padding-right: 1rem;
    padding-bottom: 0.15rem;
    font-family: var(--font-bold);
    color: #343434;
  }
}

.router-link-active,
.type:hover {
  background-color: var(--highlight);
  color: #000;
}

.user {
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 1rem;
  transform: translateX(3.5rem);
  transition: transform 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: translateY(0);
  }

  &__info,
  &__actions {
    display: flex;
    align-items: center;
  }

  &__info {
    display: flex;
    background-color: #ddd;
    border-radius: 2rem;
    padding: 0 1.5rem 0 0.25rem;
  }

  &__actions {
    padding-right: 1rem;
    gap: 1rem;
    .button-icon {
      background-color: #fff;
      border-radius: 2rem;
    }
  }

  &__menu {
    display: flex;
    align-items: start;
    border-radius: 2rem;
    gap: 0.25rem;
  }

  &__name {
    font-family: var(--font-bold);
  }

  &__button {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    font-family: var(--font-bold);
    border-radius: 2rem;
    padding: 0 2rem;
  }
}

#menu-search {
  display: flex;
  width: 100%;
  justify-content: center;
}

.menu-icon {
  background-color: #ddd;
  border-radius: 2rem;
  padding: 0.25rem;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 1;

  p {
    padding-left: 1rem;
    padding-bottom: 0.25rem;
    font-family: var(--font-bold);
  }
}

@media (max-width: 1250px) {
  nav {
    padding: 1rem 1rem 0;
    grid-template-columns: 3rem 1fr 3rem;
  }

  // .submenu,
  .types,
  .user__info {
    display: none;
  }

  .user {
    transform: translateX(0);
  }
  .user__actions {
    height: 3rem;
    width: 3rem;
    background-color: #fff;
    justify-content: center;
    padding-right: 0;
    border-radius: 2rem;
  }

  #menu-search {
    width: 100%;
    justify-content: center;
  }
}
</style>
