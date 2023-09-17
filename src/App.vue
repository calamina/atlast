<script setup lang="ts">
import { useUserStore } from './stores/user'
import { useNotificationStore } from './stores/notification'
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'

const notification = useNotificationStore()
const user = useUserStore()
</script>

<template>
  <NotificationsBar class="notification" v-if="notification.notifications.length" />

  <Suspense>
    <MenuBar v-if="user.connectedUser" />
  </Suspense>

  <Suspense>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </Suspense>
</template>

<style lang="scss" scoped>
.notification {
  z-index: 666;
}

.overlay {
  z-index: 444;
  position: absolute;
  top: 0;
}
</style>
