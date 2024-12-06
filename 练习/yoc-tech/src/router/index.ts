import YocAbout from "@/pages/YocAbout.vue";
import YocBusiness from "@/pages/YocBusiness.vue";
import YocHome from "@/pages/YocHome.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    /* 路由器工作模式
    history模式
        URL更美观，不带有#，更接近传统网站的URL
        后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误
    hash模式
        兼容性更好，不需要服务端处理路径
        URL带有#，不美观，且SEO优化方面相对较差 
     */
    history: createWebHistory(),
    routes: [
        {
            path:'/home',
            component: YocHome
        },
        {
            path:'/work',
            component: YocBusiness,
            name: '优卡业务'
        }, 
        {
            path:'/about',
            component: YocAbout
        },
        {
            path:'/',
            redirect: '/home'
        }
    ]
})

export default router