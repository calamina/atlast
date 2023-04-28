import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('users', () => {
  const connectedUser = ref('')
  const connectedUserToken = ref('')

  return { connectedUser, connectedUserToken }
})
