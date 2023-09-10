<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserService } from '@/services/user.service'
import formInput from '@/components/form/formInput.vue'

const { registerUser } = useUserService()

const emits = defineEmits(['toggleLogin'])

const login: Ref<string> = ref('')
const password: Ref<string> = ref('')
const email: Ref<string> = ref('')
</script>
<template>
  <form action="" @submit.prevent>
    <formInput v-model="login" :type="'text'" :name="'login'" />
    <formInput v-model="password" :type="'password'" :name="'password'" />
    <formInput v-model="email" :type="'text'" :name="'mail'" />
    <button class="button--primary" type="submit" @click="registerUser(login, email, password)">
      register
    </button>
    <button class="button--secondary" type="submit" @click="$emit('toggleLogin')">
      or <span>login</span>
    </button>
  </form>
</template>
<style lang="scss" scoped>
form {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}
</style>
