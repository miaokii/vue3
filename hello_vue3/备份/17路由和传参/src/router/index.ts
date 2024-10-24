import About from "@/pages/About.vue";
import Home from "@/pages/Home.vue";
import NewDetail from "@/pages/NewDetail.vue";
import News from "@/pages/News.vue";
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
    // 路由规则
    routes: [{
        path: '/home',
        component: Home
    }, {
        name: 'xinwen',
        path: '/news',
        component: News,
        children: [
            // query传参
            // {
            //     name:'xiang',
            //     path:'detail',
            //     component: NewDetail
            // },
            
            // param传参
            {
                name:'xiang',
                path:'detail/:id/:title/:content',
                component: NewDetail
            }
        ]
    }, {
        path: '/about',
        component: About
    }
    ]
})
/// 向外抛出
export default router