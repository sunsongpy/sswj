import axios from 'axios'
import router from '@/router'

// axios.defaults.baseURL = 'https://sunsong.picp.vip'
axios.defaults.baseURL = 'http://0.0.0.0:8000/api/v1'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
  }
)

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      return router.push('/login?redirect=' + router.currentRoute.fullPath)
    }
    return error
  }
)

export default axios
