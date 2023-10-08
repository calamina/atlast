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
</style>
