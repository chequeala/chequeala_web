import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView
    },
    {
      path: '/checklist',
      name: 'checklist',
      component: () => import('@/views/CheckList.vue')
    },
    {
      path: '/recursos',
      name: 'recursos',
      component: () => import('@/views/MasRecursos.vue')
    },
    {
      path: '/principios',
      name: 'principios',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NuestrosPrincipios.vue')
    }
  ]
})

export default router
