<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import FormInput from '@/components/atomic/FormInput.vue'
import FormGroup from '@/components/atomic/FormGroup.vue'
import FormSubmit from '@/components/atomic/FormSubmit.vue'
import FormSubmitAlt from '@/components/atomic/FormSubmitAlt.vue'

const { login } = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['toggleRegister'])

const form: Ref<{ username: string; password: string }> = ref({
  username: 'cala',
  password: 'password'
})
</script>
<template>
  <FormGroup>
    <FormInput v-model="form.username" :type="'text'" :name="'login'" />
    <FormInput v-model="form.password" :type="'password'" :name="'password'" />
    <FormSubmit :name="'login'" :type="'submit'" @click="login(form)" />
    <FormSubmitAlt :name="'register'" :type="'button'" @click="$emit('toggleRegister')" />
  </FormGroup>
</template>
