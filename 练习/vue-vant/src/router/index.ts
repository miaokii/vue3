import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/MineView.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting.vue'),
    },
    {
      path: '/provicy',
      name: 'provicy',
      component: () => import('../views/Provicy.vue'),
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import('../views/IFrame.vue'),
    },
    {
      path: '/apply',
      name: 'apply',
      component: () => import('../views/LoanApply.vue')
    },
    {
      path: '/unregister',
      name: 'unregister',
      component: () => import('../views/UnRegister.vue')
    },
  ],
})

// 前置钩子
router.beforeEach((to, from, next)=>{
  console.log('Navigating to:', to.name);
  next()
})

// 后置钩子
router.afterEach((to, next)=>{
  console.log('Navigating to:', to.name);
})



export default router
