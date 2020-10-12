/**
 * 角色相关请求模块
 */

import request from '@/utils/request'

interface RoleSearchState {
  code?: string
  id?: number
  name?: string
  startCreateTime?: string
  endCreateTime?: string
  current?: number
  size?: number
}

export const getRolePages = (data: RoleSearchState) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

interface RoleSaveState {
  code: string
  id?: number
  name: string
  description?: string
}
export const createRole = (data: RoleSaveState) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/boss/role/' + id
  })
}

export const getRole = (id: number) => {
  return request({
    method: 'GET',
    url: '/boss/role/' + id
  })
}
