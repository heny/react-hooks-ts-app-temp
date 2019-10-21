import getData from '@/common/utils/http'
/**
 * 测试请求
 * */
export const getImgCode = (data?: any) =>
  getData(`/authUser/captcha/image`, data, 'GET')
