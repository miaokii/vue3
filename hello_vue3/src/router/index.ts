import About from "@/components/About.vue";
import Home from "@/components/Home.vue";
import News from "@/components/News.vue";
import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    // 路由器工作模式
    history: createWebHistory(),
    // 路由规则
    routes: [
        {
            path:'/',
            component: Home
        },
        {
            path:'/home',
            component: Home
        },
        {
            path:'/news',
            component: News
        },
        {
            path: '/about',
            component: About
        }
    ]
})

export default router