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
            name: "Home",
            component: Home,
            meta: {
                index: 1
            }
        },
        {   
            path: "/login",
            name: "Login",
            component: () => import("@/views/Login.vue"),
            meta: {
                index: 1
            }
        },
    ]
})

export default router