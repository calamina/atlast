import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Notification } from '@/models/notification.model'
import { v4 as uuidv4 } from 'uuid'

export const useNotificationStore = defineStore('notification', () => {
  const notifications: Ref<Notification[]> = ref([])

  async function addNotification(notification: Notification) {
    notification.id = uuidv4()
    notifications?.value.push(notification)
  }

  async function removeNotification(notification: Notification) {
    notifications.value.splice(notifications.value.indexOf(notification), 1)
  }
  return { notifications, addNotification, removeNotification }
})
