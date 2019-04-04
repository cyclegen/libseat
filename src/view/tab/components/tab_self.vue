<template>
  <div class="random-body">
    <Row>
      <Col span="12">
        <span :class="{'end-img' : isA, 'end-img1': !isA}">
          选择使用结束时间</span>
      </Col>
      <Col span="12">
        <span :class="{'room-img' : isA, 'room-img1': !isA}">
           选择教室</span>
      </Col>
    </Row>
    <time-class @colorChange='colorChange'></time-class>
  </div>
</template>

<script>
import TimeClass from '@/view/components/time_class/time_class'
export default {
  name: 'tab_self',
  components: {
    TimeClass
  },
  data () {
    return {
      isA: true,
      item: ''
    }
  },
  methods: {
    colorChange: function (isA) {
      this.isA = isA
    }
  },
  // beforeRouteLeave (to, from, next) {
  //   if (to.path === '/roomDetail' && this.isActivated1 === true) {
  //     this.$Message.warning({
  //       render: h => {
  //         return h('h1', [
  //           '请先选择结束时间'
  //         ])
  //       }
  //     })
  //     next(false)
  //   } else {
  //     next()
  //   }
  // },
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
.end-img {
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/end-active.png) no-repeat;
  background-position: 10px 7px;
}
.end-img1 {
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/end.png) no-repeat;
  background-position: 10px 7px;
}

.room-img{
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/room.png) no-repeat;
  background-position: 67px 10px;
}

.room-img1{
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/room-active.png) no-repeat;
  background-position: 67px 10px;
}

</style>
