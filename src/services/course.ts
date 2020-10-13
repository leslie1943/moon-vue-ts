/**
 * 课程相关请求模块
 */
import request from '@/utils/request'

interface CourseSearchState {
  courseName?: string
  status?: number | string
  current?: number
  size?: number
}

export const getCoursePages = (data: CourseSearchState) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (courseId: number, status: number) => {
  return request({
    method: 'GET',
    url: `/boss/course/changeState?courseId=${courseId}&status=${status}`
  })
}
