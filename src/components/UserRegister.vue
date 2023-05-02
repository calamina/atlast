<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserService } from '@/services/user.service'

const { registerUser } = useUserService()

const login: Ref<string> = ref('')
const password: Ref<string> = ref('')
const email: Ref<string> = ref('')
</script>
<template>
  <div>
    <form action="" @submit.prevent>
      <label for="login">login</label>
      <input v-model="login" type="text" name="login" id="login" />

      <label for="password">password</label>
      <input v-model="password" type="password" name="pass" id="pass" />

      <label for="email">email</label>
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
