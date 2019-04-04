<template>
  <div class="box">
    <p>
      <Icon type="android-time" color="#4296DE" size="30"></Icon>当前时间
      <span class="current-span">{{nowTime}}</span>，请选择结束时间
    </p>
    <Button
      shape="circle"
      v-for="(item, index) of endTimes"
      :key="index"
      @click="_extendTime(item.id)"
    >{{item.value}}</Button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { extend } from '@/api/libseat'
import store from '@/view/tab/store/store.js'
export default {
  name: 'extendTimes',
  store,
  data () {
    return {
      nowTime: '',
      timeInterval: null
    }
  },
  methods: {
    // 获取时间
    checkTime (time) {
      if (time < 10) {
        time = '0' + time
      }
      return time
    },
    // 日期格式化
    formatDate: function () {
      let date = new Date()
      //  let year = date.getFullYear()
      //  let month = date.getMonth() + 1
      // let day = date.getDate()
      let hours = this.checkTime(date.getHours())
      let minutes = this.checkTime(date.getMinutes())
      //  let seconds = date.getSeconds
      this.nowTime = '' + hours + ' ' + ':' + ' ' + minutes
    },
    // 获取当前时间
    nowTimes () {
      this.formatDate()
    },
    interval () {
      this.timeInterval = setInterval(() => {
        this.nowTimes()
      }, 30 * 1000)
    },
    // 点击时间续约
    _extendTime (endTime) {
      extend(endTime, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          const content = '<h1>正在为您续约...</h1>'
          this.$Modal.info({
            content: content
          })
          this.$store.dispatch('Book', res.data.reservation)
          setTimeout(() => {
            this.isActivated1 = false
            this.isActivated = true
            this.$Modal.remove()
            this.$router.push({
              name: 'random_evidence',
              query: {
                type: 1 // 区分随机派坐还是续约，1为续约，0为随机派坐
              } })
          }, 3000)
        } else {
          this.$Message.warning({
            render: h => {
              return h('h1', res.message
              )
            }
          })
        }
      })
    }
  },
  mounted () {
    this.nowTimes()
    this.interval()
  },
  computed: {
    ...mapState({
      endTimes: state => state.extendTimes
    })

  }
}
</script>
<style lang="less" scoped>
.box {
  box-shadow: 0.5px 0.5px 20px #333;
  background-color: rgba(255, 255, 255, 0.1);
  height: 100%;
  padding: 5% 8%;
  p {
    font-size: 20px;
    margin-left: 150px;
    color: #ffffff;
  }
}
.current-span {
  color: #28a6ff;
  font-size: 20px;
}
.ivu-icon {
  position: absolute;
  left: 305px;
}
.ivu-btn {
  font-size: 20px;
  padding: 5px 20px;
  margin: 50px 20px 20px 50px;
}
</style>
/**弹窗样式 */
<style>
.ivu-modal-confirm-body {
  padding-left: 100px;
}
.ivu-modal-confirm-body-icon {
  top: 10px;
  left: 50px;
}
.ivu-btn-primary {
  display: none;
}
</style>
