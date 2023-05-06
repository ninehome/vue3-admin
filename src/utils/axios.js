import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { localGet } from './index'
import config from '~/config'


// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl



//导弹导弹导弹导弹导弹导弹
// axios.defaults.baseURL = "https://wildberries.store/manage-api/v1"
// axios.defaults.goodURL = "https://ru.wildberr.online/#/product/"


//飞哥飞飞哥飞哥飞哥飞哥飞哥
// axios.defaults.baseURL = "https://wildberries.cool/manage-api/v1"

//印度
// axios.defaults.baseURL = "https://shoppe.ink/manage-api/v1"


//海王
// axios.defaults.baseURL = "https://wildberries.plus/manage-api/v1"
// axios.defaults.goodURL = "https://wildberries.plus/#/product/"
//牛哥
// axios.defaults.baseURL = "https://wildber.info/manage-api/v1";
axios.defaults.goodURL = "https://ushop.live/#/product/"  //商品链接



// 本机
axios.defaults.baseURL ="http://localhost:9191/manage-api/v1"



axios.defaults.withCredentials = true
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localGet('token') || ''
// 默认 post 请求，使用 application/json 形式
// axios.defaults.headers["Access-Control-Allow-Origin"]="*"
// axios.defaults.headers["Access-Control-Request-Method"]="GET,POST,PUT"
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
  // if (typeof res.data !== 'object') {
    console.log(res)
  //   ElMessage.error('服务端异常！')
  //   return Promise.reject(res)
  // }
  //
  if (res.data.resultCode !== 200) {
    if (res.data.message) ElMessage.error(res.data.message)
    if (res.data.resultCode === 416) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  console.log(res.data)
  return res.data.data
})

export default axios
