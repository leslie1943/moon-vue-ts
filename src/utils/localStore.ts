/** eslint-disable */

/**
 * 存储localStorage
 */

const localUtil = window.localStorage

export const setItem = (name: string, content: string) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  localUtil.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getItem = (name: string) => {
  if (!name) return
  let value = localUtil.getItem(name)
  if (value !== null) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      // eslint-disable-next-line
      value = value
    }
  }
  return value
}

/**
 * 清除localStorage
 */
export const removeItem = (name: string) => {
  if (!name) return
  localUtil.removeItem(name)
}
