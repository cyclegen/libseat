<template>
  <div class="home">
    <div class="left-b">
      <Carousel
        v-if="roomsFlag"
        v-model="value3"
        :autoplay="setting.autoplay"
        :dots="setting.dots"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
        class="rooms"
      >
        <CarouselItem v-for="(page, index) of pages" :key="index">
          <div class="demo-carousel" @click="handleRoomClick">
            <i-col span="6" v-for="room in page" :key="room.index">
              <Card shadow v-if='room.inUse/room.totalSeats<0.5' class="room-content progress">
                <p class="title_p">{{ room.room }}</p>
                <span>已用:{{room.inUse}}</span>
                &nbsp;&nbsp;
                <span>剩余:{{room.free}}</span>
              </Card>
              <Card shadow v-if='room.inUse/room.totalSeats>0.5 && room.inUse/totalSeats<0.8' class="room-content progress1">
                <p class="title_p">{{ room.room }}</p>
                <span>已用:{{room.inUse}}</span>
                &nbsp;&nbsp;
                <span>剩余:{{room.free}}</span>
              </Card>
              <Card shadow v-if='room.inUse/room.totalSeats>0.8' class="room-content progress2">
                <p class="title_p">{{ room.room }}</p>
                <span>已用:{{room.inUse}}</span>
                &nbsp;&nbsp;
                <span>剩余:{{room.free}}</span>
              </Card>
            </i-col>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!-- 通知栏 -->
    <div class="right-b">
      <notice v-if="noticeFlag" :notice="noticeData"></notice>
    </div>
    <Modal
      title="提示"
      v-model="loginTips"
      class-name="vertical-center-modal"
      :styles="{top: '400px'}"
    >
      <h3>请在屏幕下方刷卡区域刷卡登陆后操作!</h3>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Notice from '_c/notice'
import { getAnnounce, getRoomStatus } from '@/api/libseat'
import { setTimeout } from 'timers'
export default {
  name: 'home',
  components: {
    Notice
  },
  data () {
    return {
      value3: 0,
      setting: {
        autoplay: false,
        dots: 'outside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'always'
      },
      roomsData: [],
      roomsFlag: false,
      noticeData: '',
      noticeFlag: false,
      loginTips: false,
      tipsTitle: '',
      content: ''
    }
  },
  methods: {
    // 点击教室
    handleRoomClick () {
      if (this.$global.TOKEN) {
        this.$router.push({
          name: 'tab_random'
        })
      } else {
        // 弹出刷卡登录提示框，三秒后关闭弹窗
        this.loginTips = true
        setTimeout(() => {
          this.loginTips = false
        }, 5000)
      }
    },
    // 获取教室状态及座位使用情况
    _getRoomStatus () {
      getRoomStatus(BUILDINGID).then(res => {
        if (res.status === 'success') {
          this.roomsData = res.data
          this.roomsFlag = true
        }
      })
    },
    // 获取公告
    _getAnnounce () {
      getAnnounce().then(res => {
        if (res.status === 'success') {
          this.noticeData = res.data.announce
          this.noticeFlag = true
        }
      })
    }

  },
  computed: {
    pages () {
      const pages = []
      this.roomsData.forEach((room, i) => {
        const page = Math.floor(i / 9)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(room)
      })
      return pages
    }
  },
  mounted () {
    this._getRoomStatus()
    this._getAnnounce()
    // 首页教室数据刷新
    setInterval(() => { this._getRoomStatus() }, HOMEDATAREFRESH * 1000)
  },
  deactivated () {
    this.$destroy()
  }
}

</script>

<style lang="less">
.ivu-carousel-arrow {
  height: 100px;
  width: 100px;
  font-size: 2rem;
  margin-left: -10%;
}

.home {
  box-shadow: 0.5px 0.5px 20px #333;
  background-color: rgba(255, 255, 255, 0.1);
  height: 100%;
}
.left-b {
  margin-top: 8%;
  width: 68%;
  float: left;
}
.right-b {
  margin-top: 6%;
  padding: 10px;
  float: left;
  width: 30%;
  height: 80%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
}
.rooms p {
  margin-bottom: 60px;
}
.rooms .ivu-col {
  margin-left: 30px;
  margin-bottom: 30px;
}
.title_p {
  height: 40px;
  width: 190px;
  margin-left: 30px;
  text-align: center;
}
.ivu-carousel {
  margin-left: 10%;
}
.ivu-carousel-list {
  margin-left: 2%;
}

// 刷卡提示框样式
.vertical-center-modal {
  .ivu-modal-header {
    border-bottom: unset;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    .ivu-modal-header-inner {
      color: #000;
      font-size: 16px;
    }
  }
  .ivu-modal-body {
    padding: 0px 20px;
    height: 120px;
    line-height: 100px;
    font-size: 15px;
    color: #000;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .ivu-modal-footer {
    border-top: unset;
    padding: unset;
    height: 0px;
  }
}
.room-content {
  height: 200px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding-top: 30px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  span {
    margin-left: 10px;
  }
}
.progress {
  border-bottom: 5px solid green;
}
.progress1 {
  border-bottom: 5px solid orange;
}
.progress2 {
  border-bottom: 5px solid red;
}
</style>
