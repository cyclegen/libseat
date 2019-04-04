import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import '@/main'

Vue.use(Router)
const router = new Router({
  routes
})
const LOGIN_PAGE_NAME = 'home'
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  let token = Vue.prototype.$global.TOKEN
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是home页,跳转到home页
    next({ name: 'home' })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是home页
    next() // 跳转
  } else if (token && to.name !== LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面不是home页
    next()
  }
})
router.afterEach(to => {
  iView.LoadingBar.finish()
})

export default router
