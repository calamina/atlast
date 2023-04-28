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
  height: 30rem;
}
nav {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  & button {
    padding: 1rem 2rem;
    background-color: transparent;
    outline: none;
    border: none;
    color: #ccc;
  }
  & .active {
    color: #000;
    background-color: #ccc;
  }
}

@keyframes notification-in {
  0% {
    opacity: 0;
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
