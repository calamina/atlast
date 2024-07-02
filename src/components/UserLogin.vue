<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { UserModel } from '@/models/user.model'
import FormInput from '@/components/atomic/FormInput.vue'
import FormGroup from '@/components/atomic/FormGroup.vue'
import FormSubmit from '@/components/atomic/FormSubmit.vue'
import FormSubmitAlt from '@/components/atomic/FormSubmitAlt.vue'
import { useNotificationStore } from '@/stores/notification'

const { login } = useUserStore()
const { addEmptyNotification } = useNotificationStore()

const emits = defineEmits(['toggleRegister'])

const form: Ref<UserModel> = ref({
  username: '',
  password: '',
})

function submit(form: UserModel) {
  form.username && form.password ? login(form) : addEmptyNotification()
}
</script>
<template>
  <FormGroup>
    <FormInput v-model="form.username" :type="'text'" :name="'login'" :required="true" />
    <FormInput v-model="form.password" :type="'password'" :name="'password'" :required="true" />
    <FormSubmit :name="'login'" :type="'submit'" @click="submit(form)" />
    <FormSubmitAlt :name="'register'" :type="'button'" @click="$emit('toggleRegister')" />
  </FormGroup>
</template>
