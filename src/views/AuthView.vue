<script setup lang="ts">
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { ref } from 'vue'

let loginRegister = ref(true)
</script>

<template>
  <main class="auth">
    <h1>Atlast</h1>
    <Transition mode="out-in">
      <UserLogin class="userForm" v-if="loginRegister" @toggleRegister="loginRegister = false" />
      <UserRegister class="userForm" v-else @toggleLogin="loginRegister = true" />
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
}

h1 {
  left: auto;
  margin-top: -5rem;
  padding-bottom: 1rem;
  font-family: 'contaxBold', 'Arial', sans-serif;
  font-weight: 300;
  font-size: 5rem;
  font-size: 2rem;
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
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}
.v-leave-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53) reverse;
}
</style>
