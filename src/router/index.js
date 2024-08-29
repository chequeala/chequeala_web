import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckList from '@/views/CheckList.vue'
import MasRecursos from '@/views/MasRecursos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: HomeView
    },
    {
      path: '/checklist',
      name: 'checklist',
      component: CheckList
    },
    {
      path: '/recursos',
      name: 'recursos',
      component: MasRecursos
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
