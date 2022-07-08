import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  }, {
    path: '/hi/:name',
    name: 'hi',
    component: () => import('@/pages/hi/index.vue'),
  }, {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/pages/notFound.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
