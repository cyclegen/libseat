import Axios from 'axios'
// 验证卡号
export const getQRcodePath = () => {
  // 创建新的实例，配置不同的域名
  let conf = {
    baseURL: LIBSEATWECHATDOMAIN
  }
  let axios = Axios.create(conf)
  return axios.request({
    url: '/getQRcodePath',
    method: 'GET'
  })
}
