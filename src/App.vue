<script setup lang="ts">
import { useNotificationStore } from './stores/notification'
import NotificationsBar from '@/components/NotificationsBar.vue'
import MenuBar from '@/components/MenuBar.vue'

const { notifications } = useNotificationStore()
</script>

<template>
  <transition name="notifications">
    <NotificationsBar v-if="notifications.length" />
  </transition>
  <MenuBar />
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
