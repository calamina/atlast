<script setup lang="ts">
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { ref } from 'vue'

let loginRegister = ref(true)
</script>

<template>
  <main class="auth">
    <Transition mode="out-in" name="auth">
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
</style>
