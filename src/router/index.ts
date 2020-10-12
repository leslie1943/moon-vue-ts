import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { routes } from './routes'
Vue.use(VueRouter)

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
