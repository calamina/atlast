<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserModel } from '@/models/user.model'
import FormInput from '@/components/atomic/FormInput.vue'
import FormGroup from '@/components/atomic/FormGroup.vue'
import FormSubmit from '@/components/atomic/FormSubmit.vue'
import FormSubmitAlt from '@/components/atomic/FormSubmitAlt.vue'
import { useNotificationStore } from '@/stores/notification'

const { register } = useUserStore()
const { addEmptyNotification } = useNotificationStore()

const emits = defineEmits(['toggleLogin'])

const form: Ref<UserModel> = ref({
  username: '',
  password: '',
  email: ''
})

function submit(form: UserModel) {
  form.username && form.password && form.email ? register(form) : addEmptyNotification()
} 
</script>
<template>
  <FormGroup>
    <FormInput v-model="form.username" :type="'text'" :name="'username'" :required="true" />
    <FormInput v-model="form.password" :type="'password'" :name="'password'" :required="true" />
    <FormInput v-model="form.email" :type="'text'" :name="'mail'" :required="true" />
    <FormSubmit :name="'register'" :type="'submit'" @click="submit(form)" />
    <FormSubmitAlt :name="'login'" :type="'button'" @click="$emit('toggleLogin')" />
  </FormGroup>
</template>
