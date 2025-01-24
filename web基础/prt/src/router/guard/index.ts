import type { Router } from "vue-router";
import { getQueryParams } from "@/utils/tools";
import { setToken } from "@/utils/cache/auth";
export const createRouterCommonGuard = (router: Router) => {
  const params = getQueryParams(window.location.href);
  if (params.businessToken) {
    setToken(params.businessToken);
  }
  router.beforeEach((to, from, next) => {
    document.title = (to.meta.title as string) || "";
    next();
  });
};
