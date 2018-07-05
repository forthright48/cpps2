import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const timeout = 10000
// Create axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // Api base_url
  timeout: timeout, // Request timeout
  withCredentials: true,
  credentials: 'same-origin'
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * status为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.status !== 200 && res.status !== 201) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })

      // 50008:Illegal token; 50012:Other clients logged in;  50014:Token expired;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again.', 'Confirm logout.', {
          confirmButtonText: 'Re-login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// To re-instantiate the vue-router object Avoid bugs
          })
        })
      }
      return Promise.reject('error')
    } else {
      const message = response.data.message
      if (message) {
        Message({
          type: 'success',
          message: response.data.message,
          duration: 10 * 1000,
          showClose: true
        })
      }
      return response.data
    }
  },
  error => {
    let message
    if (error.code === 'ECONNABORTED') {
      message = `Request timed out at ${timeout} ms.`
    } else {
      const data = error.response.data
      if (data.error) {
        console.error(data.error)
      }
      message = data.status ? `Error ${data.status}: ${data.message}` : error.message
    }
    Message({
      message: message,
      type: 'error',
      showClose: true,
      duration: 10 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
