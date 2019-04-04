<template>
  <div class="random-body">
    <div class="box-left">
      <p>
        <Icon type="android-time" color="#4296DE" size="30"></Icon>请选择结束时间
      </p>
      <Button
        shape="circle"
        v-for="(item, index) of endTime"
        :key="index"
        @click="handleTimeClick(item)"
      >{{parseInt(item/60)+" : "}}{{(item%60&lt;10)?'0'+item%60:item%60}}</Button>
    </div>
  </div>
</template>

<script>
import { getEndTimesFromNow, freeBook } from '@/api/libseat'
import store from '../store/store.js'
export default {
  name: 'endTime',
  store,
  data () {
    return {
      roomid: '',
      endTime: [],
      Time: ''
    }
  },
  methods: {
    // 获取以当前时间开始所有可用的结束时间
    _getEndTimesFromNow () {
      getEndTimesFromNow(this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.endTime = res.data.endTimes
        }
      })
    },
    _freeBook () {
      freeBook(this.roomid, this.Time, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.res = res.data
          this.$store.dispatch('selfBook', this.res)
          this.$router.push({
            name: 'self_evidence'
          })
        } else {
          this.$Message.warning({
            render: h => {
              return h('h1', res.message
              )
            }
          })
        }
      })
    },

    // 点击时间跳转到凭证页面
    handleTimeClick (item) {
      this.Time = item
      this._freeBook()
    }
  },

  mounted () {
    this.roomid = this.$route.query.rid
    this._getEndTimesFromNow()
  },
  deactivated () {
    this.$destroy()
  }

}
</script>

<style lang="less" scoped>
.random-body {
  height: 100%;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.1);
}

.box-left {
  padding: 100px;
  margin-left: 50px;
  p {
    font-size: 20px;
    margin-left: 150px;
    color: #fff;
  }
}
.ivu-btn {
  font-size: 20px;
  padding: 5px 20px;
  margin: 50px 20px 20px 50px;
}
.current-span {
  color: #28a6ff;
  font-size: 20px;
}
.ivu-icon {
  position: absolute;
  left: 305px;
}
</style>
