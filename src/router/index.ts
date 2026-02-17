import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userList',
      component: ListView,
    },
    {
      path: '/users/:id',
      name: 'userDetail',
      component: () => import('../views/DetailView.vue'),
    },
    {
      path: '/users/new',
      name: 'newUser',
      component: () => import('../views/NewUserView.vue'),
    },
  ],
})

export default router
