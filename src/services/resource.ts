/**
 * 资源相关请求模块
 */

import request from '@/utils/request'

interface ResourceSearchState {
  id?: number
  name?: string
  startCreateTime?: string
  url?: string
  categoryId?: number
  endCreateTime?: string
  current?: number
  size?: number
}
export const getResourcePages = (data: ResourceSearchState) => {
  return request({
    method: 'POST',
    url: '/boss//resource/getResourcePages',
    data
  })
}
