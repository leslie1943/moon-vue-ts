import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置规则
export const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: '/Role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Courses',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Users',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/Advertise',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/AdvertiseSpace',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-or-edit' */ '@/views/menu/create.vue'
          ),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-or-edit' */ '@/views/menu/edit.vue'
          ),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/404/index.vue')
  }
]
