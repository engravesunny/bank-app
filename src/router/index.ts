import { createRouter, createWebHashHistory } from "vue-router";
import * as _ from "lodash";
import { routes } from "./config";
import { user } from '@/store/user'
import pinia from "@/store";
const userStore = user(pinia);

// meta接口定义
declare module "vue-router" {
  interface RouteMeta {
    menu?: boolean;
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

const notAuthPath = ['/auth', '/sign-in', '/sign-up', '/card', '/home', '/account']

router.beforeEach((to, _from, next) => {
  if (!notAuthPath.includes(to.path)) {
    if (!!userStore.token) {
      next()
    } else {
      next('/sign-in')
    }
  } else {
    next()
  }
})

export default router;
