<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import NotificationComponent from './NotificationComponent.vue'

const notifications = useNotificationStore()
</script>

<template>
  <div class="notifications">
    <transition-group name="notifications">
      <NotificationComponent
        v-for="notification in notifications.notifications"
        :key="notification.message"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1rem;
}

@keyframes notification-in {
  0% {
    transform: translateY(-2rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.notifications-move {
  transition: transform 0.2s;
}
.notifications-enter-active {
  position: absolute;
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
}

.notifications-leave-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53) reverse;
  position: absolute;
}
</style>
