/**
 * 权限
 */

import request from '@/utils/request'

export const getUserPermissions = () => {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}
