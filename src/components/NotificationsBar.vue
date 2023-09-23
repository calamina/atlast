<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import NotificationComponent from './NotificationComponent.vue'

const notifications = useNotificationStore()
</script>

<template>
  <div class="notifications">
    <transition-group name="notifications" tag="div">
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
  align-items: center;
  margin: 0 auto;
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
  left: auto;
  right: auto;
  position: absolute;
}
.notifications-enter-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53);
  position: absolute;
  left: auto;
  right: auto;
}

.notifications-leave-active {
  animation: notification-in 0.2s cubic-bezier(0.81, 0.06, 0.14, 0.53) reverse;
  position: absolute;
  left: auto;
  right: auto;
}
</style>
