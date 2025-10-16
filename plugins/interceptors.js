// interceptors.js 请求拦截器
import Vue from 'vue'

export default ({ app }, inject) => {
  //  cancelToken中的cancel函数
  Vue.$httpRequestList = []
  // create an axios instance
  const CancelToken = app.$axios.CancelToken
  // 请求拦截器
  app.$axios.interceptors.request.use(
    config => {
      // 有需要的话可以在请求头中添加token
      // 请求头添加token
      const token = localStorage.getItem('token')
      config.headers.Authorization = 'Bearer ' + token
      return config
    },
    err => {
      console.warn(err)
      return new Promise.resolve(err)
    }
  )

  // 响应拦截器
  app.$axios.interceptors.response.use(
    response => {
      if (response.headers['refresh-token']) {
        localStorage.setItem('token', response.headers['refresh-token'])
      }
      return response
    },
    err => {
      // 返回状态码不为200时候的错误处理
      switch (err.response.status) {
        case 401:
          // token失效，删除本地token,重定向到后端登录接口
          let redirectUrl = 'http://10.1.11.181:9730'
          window.location.href = redirectUrl
          break
        case 403:
          console.warn('抱歉，您的权限受限')
          break
        default:
          break
      }
      return Promise.resolve(err)
    }
  )
  // 错误拦截器
  app.$axios.onError(error => {
    // console.log('错误拦截器：', error)
    return error
  })
}
