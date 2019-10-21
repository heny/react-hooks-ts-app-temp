import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { getToken, removeToken, getHost } from '@/common/utils/common'
// import store from '@/store/index'

declare type Methods =
  | 'GET'
  | 'OPTIONS'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

declare interface Datas {
  method?: Methods
  [key: string]: any
}
// const baseURL = (globals.host as any)[getCurrentEnv()]

const baseURL = getHost() //拦截环境
class HttpRequest {
  public queue: any // 请求的url集合
  public constructor() {
    this.queue = {}
  }
  destroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // stop loading
    }
  }

  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // show loading
        }
        if (url) {
          this.queue[url] = true
        }
        let token = getToken()
        if (token) {
          config.headers.Authorization = token
        }
        // if(url==='/singlePerson/importExcel') {
        //   config.headers['Content-Type'] = 'multipart/form-data'
        // }
        return config
      },
      (error: any) => {
        console.error(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (url) {
          this.destroy(url)
        }
        if (res.headers.authorization) {
          //如果响应头携带token，无感更新token
          // store.commit('SET_TOKEN', res.headers.authorization)
        }
        const { data, status } = res
        if (status === 200) {
          if (res.data.code !== 1) {
            //服务端错误
            errorMessage(res.data.msg)
          }
          // 请求成功
          return data
        } else if (status === 203 && res.data.code === 401) {
          //登录过期
          removeToken()
          // store.dispatch('clearUserInfo')
          // router.push('/login')
        } else {
          return requestFail(res) // 失败回调
        }
      },
      (error: any) => {
        if (url) {
          this.destroy(url)
        }
        console.error(error)
      }
    )
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create()
    await this.interceptors(instance, options.url)
    return instance(options)
  }
}

// 请求失败
const requestFail = (res: AxiosResponse) => {
  let errStr = '网络繁忙！'
  // token失效重新登陆
  if (res.data.code === 1000001) {
    // return router.replace({ name: 'login' })
  }

  return {
    err: console.error({
      code: res.data.errcode || res.data.code,
      msg: res.data.msg || errStr
    })
  }
}

// 合并axios参数
const conbineOptions = (
  url: string,
  data: Datas,
  method: Methods,
  headers: object | null | undefined
): AxiosRequestConfig => {
  // console.log(baseURL,'baseURL')
  const _data = { ...data }
  if (headers) {
  }
  const options = {
    method: method || 'GET',
    url,
    baseURL,
    headers
  }
  return options.method !== 'GET'
    ? Object.assign(options, { data: _data })
    : Object.assign(options, { params: _data })
}

let timeout: any = null
function errorMessage(msg: string) {
  if (timeout) {
    return
  }
  let callNow = !timeout
  timeout = setTimeout(() => {
    timeout = null
  }, 1000)
  if (callNow) {
    console.log(msg)
  }
}
const HTTP = new HttpRequest()

/**
 * 抛出整个项目的api方法
 */
const getData = async (
  url: string,
  data = {},
  method: Methods = 'GET',
  headers?: object | null | undefined
) => {
  const newOpts = conbineOptions(url, data, method, headers)
  // console.log(newOpts,'newOpts')
  const res = await HTTP.request(newOpts)
  return res
}
export default getData
