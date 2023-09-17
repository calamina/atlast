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
    <formInput v-model="login" :type="'text'" :name="'login'" :show-label="true" />
    <formInput v-model="password" :type="'password'" :name="'password'" :show-label="true" />
    <formInput v-model="email" :type="'text'" :name="'mail'" :show-label="true" />
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

.button--primary {
  width: unset;
  font-size: 1.4rem;
  font-family: 'contaxBold', 'Arial', sans-serif;
  border-radius: 1.5rem;
  padding: 0.4rem 1.5rem;
  margin-top: 2rem;
  background-color: #ddd;
}

.button--secondary {
  width: unset;
  font-size: 1.2rem;
  background-color: transparent;

  span {
    font-family: 'contaxBold', 'Arial', sans-serif;
  }
}
</style>
