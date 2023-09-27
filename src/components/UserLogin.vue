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
    <formInput v-model="login" :type="'text'" :name="'login'" :show-label="true" />
    <formInput v-model="password" :type="'password'" :name="'password'" :show-label="true" />

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
  font-size: 1.2rem;
  font-family: 'contaxBold', 'Arial', sans-serif;
  border-radius: 2rem;
  padding: 0.4rem 1.5rem;
  margin-top: 1rem;
  color: #000;
  text-transform: capitalize;
  background-color: var(--highlight);
}

.button--secondary {
  width: unset;
  font-size: 1rem;
  background-color: transparent;

  span {
    font-family: 'contaxBold', 'Arial', sans-serif;
  }
}
</style>
