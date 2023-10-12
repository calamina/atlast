<script setup lang="ts">
import UserLogin from '@/components/UserLogin.vue'
import UserRegister from '@/components/UserRegister.vue'
import { ref } from 'vue'

let loginRegister = ref(true)
</script>

<template>
  <Transition name="auth-in" appear>
    <main class="auth">
      <Transition mode="out-in" name="auth">
        <UserLogin class="userForm" v-if="loginRegister" @toggleRegister="loginRegister = false" />
        <UserRegister class="userForm" v-else @toggleLogin="loginRegister = true" />
      </Transition>
    </main>
  </Transition>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  margin: 0 auto;
  height: calc(100vh - 2rem);
}
</style>
