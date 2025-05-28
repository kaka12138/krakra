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
    path: '/about/:id',
    name: 'about',
    component: () => import('../views/About.vue'),
    children: [
      {
        path: 'mywork',
        name: 'mywork',
        component: () => import('../views/MyWork.vue'),
      },
      {
        path: 'myguashi',
        name: 'myguashi',
        component: () => import('../views/MyGuaShi.vue'),
      },
      {
        path: 'myorder',
        name: 'myorder',
        component: () => import('../views/MyOrder.vue'),
      },
      {
        path: 'myoc',
        name: 'myoc',
        component: () => import('../views/MyOC.vue'),
      },
      {
        path: 'myfavorite',
        name: 'myfavorite',
        component: () => import('../views/MyFavorite.vue'),
      },
      {
        path: 'myrecreation',
        name: 'myrecreation',
        component: () => import('../views/MyRecreation.vue'),
      },
      {
        path: 'mycollection',
        name: 'mycollection',
        component: () => import('../views/MyCollection.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
