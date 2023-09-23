<script setup lang="ts">
import type { Notification } from '@/models/notification.model'
import { useNotificationStore } from '@/stores/notification'
import { onMounted } from 'vue'

const notifications = useNotificationStore()
const props = defineProps<{
  notification: Notification
}>()

onMounted(() => {
  setTimeout(() => {
    notifications.removeNotification(props.notification)
  }, 2500)
})
</script>

<template>
  <div
    :class="notification.type"
    class="notification"
    @click="notifications.removeNotification(notification)"
  >
    <p class="notification__message">
      {{ notification.message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  width: 20rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border: 1px solid #000;
  background-color: #000;

  p {
    color: #fff;
  }
}
// .error {
//   background-color: rgb(219, 157, 157);
// }
// .alert {
//   background-color: #c0a6cd;
// }
</style>
