<script setup lang="ts">
// import { useUserService } from '@/services/user.service'
import { useUserStore } from '@/stores/user'
import IconClose from './icons/IconClose.vue'

// const userService = useUserService()
const user = useUserStore()
</script>

<template>
  <nav>
    <div>
      <router-link to="/">home</router-link>
      <router-link v-if="!user.connectedUser" to="auth">auth</router-link>
      <router-link v-if="user.connectedUser" to="library">library</router-link>
    </div>
    <Suspense>
      <div class="user" v-if="user.connectedUser">
        <button type="button">{{ user.connectedUser.username }}</button>
        to fix :((((
        <!-- <button class="user__disconnect" type="button" @click="userService.logoutUser()">
          <IconClose />
        </button> -->
      </div>
    </Suspense>
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
