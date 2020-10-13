/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}
export const login = (data: User) => {
  // axios 默认发送的是 application/json格式的数据
  return request({
    url: '/front/user/login',
    method: 'POST',
    /**
     * 如果data使用的是 qs.stringify() 那么 headers 自动设置为 application/x-www-form-urlencoded
     */
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    /**
     * 如果 data 是普通对象, 则 content-type是application/json
     * 如果 data 是 qs.stringify(data)转换之后的数据: key=value&key=value, 则 content-type 设置为 application/x-www-form-urlencoded
     * 如果 data 是 FormData 对象, 则Content-Type是 multipart/form-data
     */

    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  // axios 默认发送的是 application/json格式的数据
  return request({
    url: '/front/user/getInfo',
    method: 'GET'
  })
}

interface UserPagesSearch {
  currentPage?: number
  pageSize?: number
  phone?: string
  userId?: number
  startCreateTime?: string
  endCreateTime?: string
}
export const getUserPages = (data: UserPagesSearch) => {
  return request({
    url: '/boss/user/getUserPages',
    method: 'POST',
    data
  })
}
