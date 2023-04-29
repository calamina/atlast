<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>
<template>
  <nav>
    <div>
      <router-link to="/">home</router-link>
      <router-link to="auth">auth</router-link>
    </div>
    <Suspense>
      <div v-if="user.connectedUser">
        <button type="button">{{ user.connectedUser.username }}</button>
        <button type="button" @click="user.logoutUser()">logout</button>
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
</style>
