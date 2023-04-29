<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const login: Ref<string> = ref('cala')
const password: Ref<string> = ref('password')
</script>
<template>
  <div>
    <form action="" @submit.prevent>
      <label for="login">login</label>
      <input v-model="login" type="text" name="login" id="login" />

      <label for="password">password</label>
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
