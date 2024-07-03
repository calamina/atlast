import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Notification } from '@/models/notification.model'
import { v4 as uuidv4 } from 'uuid'
import strings from '@/utils/strings'

export const useNotificationStore = defineStore('notification', () => {
  const notifications: Ref<Notification[]> = ref([])

  async function addErrorNotification(message: string) {
    const notification: Notification = {
      id: uuidv4(),
      type: 'error',
      message,
      long: true,
    }
    notifications?.value.push(notification)
  }

  async function addErrorsNotifications(messages: string[]) {
    messages.forEach(message => {
      addErrorNotification(message)
    })
  }

  async function addNotification(message: string, kao?: string) {
    const notification: Notification = {
      id: uuidv4(),
      type: 'info',
      message: message + (kao ?? null)
    }
    notifications?.value.push(notification)
  }
  
  async function addEmptyNotification() {
    const notification: Notification = {
      id: uuidv4(),
      type: 'info',
      message: 'Please fill out all the fields ' + strings.SAD
    }
    notifications?.value.push(notification)
  }

  async function removeNotification(notification: Notification) {
    notifications.value.splice(notifications.value.indexOf(notification), 1)
  }
  return { notifications, addNotification, removeNotification, addErrorNotification, addErrorsNotifications, addEmptyNotification }
})
