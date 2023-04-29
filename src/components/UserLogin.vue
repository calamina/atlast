<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const login: Ref<string> = ref('Kapman')
const password: Ref<string> = ref('Password')
</script>
<template>
  <div>
    <!-- VIF USER then LOGOUT or hide -->
    <h1>Login</h1>
    <form action="" @submit.prevent>
      <input v-model="login" type="text" name="login" id="login" />
      <input v-model="password" type="password" name="pass" id="pass" />
      <button type="submit" @click="user.loginUser(login, password)">auth</button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
div,
form {
  display: flex;
  flex-flow: column;
}
</style>
