
import axios from 'axios'
import { ElMessageBox,ElMessage } from 'element-plus'
import router from '../router'
import { getToken } from '@/utils/auth' // get token from cookie
import {setStorage,getStorage} from '../utils/storage.js'
// create an axios instance
const service = axios.create({
  // baseURL:'http:timesheet-test.yit.life:5500'
  baseURL:process.env.NODE_ENV === 'development' ? '/test' : ''
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? '/api'
  //     : process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request 
})


// request interceptor
service.interceptors.request.use(
  config => {
	  // if (store.getters.token) {
	    // let each request carry token
	    // ['X-Token'] is a custom headers key
	    // please modify it according to the actual situation
		config.headers['Access-Control-Allow-Origin'] = '*'
	    config.headers['Authorization'] = getStorage('setToken')
	    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		config.headers['Accept'] = '*/*'
	  // }
    // if (config.method === 'GET' || config.method === 'get'){
    //   console.log(config.data)
    //   let paramStr = '?'
    //   for (let key in config.data){
    //     paramStr += key + '=' + config.data[key] + '&'
    //   }

    //   config.url = config.url + paramStr.substring(0,paramStr.length - 1)
    // }
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
	return res
	// if(response.status==200){
	// 	return res;
	// }
    if (res.code === '200'||res.code === 200){
      return res
    }else{
		if(res.code === 4003){ //禁止访问
			router.push('/Autorit');
		}
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== '0' && res.code || res.path) {
    //   if (res.code === '100011' && res.code || res.code === '100012' && res.code) {
    //     // to re-login
    //     ElMessageBox.alert('您的登录信息已失效，请重新登录！', 'Confirm logout', {
    //       confirmButtonText: '确定',
    //       type: 'warning',
    //       callback: () => {
    //         store.dispatch('user/resetToken').then(() => {
    //           location.reload()
    //         })
    //       }
    //     })
    //   } else {
    //     ElMessage({
    //       message: res.message || 'Error',
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log(error, 'error request')
    // console.log(parseInt(error.response.status), 'error response')
    if (parseInt(error.response.status) === 401) {
      // to re-login
      ElMessageBox.alert('您的登录信息已失效，请重新登录！', 'Confirm logout', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: () => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }
      })
      return
    }
    ElMessage({
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
