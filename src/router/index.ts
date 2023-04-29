import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/auth']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useUserStore()
  if (authRequired && !authStore.connectedUser) {
    const notification = useNotificationStore()
    notification.error('Login to see this page')
    return '/auth'
  }
})

export default router
