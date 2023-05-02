<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const user = useUserStore()
const notification = useNotificationStore()

onMounted(() => {
  if (user.connectedUser.value) {
    notification.alert(`Welcome back ${user.connectedUser.value.username} :)`)
  }
})
</script>
<template>
  <div>hey {{ user.connectedUser.username }} :)</div>
</template>
<style lang="scss" scoped></style>
