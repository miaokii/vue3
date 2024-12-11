import Home from '@/pages/Home/Home.vue'
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
      component: () => import('@/pages/AboutUS/AboutUS.vue'),
    },
    {
      path: '/services',
      component: () => import('@/pages/Services/Services.vue'),
    },
    {
      path: '/joinus',
      component: () => import('@/pages/JoinUS/JoinUS.vue'),
    },
    {
      path: '/contactus',
      component: () => import('@/pages/ContactUS/ContactUS.vue'),
    },
    {
      path: '/disclaimer',
      component: () => import('@/pages/Disclaimer.vue'),
    },
    {
      path: '/',
      redirect: '/home'
    },
  ],
})

export default router
