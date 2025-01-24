import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { createRouterCommonGuard } from "./guard/index";
import NotFound from "@/views/404/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    redirect: "/identifyCodeResult",
  },
  {
    path: "/identifyCodeResult",
    name: "identifyCodeResult",
    component: () => import("@/views/identify-code/index.vue"),
    meta: {
      title: "人脸识别结果页",
    },
  },
  {
    path: "/inviteCode",
    name: "inviteCode",
    meta: {
      title: "信息登记",
    },
    component: () => import("@/views/invite-code/index.vue"),
  },
  {
    path: "/invitePhone",
    name: "invitePhone",
    meta: {
      title: "信息登记",
    },
    component: () => import("@/views/info-phone/index.vue"),
  },
  {
    path: "/infoRegister",
    name: "infoRegister",
    meta: {
      title: "信息登记",
    },
    component: () => import("@/views/info-register/index.vue"),
  },
  {
    path: "/registerSuccess",
    name: "registerSuccess",
    component: () => import("@/views/register-success/index.vue"),
  },
  {
    path: "/agreement",
    name: "agreement",
    meta: {
      title: "个人信息使用授权协议",
    },
    component: () => import("@/views/agreement/index.vue"),
  },
  {
    path: "/informationAcquisition/:key(.*)",
    name: "informationAcquisition",
    component: () => import("@/views/informationAcquisition/index.vue"),
    meta: {
      title: "登记",
    },
  },
  {
    path: "/customer/:key(.*)",
    name: "customer",
    component: () => import("@/views/customer/index.vue"),
  },
  {
    path: "/customerPage/:key(.*)",
    name: "customerDetail",
    component: () => import("@/views/customerDetail/index.vue"),
  },
  {
    path: "/pdf/:id?",
    name: "PDF",
    component: () => import("@/views/pdf/index.vue"),
  },
  {
    path: "/creditReport",
    name: "creditReport",
    component: () => import("@/views/creditReport/index.vue"),
    meta: {
      title: "个人信用报告",
    },
  },
  {
    path: "/creditReportMain",
    name: "creditReportMain",
    component: () => import("@/views/creditReport/main.vue"),
    meta: {
      title: "个人信用报告",
    },
  },
  {
    path: "/creditReportDetail/:id?",
    name: "creditReportDetail",
    component: () => import("@/views/creditReport/detail.vue"),
    meta: {
      title: "个人信用报告查询结果",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "页面失效",
      requiresAuth: false,
    },
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

createRouterCommonGuard(router);
