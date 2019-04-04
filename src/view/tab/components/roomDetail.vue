<template>
  <div class="random-body">
    <div class="seat-status">
      <Row>
        <Col span="10">
          <span>{{roomName}}</span>
        </Col>
        <Col span="7">&nbsp;</Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/inuse.png" alt="图片">
          <p>不可选</p>
        </Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/free.png" alt="图片">
          <p>空闲</p>
        </Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/cannt.png" alt="图片">
          <p>不可用</p>
        </Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/freep.png" alt="图片">
          <p>靠窗</p>
        </Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/freew.png" alt="图片">
          <p>充电</p>
        </Col>
        <Col span="1">
          <img src="@/assets/images/seat-images/freewp.png" alt="图片">
          <p>窗户、充电</p>
        </Col>
      </Row>
    </div>
    <div class="seat-layout">
      <div id="targetObj">
        <div v-for="n in rows" :key="n.index">
          <span v-for="seat in seatData" :key="seat.id" @click="handleEvidence(seat.name,seat.id)">
             <span v-if="seat.row==n && seat.status=='FREE' && seat.window==false && seat.power==false">
              <img src="@/assets/images/seat-images/free.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
            <span v-if="seat.row==n && seat.status=='FREE' && seat.window==true && seat.power==false">
              <img src="@/assets/images/seat-images/freew.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
            <span v-if="seat.row==n && seat.status=='FREE' && seat.window==false && seat.power==true">
              <img src="@/assets/images/seat-images/freep.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
            <span v-if="seat.row==n && seat.status=='FREE' && seat.window==true && seat.power==true">
              <img src="@/assets/images/seat-images/freewp.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
            <span v-if="seat.row==n && (seat.status=='IN_USE'  || seat.status=='AWAY' || seat.status=='NOSELECT')">
              <img src="@/assets/images/seat-images/inuse.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
            <span v-if="seat.row==n && seat.status=='BOOKED' || seat.status=='FULL'">
              <img src="@/assets/images/seat-images/cannt.png" alt="图片">
              <i>{{seat.name}}</i>
            </span>
          </span>
        </div>
      </div>
      <Modal title="系统提示" v-model="modal7" :closable="false" :footer-hide="true">
        <p>
          你确定要选择座位
          <b>{{ ' '+ seatName}}</b>？
        </p>
        <Button shape="circle" @click="confirmClick">确定</Button>
        <Button shape="circle" @click="cancelClick">取消</Button>
      </Modal>
    </div>
  </div>
</template>

<script>
import { getRoomSeatLayoutByEndTime, freeBook } from '@/api/libseat'
import store from '../store/store.js'
import { mapState } from 'vuex'
import $ from 'jquery'
import cat from '@/api/cat.js'
export default {
  name: 'roomDetail',
  store,
  data () {
    return {
      roomid: '',
      endTime: '',
      seatData: [],
      seatFlag: false,
      rows: Number,
      cols: Number,
      modal7: false,
      seatName: '',
      seatId: ''
    }
  },
  methods: {
    _getRoomSeatLayoutByEndTime () {
      getRoomSeatLayoutByEndTime(this.roomid, this.endTime, this.$global.TOKEN).then(res => {
        this.$Message.warning({
          render: h => {
            return h('h1', '加载中，请稍候。。。'
            )
          }
        })
        let seatArr = []
        if (res.status === 'success') {
          let list = res.data.layout
          for (let key in list) {
            let seat = list[key]
            // 获取座位的行和列,添加到座位属性中
            let col = parseInt(key) % 1000
            let row = parseInt(key) / 1000
            seat['col'] = parseInt(col)
            seat['row'] = parseInt(row)
            seatArr.push(seat)
          }
          // 获取座位最后一个，用于获取最大行和列
          if (seatArr.length > 0) {
            let seat = seatArr[seatArr.length - 1]
            this.rows = parseInt(seat['row'])
            this.cols = parseInt(seat['col'])
          }
          this.seatData = seatArr
          this.seatFlag = true
        }
      })
    },
    // 自选预约，根据开始结束时间，座位id
    _freeBook () {
      freeBook(this.seatId, this.endTime, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.res = res.data
          this.$store.dispatch('selfBook', this.res)
          this.$Message.warning({
            render: h => {
              return h('h1', '正在预约，请稍候。。。'
              )
            }
          })
          setTimeout(() => {
            this.$router.push({
              name: 'self_evidence'
            }
            )
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
    one () {
      var $targetObj = $('#targetObj')
      // 初始化设置
      cat.touchjs.init($targetObj, function (left, top, scale) {
        $('#left').text(left)
        $('#top').text(top)
        $('#scale').text(scale)
        $targetObj.css({
          left: left,
          top: top,
          '-webkit-transform': 'scale(' + scale + ')'
        })
      })
      // 初始化拖动手势（不需要就注释掉）
      cat.touchjs.drag($targetObj, function (left, top) {
        $('#left').text(left)
        $('#top').text(top)
      })
      // 初始化缩放手势（不需要就注释掉）
      cat.touchjs.scale($targetObj, function (scale) {
        $('#scale').text(scale)
      })
    },
    // 点击座位，弹窗，展示座位名
    handleEvidence (name, id) {
      this.seatName = name
      this.seatId = id
      this.modal7 = true
    },
    // 弹窗关闭，获取凭证
    confirmClick () {
      this.modal7 = false
      this._freeBook()
    },
    // 点击取消关闭弹窗
    cancelClick () {
      this.modal7 = false
    },
    // 获取路由传递的参数
    getQuery () {
      this.roomid = this.$route.query.id
      this.endTime = this.$route.query.eTime
    }
  },
  // 监听路由变化
  watch: {
    '$route': 'getQuery'
  },
  computed: {
    ...mapState({
      roomName: state => state.content
    })

  },

  mounted () {
    this.getQuery()
    this.one()
    this._getRoomSeatLayoutByEndTime()
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang='less' scoped>
.random-body {
  height: 100%;
}
.seat-status {
  height: 10%;
  background-color: rgba(255, 255, 255, 0.3);
  span {
    display: inline-block;
    margin-top: 8px;
    font-size: 40px;
    color: #fff;
    padding: 0 20px;
  }
  img {
    margin-left: 5px;
    height: 60px;
    width: 60px;
  }
  p {
    margin-top: -13px;
    text-align: center;
    font-size: 15px;
    color: #fff;
  }
}
.seat-layout {
  height: 90%;
  background-color: #fff;
  overflow: hidden;
  img {
    height: 30px;
    width: 30px;
  }
}

#targetObj {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fff;
  i {
    position: absolute;
    margin-top: 23px;
    margin-left: -21px;
    font-style: normal;
  }
}

.ivu-btn {
  font-size: 20px;
  padding: 5px 30px;
  margin: 30px 30px 20px 50px;
}
</style>
<style>
.ivu-modal-body {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
.ivu-message .ivu-icon {
  font-size: 30px;
}
</style>
