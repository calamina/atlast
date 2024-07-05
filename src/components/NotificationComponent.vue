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
  }, props.notification.long ? 5000 : 2500)
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
  background-color: var(--background-darker);
  background-color: var(--highlight);

  &__message {
    font-family: var(--font-bold);
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}

.error {
  background-color: var(--background-darker) !important;
}

// .error {
//   background-color: #e8cfcf !important;
// }

@media (max-width: 1250px) {
  .notification {
    width: 100%;
  }
}
</style>
