import env from './env'

const DEV_URL = '/'
const PRO_URL = 'http://localhost:8080/app/libseatTouch/'

export default env === 'development' ? DEV_URL : PRO_URL
