import { defineStore } from 'pinia'
import type { notification } from '@/models/notification.model'
import { ref, type Ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications: Ref<notification[]> = ref([])

  async function addNotification(notification: notification) {
    notifications?.value.push(notification)
  }

  async function removeNotification(notification: notification) {
    notifications.value.splice(notifications.value.indexOf(notification), 1)
  }
  return { notifications, addNotification, removeNotification }
})
