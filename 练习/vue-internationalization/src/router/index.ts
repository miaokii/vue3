import Forget from "@/components/Forget.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/login',
            component: Login
        },
        {
            path:'/register',
            component: Register
        },
        {
            path: '/forget',
            component: Forget
        }, {
            path: '/',
            redirect: '/login'
        }
    ]
})

export default router