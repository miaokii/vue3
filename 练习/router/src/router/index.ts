import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/home/user',
      children: [
        {
          path: '/home/user',
          name: 'user',
          component: ()=>import('../views/User.vue')
        },
        {
          path: '/home/work',
          name: 'work',
          component: ()=>import('../views/Work.vue')
        },
        {
          path: '/home/map',
          name: 'map',
          component: ()=>import('../views/WorldMap.vue')
        },
        {
          path: '/home/bee',
          name: 'bee',
          component: ()=>import('../views/BeePointer.vue')
        },{
          path: '/home/about',
          name: 'about',
          component: ()=>import('../views/About.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
})

export default router
