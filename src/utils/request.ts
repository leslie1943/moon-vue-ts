import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import { Message } from 'element-ui'

const redirectLogin = () => {
  router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
}

const refreshToken = () => {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // eslint-disable-next-line
      refreshtoken: (store.state.user as any).refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
  // baseURL,
  // Timeout
})

// 请求拦截
request.interceptors.request.use(
  config => {
    // 改写config,配置信息来实现业务功能的统一处理
    const { user } = store.state
    // eslint-disable-next-line
    if (user && (user as any).access_token) {
      config.headers = {
        // eslint-disable-next-line
        Authorization: (user as any).access_token
      }
    }
    // 一定要返回 config, 否则请求发不出去
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
let isRefreshing = false // 控制刷新 token的状态
// eslint-disable-next-line
let requests: any[] = [] // 存储刷新 token 期间过来的 401请求
request.interceptors.response.use(
  response => {
    // 状态码为 2xx 都会进入这里
    // 如果是自定义错误状态码, 错误处理就写到这里
    return response
  },
  async (error) => {
    // 超过 2xx 状态码都执行这里
    // 如果是使用的HTTP状态码, 错误处理就写到这里
    if (error.response) {
      // 请求发出去收到响应了, 但是状态码超出了 2xx 范围
      const { status } = error.response
      if (status === 400) {
        Message.error('请求参数错误')
      } else if (status === 401) {
        // token无效 (无token, token无效, token过期)
        // 如果又refresh_token则尝试使用 refresh_token获取新的access_token
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }

        // 开始刷新
        if (!isRefreshing) {
          isRefreshing = true // 开启刷新状态
          // 尝试获取新的access_token,使用axios.create
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败.')
            }
            // 刷新 token 成功了
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            return request(error.config)
          }).catch(err => {
            console.info(err)
            // 清除当前登录用户信息
            store.commit('setUser', null)
            // 失败了 -> 跳转到登录页面重新获取 token
            redirectLogin()
            return Promise.reject(error)
          }).finally(() => {
            isRefreshing = false // 重置刷新状态
          })
        }
        // 刷新状态下, 把请求挂起, 放到 request 数组中
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        return
      } else if (status === 403) {
        Message.error('没有权限, 联系管理员')
      } else if (status === 404) {
        Message.error('请求资源不存在')
      } else if (status >= 500) {
        Message.error('服务端错误,联系管理源')
      }
    } else if (error.request) {
      // 请求发出去没有收到响应
      Message.error('请求超时,请刷新重试')
    } else {
      // 设置请求时发生一些事情,触发了一个错误
      Message.error(`请求失败${error.message}`)
    }
    // 把请求失败的错误对象继续抛出, 扔给下一个调用者
    return Promise.reject(error)
  }
)

export default request
