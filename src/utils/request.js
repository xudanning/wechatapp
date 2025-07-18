// src/utils/request.js
import axios from 'axios'
import { showToast } from 'vant'

// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加企业微信token
    const token = localStorage.getItem('wework_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    // 添加企业微信用户信息
    const userInfo = localStorage.getItem('wework_user_info')
    if (userInfo) {
      config.headers['X-User-Info'] = userInfo
    }
    
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { data } = response
    
    // 统一处理响应数据
    if (data.code === 200) {
      return data
    } else if (data.code === 401) {
      // token过期，跳转到登录页
      showToast('登录已过期，请重新登录')
      localStorage.removeItem('wework_token')
      localStorage.removeItem('wework_user_info')
      // 可以在这里处理跳转到企业微信登录
      window.location.href = '/login'
      return Promise.reject(data)
    } else {
      // 其他错误
      showToast(data.message || '请求失败')
      return Promise.reject(data)
    }
  },
  error => {
    console.error('响应拦截器错误:', error)
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          showToast(data.message || '请求参数错误')
          break
        case 401:
          showToast('登录已过期，请重新登录')
          localStorage.removeItem('wework_token')
          localStorage.removeItem('wework_user_info')
          window.location.href = '/login'
          break
        case 403:
          showToast('没有权限访问')
          break
        case 404:
          showToast('请求的资源不存在')
          break
        case 500:
          showToast('服务器内部错误')
          break
        default:
          showToast(data.message || '网络错误')
      }
    } else if (error.code === 'ECONNABORTED') {
      showToast('请求超时')
    } else {
      showToast('网络连接失败')
    }
    
    return Promise.reject(error)
  }
)

export default request