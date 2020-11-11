import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { userModule } from '@/store/UserModule';
import { UserApi } from '@/api/UserApi';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/searchdocument',
    meta: { needLogin: true }
    // component: Home
  },
  {
    path: '/authentication',
    name: 'Authentication',
    meta: { needLogin: false },
    component: () => import(/* webpackChunkName: "Authentication" */ '../views/User/Authentication.vue')
  },
  {
    path: '/authentication/from-confirm',
    name: 'Authentication Confirm',
    meta: { needLogin: false },
    component: () => import(/* webpackChunkName: "Authentication" */ '../views/User/Authentication.vue'),
    props: { displayAccountVerification: true }
  },
  {
    path: '/confirmaccount/:id',
    name: 'Confirm Account',
    meta: { needLogin: false },
    beforeEnter: (to, from, next) => {
      console.log('couocu');
      if (!to.params.id) next('/');
      else {
        UserApi.confirmAccount(to.params.id)
          .then(() => {
            next('/authentication/from-confirm');
          })
          .catch(() => {
            next('/');
          });
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    meta: { needLogin: false },
    component: () => import(/* webpackChunkName: "Register" */ '../views/User/Register.vue')
  },
  {
    path: '/ActivationMail',
    name: 'Activation Mail',
    meta: { needLogin: false },
    component: () => import(/* webpackChunkName: "ActivationMail" */ '../views/User/ActivationMail.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { needLogin: true },
    component: () => import(/* webpackChunkName: "Profile" */ '../views/User/Profile.vue')
  },
  {
    path: '/adddocument',
    name: 'Add Document',
    meta: { needLogin: true },
    component: () => import(/* webpackChunkName: "AddDocument" */ '../views/Document/AddDocument.vue')
  },
  {
    path: '/searchdocument',
    name: 'Search Document',
    meta: { needLogin: true },
    component: () => import(/* webpackChunkName: "SearchDocument" */ '../views/Document/SearchDocument.vue')
  },
  {
    path: '/showdocument/:id',
    name: 'Show Document',
    meta: { needLogin: true },
    component: () => import(/* webpackChunkName: "ShowDocument" */ '../views/Document/ShowDocument.vue')
  },
  {
    path: '/editdocument/:id',
    name: 'Edit document',
    meta: { needLogin: true },
    component: () => import(/* webpackChunkName: "EditDocument" */ '../views/Document/EditDocument.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
});

router.beforeEach((to, from, next) => {
  if (to.meta?.needLogin && !userModule.isAuthenticate) {
    next({ name: 'Authentication' });
  } else if (userModule.isAuthenticate && !to.meta?.needLogin) {
    next('/');
  } else next();
});

export default router;
