<template>
  <div class="index">
    <send-card-no></send-card-no>
    <Layout style="height: 100%;" class="main">
      <header-bar class="header-con">
        <user :isLogin="isLogin" @showHeader="showHeader"/>
        <div class="time-div" v-show="showTime">
          <p class="time-p">{{ nowTime }}</p>
          <span class="time-span">{{ monday }}</span>
          &nbsp;&nbsp;&nbsp;
          <span class="time-span">{{ weekday }}</span>
        </div>
        <img class="erweim" :src="imgSrc" alt="二维码">
        <p class="qiandao">扫码签到</p>
      </header-bar>
      <Content style="height: 80%;">
        <Content class="content-wrapper">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </Content>
      </Content>
      <tab class="footer-wrapper" v-show="showFooter"></tab>
    </Layout>
  </div>
</template>
<script>
import HeaderBar from './components/header-bar'
import User from './components/user'
import tab from '../tab/tab'
import SendCardNo from './components/send-card'
import { login, getUserInfo } from '@/api/libseat'
import { getQRcodePath } from '@/api/qrcode'
import './main.less'
export default {
  name: 'Main',
  data () {
    return {
      imgSrc: '',
      timeInterval: null,
      showFooter: false,
      showTime: true,
      isLogin: false,
      nowTime: '',
      monday: '',
      weekday: ''
    }
  },
  components: {
    HeaderBar,
    User,
    tab,
    SendCardNo
  },
  methods: {
    // 显示头部和底部
    showHeader (showTime, showFooter) {
      this.isLogin = false
      this.showFooter = showFooter
      this.showTime = showTime
    },
    // 获取时间,检验格式
    checkTime (time) {
      if (time < 10) {
        time = '0' + time
      }
      return time
    },
    formatDate: function () {
      let date = new Date()
      //  let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate() // 几号
      let week = date.getDay() // 周几
      let newD = ['日', '一', '二', '三', '四', '五', '六']
      for (var i = 0; i < 7; i++) {
        if (week === i) {
          week = newD[i]
        }
      }
      let hours = this.checkTime(date.getHours())
      let minutes = this.checkTime(date.getMinutes())
      let seconds = this.checkTime(date.getSeconds())
      this.monday = month + '月' + day + '日'
      this.weekday = '星期' + week
      this.nowTime = '' + hours + ':' + minutes + ':' + seconds
    },
    // 获取当前时间
    nowTimes () {
      this.formatDate(new Date())
    },
    // 定时器
    interval () {
      this.timeInterval = setInterval(() => {
        this.nowTimes()
      }, 1000)
    },
    // 获取路由的参数 判断是否有卡号
    _getUrlCardNo () {
      var cardNo = this.$route.query.cardNo
      // 有卡号登录
      if (cardNo) {
        this._login(cardNo, cardNo)
      }
    },
    // 公用登录方法
    _login (account, password) {
      login(account, password).then(res => {
        if (res.status === 'success') {
          let token = res.data.token
          this._updateActionTime()// 登录后更新操作时间
          this.$global.TOKEN = token
          this._getUserInfo()
        } else { // 登录失败
          this.$Message.warning({
            render: h => {
              return h('h1', res.message
              )
            },
            duration: 3
          })
        }
      })
    },
    // 获取用户信息
    _getUserInfo () {
      getUserInfo(this.$global.TOKEN).then(res1 => {
        this.$global.USERINFO = res1.data
        this.showTime = false
        this.isLogin = true
        this.showFooter = true
        // 登录后如果有预约跳转我的预约，没有跳转自选预约
        let reservationStatus = this.$global.USERINFO.reservationStatus
        if (reservationStatus !== null && reservationStatus !== 'null') {
          this.$router.push({
            name: 'currentBook'
          })
        } else {
          this.$router.replace({
            name: 'tab_self'
          })
        }
      })
    },
    // 更新用户最后操作时间
    _updateActionTime () {
      // 更新操作时间
      this.$global.LASTACTIONTIME = new Date().getTime()
    },
    // 清楚用户token及用户信息
    _cleanTokenAndUserInfo () {
      this.$global.TOKEN = ''
      this.$global.USERINFO = {}
      this.showTime = true
      this.isLogin = false
      this.showFooter = false
    },
    // 检测是否超时未操作
    _testTime () {
      if (this.$global.TOKEN) {
        // 更新当前时间
        let currentTime = new Date().getTime()
        // 判断是否超时
        let timeOut = 30 * 1000 // 设置超时时间： 30秒
        if (currentTime - this.$global.LASTACTIONTIME > timeOut) {
          console.log('超时未操作,退出')
          this._cleanTokenAndUserInfo()
          this.$router.push({
            name: 'home'
          })
        }
      }
    },
    // 循环检测刷卡
    _monitorSwiper () {
      // setInterval(() => {
      //   console.info('正在检测刷卡。。。')
      //    window.external.readCard()
      // }, 1000)
    },
    // 测试模式 定时登录获取token
    _testLogin () {
      if (!this.$global.TOKEN) { // 未登录状态下执行
        console.info('测试模式，模拟登陆')
        this._login(TESTNAME, TESTNAME)
      }
    },
    _getQRcodePath () {
      getQRcodePath().then(res => {
        console.info('二维码相对路径' + res.data.params.img_path)
        this.imgSrc = LIBSEATWECHATDOMAIN + res.data.params.img_path
      })
    }

  },
  created () {
    this._getUrlCardNo()
  },
  mounted () {
    if (MODEL === 1) { // 测试模式 定时模拟登录获取token
      setInterval(() => { this._testLogin() }, TESTTIMESPACE * 1000)
    }
    this.nowTimes()
    this.interval()
    this.globalClick(this._updateActionTime)
    this._getQRcodePath()
    /* 定时器  间隔1秒检测是否长时间未操作页面  */
    // window.setInterval(this._testTime, 1000)
    // 获取二维码路径
  }
}

</script>
<style>
.time-div {
  margin-right: 150px;
}
.time-p {
  color: #fff;
  font-size: 40px;
  border-bottom: 1px solid #fff;
  opacity: 0.5;
}
.time-span {
  display: inline-block;
  color: #fff;
  font-size: 20px;
  margin-top: -10px;
  margin-left: 5px;
  opacity: 0.7;
}
.erweim {
  position: absolute;
  right: 87px;
  top: 9px;
  width: 87px;
}
.qiandao {
  position: absolute;
  top: 1%;
  right: 2%;
  writing-mode: vertical-rl;
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
}
</style>
