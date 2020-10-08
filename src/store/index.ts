import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localStore'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现了数据共享,在组件里面访问方便, 但没有持久化
  state: {
    // 当前登录用户状态
    // user: null
    user: getItem('user') || null
  },
  mutations: {
    // 修改容器数据必须使用 mutation 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止页面刷新丢失,需要把 user 数据持久化
      setItem('user', payload)
    }
  },
  actions: {},
  modules: {}
})
