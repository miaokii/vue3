import Home from "@/views/Home.vue";
import { createWebHistory, createRouter } from "vue-router";

declare module 'vue-router' {
    interface RouteMeta {
        index: number
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
                keepAlive: true,
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
                keepAlive: true,
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
                keepAlive: true,
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
                keepAlive: true,
                index: 1
            }
        },
        {
            path: '/address',
            name: 'address',
            component: () => import("@/views/Address.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/address-edit',
            name: 'address-edit',
            component: () => import("@/views/AddressEdit.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/create-order',
            name: 'create-order',
            component: () => import("@/views/CreateOrder.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/order',
            name: 'order',
            component: () => import("@/views/Order.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/order-detail',
            name: 'order-detail',
            component: () => import("@/views/OrderDetail.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import("@/views/Setting.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import("@/views/About.vue"),
            meta: {
                keepAlive: false,
                index: 2
            }
        }
    ]
})

export default router