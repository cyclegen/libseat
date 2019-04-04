<template>
  <div class="random-body">
    <Row>
      <Col span="12" >
        <span :class="{'end-img' : isA, 'end-img1': !isA}">
          选择所需时长</span>
      </Col>
      <Col span="12">
        <span :class="{'evidence-img' : isA, 'evidence-img1': !isA}">
          座位凭证</span>
      </Col>
    </Row>
    <div class="timesDiv">
      <div class="text">
        <p>
          <Icon type="android-time" color="#4296DE" size="30"></Icon>
          <span>请选择需要的时长</span>
        </p>
      </div>
      <div class='time-btns'>
        <Button
          shape="circle"
          v-for="index in maxHours"
          :key="index"
          @click="instance(index)"
        >需要{{checkTime(index)}}小时</Button>
      </div>
      <Modal title="系统提示" v-model="modal7" :closable="false" :footer-hide="true">
        <b>
          正在为您派座，请稍等...
        </b>
      </Modal>
    </div>
  </div>
</template>

<script>
import { getAllowedHours, quickBook } from '@/api/libseat'
import store from '../store/store.js'
export default {
  name: 'tab_random',
  store,
  data () {
    return {
      maxHours: 0,
      hours: '',
      isA: true,
      modal7: false
    }
  },
  methods: {
    // 获取允许预约的最大小时
    _getAllowedHours () {
      getAllowedHours(this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.maxHours = res.data.hours
        }
      })
    },
    // 获取随机座位
    _quickBook () {
      quickBook(this.hours, BUILDINGID, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.modal7 = true
          let res1 = res.data.reservation
          this.$store.dispatch('Book', res1)
          this.isA = false
          setTimeout(() => {
            this.$Modal.remove()
            this.$router.push({
              name: 'random_evidence',
              query: {
                type: 0 // 区分随机派坐还是续约，1为续约，0为随机派坐
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
    },
    checkTime (time) {
      if (time < 10) {
        time = ' ' + time + ' '
      }
      return time
    },
    // 点击时间处理
    instance (index) {
      this.hours = index
      this._quickBook()
    }
  },
  mounted () {
    this._getAllowedHours()
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang='less' scoped>
.random-body {
  height: 100%;
  color: #adadad;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.1);
  .text {
    margin-top: 30px;
    margin-left: 50px;
    font-size: 23px;
    span {
      margin-left: 10px;
    }
  }
}
.time-btns{
  margin-left: 50px;
  margin-top: 50px;
}
.ivu-row{
background-color: rgba(0, 0, 0, 0.6);
box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.14);
}

.ivu-col {
  text-align: center;
  font-size: 30px;
  color: #ccc;
  height: 80px;
  line-height: 80px;
}
.timesDiv {
  padding: 50px 100px;
  p {
    margin-left: 40px;
  }
}
.ivu-btn {
  margin: 20px 20px 20px 50px;
  font-size: 20px;
  color: #adadad;
  background-color: #fff;
}
.end-img {
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/end-active.png) no-repeat;
  background-position: 35px 7px;
}
.evidence-img{
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/evidence.png) no-repeat;
  background-position: 80px 14px;
}
.ivu-icon {
  position: absolute;
  top: 258px;
  left: 200px;
}

 .end-img1 {
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/end.png) no-repeat;
  background-position: 35px 7px;
}
.evidence-img1{
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/evidence-active.png) no-repeat;
  background-position: 80px 14px;
}

</style>
<style lang='less'>
  .ivu-modal{
    top: 370px;
  }

    .ivu-modal-header-inner{
      font-size: 20px;
    }
    .ivu-modal-body{
      font-size: 20px;
      line-height: 5;
    }
// .ivu-btn-primary {
//   display: none;
// }
</style>
