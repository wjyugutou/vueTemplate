import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import vueHook from 'alova/vue'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: {
      /** 是否过滤data */
      filterData?: false
      /** blob */
      blob?: boolean
    }
  }
}

// 默认只缓存get请求 cacheFor
const alovaInstance = createAlova({
  baseURL: '/api',
  timeout: 10000,
  statesHook: vueHook,
  requestAdapter: adapterFetch(),
  // beforeRequest: (config) => {
  //   console.log('beforeRequest', config)
  //   // const token = localStorage.getItem('token')
  //   // if (token)
  //   // config.config.headers.Authorization = `Bearer ${token}`
  // },
  responded: async (response, instance) => {
    if (response.status === 200 && response.ok) {
      if (instance.meta?.blob) {
        // 根据实际情况变更
        return {
          data: await response.blob(),
          filename: response.headers.get('Content-Disposition'),
        }
      }
      const res = await response.json()
      if (res.code === 200) {
        return instance.meta?.filterData !== false ? res.data : res
      }
      else {
        // 根据实际情况变更
        // alert(res.msg || '请求失败')
        return Promise.reject(res.msg)
      }
    }
    else {
      // 根据实际情况变更
      // alert(response.statusText)
      return Promise.reject(response.statusText)
    }
  },
})

export default alovaInstance
