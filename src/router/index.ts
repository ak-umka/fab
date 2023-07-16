import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { PhotoView, Favorites, HomeView } from '@/views';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomeView },
  { path: '/photo/:id', component: PhotoView },
  { path: '/favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
