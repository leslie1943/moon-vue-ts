import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
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
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/resource',
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
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
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

const router = new VueRouter({
  routes
})

// 全局前置守卫, 任何页面的访问都要经过这里
// to: 要去哪里的路由信息
// from: 从哪里来的路由信息
router.beforeEach((to, from, next) => {
  // to.matched 是是一个数组(匹配到的路由记录: 父路由和子路由)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
