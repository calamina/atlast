<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserService } from '@/services/user.service'

const { loginUser } = useUserService()

const login: Ref<string> = ref('cala')
const password: Ref<string> = ref('password')
</script>
<template>
  <div>
    <form action="" @submit.prevent>
      <label for="login">username</label>
      <input v-model="login" type="text" name="login" id="login" />

      <label for="password">password</label>
      <input v-model="password" type="password" name="pass" id="pass" />

      <button type="submit" @click="loginUser(login, password)">login</button>
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
