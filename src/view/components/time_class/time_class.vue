<template>
  <div style="height: 90%" class="box">
    <div class="box-left">
      <p>
        <Icon type="android-time" color="#4296DE" size="30"></Icon>当前时间
        <span class="current-span">{{ nowTime }}</span>，请选择结束时间
      </p>
      <div class="time-btns">
        <Button
          shape="circle"
          v-for="(item, index) of endTime"
          :key="index"
          :class="{ 'active': index == active }"
          @click="handleTimeClick(item, index)"
        >{{parseInt(item/60)+" : "}}{{(item%60&lt;10)?'0'+item%60:item%60}}</Button>
      </div>
    </div>
    <div :class="{'box-right' : isShow, 'box-right1': !isShow}" v-if="roomFlag">
      <Carousel
        v-model="value3"
        :autoplay="setting.autoplay"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
      >
        <CarouselItem v-for="(page, index) of pages" :key="index">
          <div class="demo-carousel">
            <Row :gutter="30" style="margin-left:20px">
              <Col span="6" offset="1" v-for="room of page" :key="room.id">
                <Card
                  style="width:200px;margin:10px;height:120px"
                  v-if="room.free/room.seatTotal>0.5"
                  class="card-content"
                >
                  <div style="text-align:center" @click="selectRoom(room.name, room.id)">
                    <h3>
                      <p class="title-p">{{ room.name }}</p>
                    </h3>
                    <span class="unuse">{{ room.free }}</span>
                    <p class="canuse">当前可用座位数</p>
                  </div>
                </Card>
                <Card
                  style="width:200px;margin:10px;height:120px"
                  v-if="room.free/room.seatTotal>0.2 && room.free/room.seatTotal<0.8"
                  class="card-content1"
                >
                  <div style="text-align:center" @click="selectRoom(room.name, room.id)">
                    <h3>
                      <p class="title-p">{{ room.name }}</p>
                    </h3>
                    <span class="unuse">{{ room.free }}</span>
                    <p class="canuse">当前可用座位数</p>
                  </div>
                </Card>
                <Card
                  style="width:200px;margin:10px;height:120px"
                  v-if="room.free/room.seatTotal<0.2"
                  class="card-content2"
                >
                  <div style="text-align:center" @click="selectRoom(room.name, room.id)">
                    <h3>
                      <p class="title-p">{{ room.name }}</p>
                    </h3>
                    <span class="unuse">{{ room.free }}</span>
                    <p class="canuse">当前可用座位数</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
import store from '@/view/tab/store/store.js'
import { getEndTimesFromNow, getRoomsByTime } from '@/api/libseat'
export default {
  name: 'time_class',
  store,
  data () {
    return {
      active: Number,
      nowTime: '',
      timeInterval: null,
      endTime: [],
      Time: '',
      isA: false,
      isTrue: false,
      isShow: true,
      value3: 0,
      setting: {
        autoplay: false,
        dots: 'outside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'always'
      },
      roomsData: [],
      roomFlag: false
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

    // 根据开始结束时间获取教室列表
    _getRoomsByTime (startTime, endTime) {
      getRoomsByTime(startTime, endTime, this.$global.TOKEN).then(res => {
        if (res.status === 'success') {
          this.roomsData = res.data
          this.roomFlag = true
        }
      })
    },
    // 点击时间跳转,高亮
    handleTimeClick (item, index) {
      this.active = index
      this.Time = item
      this.isTrue = true
      this.isShow = false
      this.$emit('colorChange', this.isA)
      this._getRoomsByTime(-1, item)
    },
    // 获取时间
    checkTime (time) {
      if (time < 10) {
        time = '0' + time
      }
      return time
    },
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
      this.formatDate(new Date())
    },
    interval () {
      this.timeInterval = setInterval(() => {
        this.nowTimes()
      }, 30 * 1000)
    },
    // 点击跳转详情页面
    selectRoom (rName, rId) {
      this.$store.dispatch('clickRoom', rName)
      this.$router.push({
        name: 'roomDetail',
        query: {
          id: rId,
          eTime: this.Time
        }
      })
    }
  },

  mounted () {
    this._getEndTimesFromNow()
    this._getRoomsByTime(-1, this.endTime[0])
    this.nowTimes()
    this.interval()
  },
  // 分页逻辑
  computed: {
    pages () {
      const pages = []
      this.roomsData.forEach((room, i) => {
        const page = Math.floor(i / 12)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(room)
      })
      return pages
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
}
.box-right {
  flex: 1;
  padding-top: 80px;
  pointer-events: none;
}
.box-right1 {
  flex: 1;
  padding-top: 80px;
}
.box-left {
  flex: 1;
  p {
    font-size: 20px;
    margin-top: 80px;
    text-align: center;
  }
  .time-btns {
    padding: 20px;
  }
}
.ivu-btn {
  font-size: 20px;
  padding: 5px 20px;
  margin: 25px 20px 20px 50px;
}

.title-p {
  height: 45px;
  width: 170px;
  font-size: 16px;
}
.unuse {
  color: #28a6ff;
}
.canuse {
  margin-top: 10px;
}
.current-span {
  color: #28a6ff;
  font-size: 20px;
}
.ivu-icon {
  position: absolute;
  margin-top: 1px;
  margin-left: -40px;
}
.active {
  background-color: #28a6ff;
  color: #fff;
}

.card-content {
  border-bottom: 3px solid green;
}
.card-content1 {
  border-bottom: 3px solid orange;
}
.card-content2 {
  border-bottom: 3px solid red;
}
</style>
<style lang='less'>
.box-right,
.box-right1 {
  .ivu-carousel {
    margin-left: 9%;
  }
  .ivu-carousel-list {
    margin-left: -5.5%;
  }
}
.box-right {
  .ivu-card {
    background-color: rgba(255, 255, 255, 0.2);
    color: #000;
  }
}
.box-right1 {
  .ivu-card {
    background-color: rgba(255, 255, 255, 0.8);
    color: #000;
  }
}
</style>
