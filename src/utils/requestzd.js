/*
 * @Descripttion:
 * @version:
 * @Author: Mr.wu
 * @Date: 2020-05-19 10:40:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-06-05 15:40:26
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getRandomString, encrypt } from '@/utils/digest'
import CryptoJS from 'crypto-js'

// create an axios instance
const service = axios.create({
  baseURL: '192.168.110.88:8081', // 马雪丽
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://192.168.110.136:8086/csih/clinic/yancon'
  //     : process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

const IV_KEY = 'NjczOTgxMzk0QHFxLmNvbQ=='

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(config.data, 'config.data')
    if (config.data !== undefined && config.data != null) {
      if (config.headers !== undefined && config.headers != null) {
        var contentType = config.headers['Content-Type']
        // console.log(contentType, 'contentType')
        if (
          contentType === undefined ||
          (contentType != null && contentType !== 'multipart/form-data')
        ) {
          console.log('我是未加密参数：' + config.data)
          const data = JSON.stringify(config.data)
          // console.log(data)
          // 加密传输参数
          const randomStr = getRandomString(16)
          // console.log(randomStr);

          const srcs = CryptoJS.enc.Utf8.parse(randomStr)
          var key = CryptoJS.enc.Base64.stringify(srcs)
          // console.log("key  Base64加密字符串是==>"+key)

          // 内容AES加密
          let deIv = CryptoJS.enc.Base64.parse(IV_KEY)
          deIv = CryptoJS.enc.Utf8.stringify(deIv)
          // console.log(deIv+"==========解密iv")
          const content = encrypt(data, randomStr, deIv)
          // console.log("内容加密是===>" + content)

          // 签名 MD5加密
          const sign = CryptoJS.MD5(data + randomStr).toString()
          // console.log("签名是==>"+sign)
          config.data = {
            keySecret: key,
            encryptData: content,
            signSecret: sign
          }
        }
      }

      // console.log(config)
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res, 'request')
    // blob类型下载
    // eslint-disable-next-line no-irregular-whitespace
    if (res instanceof Blob) {
      // eslint-disable-next-line no-irregular-whitespace
      return res
    }

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '0'&&res.code ) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === '100011'&&res.code  || res.code === '100012'&&res.code ) {
        // to re-login
        MessageBox.alert('您的登录信息已失效，请重新登录！', 'Confirm logout', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: () => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error, 'error request')
    Message({
      message:
        parseInt(error.response.status) === 404
          ? '未找到接口'
          : error.response.data.message || '未知错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response)
  }
)

export default service
