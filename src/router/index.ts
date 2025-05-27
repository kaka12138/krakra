import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: '/work',
    children: [
      {
        path: 'guashi',
        name: 'guashi',
        component: () => import('../views/GuaShi.vue'),
      },
      {
        path: 'work',
        name: 'work',
        component: () => import('../views/Work.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
