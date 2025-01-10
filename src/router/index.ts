import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/composables/useAuth';
import BrassinView from '@/views/BrassinView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'offline' | 'default'
    requiresAuth: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'offline', requiresAuth: false },
      beforeEnter: (to, from) => {
        const isAuth = useAuth().checkAuth();

        if (isAuth) {
          return {
            path: '/',
          }
        }
      }
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: '/brassin/:id',
      name: 'brassin',
      meta: { requiresAuth: true },
      component: BrassinView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from) => {
  const isAuth = useAuth().checkAuth();

  if (to.meta.requiresAuth && isAuth === false) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router