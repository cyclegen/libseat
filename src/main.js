// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './view/tab/store/store'
import iView from 'iview'
import config from '@/config'
import touch from 'touchjs'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import GLOABAL from './Global'
// import '@/mock'
// 实际打包时应该不引入mock
import env from '@/config/env'
if (env === 'development') {
  require('@/mock')
}
// 加入支持IE
require('babel-polyfill')
Vue.use(iView)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$touch = touch
Vue.prototype.$global = GLOABAL // 将全局变量挂载到Vue实例上面
Vue.prototype.$Message.config({// 全局的$Message提示配置
  top: 500,
  duration: 3
})

// 定义全局点击函数
Vue.prototype.globalClick = function (callback) {
  document.getElementById('app').onclick = function () {
    callback()
  }
}
/**
 * 注册指令
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
