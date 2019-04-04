<template>
  <div class="book_content">
    <div class="book_top">
      <Icon type="android-person" size="40" color="#fff"></Icon>
      <span>您的当前预约</span>
    </div>
    <div class="book_left">
      <p>凭证号 : {{currentBook.receipt}}</p>
      <p>日期 : {{currentBook.onDate}}</p>
      <p>开始-结束时间 : {{currentBook.begin}}-{{currentBook.end}}</p>
      <p>座位 : {{currentBook.location}}</p>
    </div>
    <div class="book_right">
      <button v-if="currentBook.status=='RESERVE'" @click="_checkIn">
        <Icon type="android-create" size="40"></Icon>签到
      </button>
      <button v-if="currentBook.status=='RESERVE'" @click="_cancel">取消预约</button>
      <button v-if="currentBook.status=='CHECK_IN'" @click="_leave">暂离</button>
      <button v-if="currentBook.status=='CHECK_IN'" @click="_extend">续约座位</button>
      <button v-if="currentBook.status=='AWAY'" @click="_checkIn">暂离返回</button>
      <button
        v-if="currentBook.status=='CHECK_IN' || currentBook.status=='AWAY'"
        @click="_stop"
      >结束使用</button>
    </div>
  </div>
</template>

<script>
import { checkIn, leave, stop, cancel, getUserBook, timeExtend } from '@/api/libseat'
export default {
  name: 'currentBook',
  data () {
    return {
      currentBook: {}
    }
  },
  methods: {
    // 取消预约
    _cancel () {
      cancel(this.$global.USERBOOK.id, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this._getUserBook()
          this._alertTips(1, '操作成功')
          setTimeout(() => { // 3秒后跳转页面
            this.$router.push({
              name: 'tab_self'
            })
          }, 3000)
        } else {
          this._alertTips(2, res.message)
        }
      })
    },
    // 签到
    _checkIn () {
      checkIn(this.$global.USERBOOK.id, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this._getUserBook()
          this._alertTips(1, res.message)
        } else {
          this._alertTips(2, res.message)
        }
      })
    },
    // 暂离
    _leave () {
      leave(this.$global.USERBOOK.id, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this._getUserBook()
          this._alertTips(1, res.message)
        } else {
          this._alertTips(2, res.message)
        }
      })
    },
    // 停止使用
    _stop () {
      stop(this.$global.USERBOOK.id, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this._getUserBook()
          this._alertTips(1, '操作成功')
          setTimeout(() => { // 3秒后跳转页面
            this.$router.push({
              name: 'tab_self'
            })
          }, 3000)
        } else {
          this._alertTips(2, res.message)
        }
      })
    },
    // 续约
    _extend () {
      timeExtend(this.$global.USERBOOK.id, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.$store.dispatch('extendTimes', res.data.endTimes)
          this.$router.push({
            name: 'extendTimes'
          })
        } else {
          this._alertTips(2, res.message)
        }
      })
    },
    // 通用弹窗
    _alertTips (type, content) {
      if (type === 1) { // 成功提示
        this.$Message.success({
          render: h => {
            return h('h1', content
            )
          },
          duration: 3
        })
      } else if (type === 2) { // 错误提示
        this.$Message.warning({
          render: h => {
            return h('h1', content
            )
          },
          duration: 3
        })
      }
    },
    // 获取用户当前预约
    _getUserBook () {
      getUserBook(this.$global.TOKEN).then(res => {
        if (res.data != null) {
          this.$global.USERBOOK = res.data[0]
          this.currentBook = this.$global.USERBOOK
        } else {
          this.$global.USERBOOK = {}
        }
      })
    }
  },
  mounted () {
    this._getUserBook()
  },
  deactivated () {
    this.$destroy()
  }
}
</script>
<style lang="less" scoped>
.book_content {
  height: 100%;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5% 8%;

  .book_top {
    font-size: 25px;
    color: #fff;
    font-weight: 600;
    span {
      margin-left: 30px;
    }
  }

  .book_left {
    float: left;
    p {
      height: 50px;
      margin-top: 50px;
      font-size: 25px;
      color: #fff;
      font-weight: 500;
    }
  }
  .book_right {
    float: right;
    button {
      display: block;
      height: 80px;
      width: 250px;
      margin-top: 50px;
      font-size: 25px;
      letter-spacing: 10px;
      color: #fff;
      border: none;
    }
    :nth-child(1) {
      background-color: #28a1f1;
    }
    :nth-child(2) {
      background-color: #e68038;
    }
    :nth-child(3) {
      background-color: #08609e;
    }
    :nth-child(4) {
      background-color: #12b96c;
    }
  }
}
</style>
<style>
.ivu-message .ivu-icon {
  font-size: 30px;
}
</style>
