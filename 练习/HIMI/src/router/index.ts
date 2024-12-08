import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/aboutus',
      component: () => import('@/pages/AboutUS.vue'),
    },
    {
      path: '/services',
      component: () => import('@/pages/Services.vue'),
    },
    {
      path: '/joinus',
      component: () => import('@/pages/JoinUS.vue'),
    },
    {
      path: '/contactus',
      component: () => import('@/pages/ContactUS.vue'),
    },
    {
      path: '/teamsAndPolicies',
      component: () => import('@/pages/Political.vue'),
    },
    {
      path: '/',
      redirect: '/home'
    },
  ],
})

export default router
