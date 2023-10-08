import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/MediaView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },

    {
      path: '/media',
      name: 'media',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/MediaView.vue')
    },
    {
      path: '/links',
      name: 'links',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/LinkView.vue')
    },
    {
      path: '/notes',
      name: 'notes',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/NoteView.vue')
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'Backrooms',
      component: () => import('../views/BackroomsView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const { connectedUser } = useUserStore()
  const { addNotification } = useNotificationStore()
  if (!connectedUser && to.meta.requiresAuth) {
    addNotification({ type: 'error', message: 'log in to access this page :)' })
    return { name: 'auth' }
  }
})

export default router
