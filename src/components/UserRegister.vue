<script setup lang="ts">
import { useUserService } from '@/services/user.service'
import { ref, type Ref } from 'vue'

const { getUsers, registerUser } = useUserService()
getUsers()

const login: Ref<string> = ref('cala')
const password: Ref<string> = ref('gbelliere@gmail.com')
const email: Ref<string> = ref('gbelliere@gmail.com')
</script>
<template>
  <div>
    <h1>Register</h1>
    <form action="" @submit.prevent>
      <input v-model="login" type="text" name="login" id="login" />
      <input v-model="password" type="password" name="pass" id="pass" />
      <input v-model="email" type="text" name="mail" id="mail" />
      <button type="submit" @click="registerUser(login, email, password)">auth</button>
    </form>
  </div>
</template>
<style lang="scss">
div,
form {
  display: flex;
  flex-flow: column;
}
</style>
