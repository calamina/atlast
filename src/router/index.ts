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
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Backrooms',
      component: () => import('../views/BackroomsView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/auth']
  const authRequired = !publicPages.includes(to.path)
  const userStore = useUserStore()
  if (authRequired && !userStore.connectedUser) {
    const notification = useNotificationStore()
    notification.error('Login to see this page')
    return '/auth'
  }
})

export default router
