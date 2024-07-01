<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserModel } from '@/models/user.model'
import FormInput from '@/components/atomic/FormInput.vue'
import FormGroup from '@/components/atomic/FormGroup.vue'
import FormSubmit from '@/components/atomic/FormSubmit.vue'
import FormSubmitAlt from '@/components/atomic/FormSubmitAlt.vue'

const { register } = useUserStore()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['toggleLogin'])

const form: Ref<UserModel> = ref({
  username: '',
  password: '',
  email: ''
})
</script>
<template>
  <FormGroup>
    <FormInput v-model="form.username" :type="'text'" :name="'username'" />
    <FormInput v-model="form.password" :type="'password'" :name="'password'" />
    <FormInput v-model="form.email" :type="'text'" :name="'mail'" />
    <FormSubmit :name="'register'" :type="'submit'" @click="register(form)" />
    <FormSubmitAlt :name="'login'" :type="'button'" @click="$emit('toggleLogin')" />
  </FormGroup>
</template>
