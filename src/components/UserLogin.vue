<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserService } from '@/services/user.service'
import formInput from '@/components/form/formInput.vue'

const { loginUser } = useUserService()

const emits = defineEmits(['toggleRegister'])

const login: Ref<string> = ref('cala')
const password: Ref<string> = ref('password')
</script>
<template>
  <form action="" @submit.prevent>
    <formInput v-model="login" :type="'text'" :name="'login'" />
    <formInput v-model="password" :type="'password'" :name="'password'" />

    <button
      v-if="login !== '' && password !== ''"
      @click="loginUser(login, password)"
      class="button--primary"
      type="submit"
    >
      login
    </button>
    <button class="button--secondary" type="button" @click="$emit('toggleRegister')">
      or <span>register</span>
    </button>
    <!-- <button class="button--tertiary" type="submit" @click="$emit('toggleRegister')">
      lost password ?
    </button> -->
  </form>
</template>
<style lang="scss" scoped>
form {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}
</style>
