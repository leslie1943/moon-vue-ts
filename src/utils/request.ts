import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL,
  // Timeout
})

// 请求拦截
request.interceptors.request.use(
  function(config) {
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
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截

export default request
