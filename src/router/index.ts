import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useStoreUsers } from 'src/stores/users';
import { storeToRefs } from 'pinia';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
*/


export default route(async function (/* { store, ssrContext } */) {
  const { onAuthState } = useStoreUsers();
  const { user } = storeToRefs(useStoreUsers());
  await onAuthState();

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });


  /**
  * @link https://quasar.dev/quasar-cli-vite/routing
  */
  Router.beforeEach((to, from, next) => {
    if (to.meta.protectedRoute === true && user.value?.uid === undefined) {
      next('/sign-in');
    } else if (to.meta.authRoute === true && user.value?.uid !== undefined) {
      next('/');
    } else {
      next();
    }
  })

  return Router;
});
