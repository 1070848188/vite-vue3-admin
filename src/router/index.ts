import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { errorRouter, staticRouter } from './staticRouter';

const routes: RouteRecordRaw[] = [...staticRouter, ...errorRouter];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
