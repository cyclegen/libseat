import Axios from 'axios'
import { Modal } from 'iview'
import { getHmacParams } from '@/libs/hmacUtil'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // Spin.show()
      // 在发送请求之前做些什么
      // 增加hmac参数
      config = getHmacParams(config, config.method)
      return config
    }, error => {
      // 对请求错误做些什么
      console.info('请求出错了:' + error)
      return Promise.reject(error)
    })

    // 添加响应拦截器
    let content = ''
    instance.interceptors.response.use((res) => {
      let { data } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
          // Spin.hide()
        }, 500)
      }
      if (!(data instanceof Blob)) {
        if (data.code === 500) {
          content = '<h1>服务端出错了,请稍后再试!</h1>'
          Modal.error({
            content: content,
            closable: false
          })
          return false
        } else if (data.code === 404) {
          content = '<h1>请求的数据不存在,请稍后再试!</h1>'
          Modal.error({
            content: content,
            closable: false
          })
          return false
        }
      }
      Modal.remove()
      return data
    }, (error) => {
      // 对响应错误做点什么
      if (error.message === 'Network Error') {
        content = '<h1>网络延时,请稍后再试!</h1>'
      }
      Modal.error({
        content: content,
        closable: false
      })
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: LIBSEATDOMAIN,
      // timeout: 2000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
