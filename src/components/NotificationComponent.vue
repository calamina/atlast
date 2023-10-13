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
  }, 3500)
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
  width: fit-content;
  min-width: 15rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  height: 3rem;
  background-color: #ddd;
  background-color: var(--highlight);

  &__message {
    font-family: var(--font-bold);
  }
}

@media (max-width: 1250px) {
  .notification {
    width: 100%;
  }
}
</style>
