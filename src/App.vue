<script setup lang="ts">
import { useNotificationStore } from './stores/notification'
import { useUserStore } from './stores/user'
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'

const { notifications } = useNotificationStore()
const { connectedUser } = useUserStore()
</script>

<template>
  <NotificationsBar class="notification" v-if="notifications.length" />

  <MenuBar v-if="connectedUser" />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<style lang="scss" scoped>
.notification {
  z-index: 666;
}
</style>
