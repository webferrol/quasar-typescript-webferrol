import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayoutPublic.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'sign-in', name: 'SignIn', component: () => import('pages/SignIn.vue') },
      { path: 'work-experience', name: 'WorkExperience', component: () => import('pages/WorkExperience.vue') }
    ],    
  },
  //Backend
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'HomeAdmin', component: () => import('pages/backend/IndexPage.vue') },
    ],    
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
