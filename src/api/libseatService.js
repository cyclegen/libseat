import Axios from 'axios'
// 验证卡号
export const verifyCardNoAgain = (cardNo) => {
  // 创建新的实例，配置不同的域名
  let conf = {
    baseURL: LIBSEATSERVICEDOMAIN
  }
  let axios = Axios.create(conf)
  return axios.request({
    url: '/cardVerifyAgain?cardNo=' + cardNo,
    method: 'GET'
  })
}
