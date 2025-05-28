import Home from '@/pages/Home/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savePosition) {
    return { top: 0 }
  },
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
      path: '/service_detail/:service_type',
      component: () => import('@/pages/Services/views/ServiceDetail.vue'),
    },
    {
      path: '/',
      redirect: '/home'
    },
  ],
})

export default router
