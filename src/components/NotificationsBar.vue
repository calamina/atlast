<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import NotificationComponent from './NotificationComponent.vue'

const { notifications } = useNotificationStore()
</script>

<template>
  <transition name="notifications">
    <div class="notifications">
      <transition-group name="notifications">
        <NotificationComponent
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </transition-group>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  z-index: 1000;
  gap: 0.5rem;
}

@media (max-width: 1250px) {
  .notification {
    width: calc(100vw - 2rem);
  }
}
</style>
