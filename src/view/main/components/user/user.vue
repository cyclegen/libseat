<template>
  <div class="user-avator" v-if="isLogin">
    <img src="../../../../assets/images/avator.png" alt="user_avator">
    <h3>{{this.$global.USERINFO.username}}</h3>
    <button class="back-btn" @click="handleBackClick">
      <Icon type="power"></Icon>&nbsp;
      <span>退出</span>
    </button>
  </div>
</template>

<script>
import './user.less'
const axios = require('axios')
export default {
  name: 'User',
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showTime: true,
      showFooter: false
    }
  },
  methods: {
    _cleanTokenAndUserInfo () {
      this.$global.TOKEN = ''
      this.$global.USERINFO = {}
    },
    handleBackClick () {
      this._cleanTokenAndUserInfo()
      this._canncel()
      this.$emit('showHeader', this.showTime, this.showFooter)
      this.$router.push({
        name: 'home'
      })
    },
    // 根据token判断是否登录
    _isLogin () {
      if (this.$global.TOKEN) {
        this.isLogin = true
      }
    },
    _canncel () {
      axios.get('http://localhost:8888/canncel', {
        params: {
          canncel: true
        }
      }).then((response) => {
        console.log('恢复刷卡程序')
      })
    }
  },
  mounted () {
    this._isLogin()
  }
}
</script>
<style lang='less' scoped>
.back-btn {
  display: inline-block;
  position: relative;
  top: -20px;
  right: 145px;
  border-radius: 32px;
  padding: 2px 20px;
  line-height: 1.5;
  border: none;
  background-color: #ff380e;
  span {
    color: #fff;
    font-size: 16px;
  }
}
.ivu-icon {
  margin-top: 5px;
  color: #fff;
  font-size: 20px;
}
</style>
