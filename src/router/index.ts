import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: '/work',
    children: [
      {
        path: 'work',
        name: 'work',
        component: () => import('../views/Work.vue'),
      },
      {
        path: 'guashi',
        name: 'guashi',
        component: () => import('../views/GuaShi.vue'),
      },
    ],
  },
  {
    path: '/chaindetail',
    name: 'chaindetail',
    component: () => import('../views/ChainDetail.vue'),
  },
  {
    path: '/carddetail',
    name: 'carddetail',
    component: () => import('../views/CardDetail.vue'),
  },
  {
    path: '/searchrescard',
    name: 'searchrescard',
    component: () => import('../views/SearchResCard.vue'),
  },
  {
    path: '/searchresuser',
    name: 'searchresuser',
    component: () => import('../views/SearchResUser.vue'),
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
        path: 'myroles',
        name: 'myroles',
        component: () => import('../views/MyRoles.vue'),
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
  {
    path: '/ocabout/:ocId',
    name: 'ocabout',
    component: () => import('../views/OcAbout.vue'),
    children: [
      {
        path: 'mywork',
        name: 'mywork',
        component: () => import('../views/MyWork.vue'),
      },
      {
        path: 'myfavorite',
        name: 'myfavorite',
        component: () => import('../views/MyFavorite.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

export default router;
