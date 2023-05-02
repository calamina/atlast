import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useUserStore = defineStore('users', () => {
  const storedUser: string | null = localStorage.getItem('user')
  const connectedUser: Ref<any> = ref(
    typeof storedUser === 'string' ? JSON.parse(storedUser) : null
  )
  // const connectedUserToken = ref('')

  return {
    connectedUser
  }
})
