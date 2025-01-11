import Home from "@/views/Home.vue";
import { createWebHistory, createRouter } from "vue-router";
import 'vue-router';


declare module 'vue-router' {
  interface RouteMeta {
    index?: number
  }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                index: 1
            }
        },
        {   
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
            meta: {
                index: 1
            }
        },
        {   
            path: "/user",
            name: "user",
            component: () => import("@/views/User.vue"),
            meta: {
                index: 1
            }
        },
        {   
            path: "/product-list",
            name: "product-list",
            component: () => import("@/views/ProductList.vue"),
            meta: {
                index: 2
            }
        },
        {   
            path: "/category",
            name: "category",
            component: () => import("@/views/Category.vue"),
            meta: {
                index: 1
            }
        },
        {   
            path: "/product/:id",
            name: "product",
            component: () => import("@/views/ProductDetail.vue"),
            meta: {
                index: 3
            }
        },
        {   
            path: "/cart",
            name: "cart",
            component: () => import("@/views/Cart.vue"),
            meta: {
                index: 1
            }
        },
    ]
})

export default router