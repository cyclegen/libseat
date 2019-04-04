import CryptoJS from 'crypto-js'

const secretKey = 'leos3cr3t'

export const getHmacParams = (config, requestMethod) => {
  let requestId = getRequestUUID()
  let requestDate = new Date().getTime()
  let planData = 'seat::' + requestId + '::' + requestDate + '::' + requestMethod.toUpperCase()
  let secretdata = HMACSHA256(planData)
  config.headers['X-request-id'] = requestId
  config.headers['X-request-date'] = requestDate
  config.headers['X-hmac-request-key'] = secretdata
  return config
}
function getRequestUUID () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

function HMACSHA256 (planData) {
  let hmacStr = CryptoJS.HmacSHA256(planData, secretKey)
  return hmacStr
}
