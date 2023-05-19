<script setup lang="ts">
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { ref } from 'vue'

let loginRegister = ref(true)

function toggleLoginRegister() {
  loginRegister.value = !loginRegister.value
}
</script>

<template>
  <main>
    <nav>
      <button @click="toggleLoginRegister()" :class="{ active: loginRegister }">Login</button>
      <button @click="toggleLoginRegister()" :class="{ active: !loginRegister }">Register</button>
    </nav>
    <Transition mode="out-in">
      <UserLogin class="userForm" v-if="loginRegister" />
      <UserRegister class="userForm" v-else />
    </Transition>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  margin: 0 auto;
  height: 100vh;
  padding-bottom: 10rem;
}
nav {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  & button {
    padding: 1rem 2rem;
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid #ddd;
    color: #aaa;
  }
  & .active {
    color: #000;
    border-color: #c0a6cd;
  }
}

@keyframes notification-in {
  0% {
    opacity: 0;
    transform: translateY(2rem);
  }
  100% {
    opacity: 1;
  }
}

.v-enter-active {
  animation: notification-in 0.2s ease;
}

.v-leave-active {
  animation: notification-in 0.2s ease reverse;
}
</style>
