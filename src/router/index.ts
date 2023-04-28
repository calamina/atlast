import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/Authview.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  // const alertStore = useAlertStore();
  // alertStore.clear();
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/account/login', '/account/register']
  // const authRequired = !publicPages.includes(to.path)
  // const authStore = useAuthStore()
  // if (authRequired && !authStore.user) {
  //   authStore.returnUrl = to.fullPath
  //   return '/account/login'
  // }
})

export default router
