import dayjs from 'dayjs'

// format
export const formatDate = (
  value: number = new Date().getMilliseconds()
): string => {
  return dayjs(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
}
