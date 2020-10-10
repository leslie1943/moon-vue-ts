/**
 * 菜单相关请求模块
 */

import request from '@/utils/request'
interface MenuParamsState {
  parentId: number
  name: string
  href: string
  icon: string
  orderNum: number
  description: string
  shown: boolean
}
export const createOrUpdateMenu = (data: MenuParamsState) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
