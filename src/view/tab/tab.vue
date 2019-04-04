<template>
  <Row>
    <router-link to="/tab_random">
      <Col span="6">
        <img src="" alt="" class='random-img'>
        <p>随机派座</p>
      </Col>
    </router-link>
    <router-link to="/tab_self">
      <Col span="6">
        <img src="" alt="" class='self-img'>
        <p>自选座位</p>
      </Col>
    </router-link>
    <router-link to="/tab_usual">
      <Col span="6">
        <img src="" alt="" class='usual-img'>
        <p>常用座位</p>
      </Col>
    </router-link>
    <router-link to="/tab_history">
      <Col span="6">
        <img src="" alt="" class='history-img'>
        <p>预约记录</p>
      </Col>
    </router-link>
  </Row>
</template>

<script>
export default {
  name: 'tab'
}
</script>
<style lang="less" scoped>
  .ivu-col-span-6{
    font-size: 20px;
    color: #ccc;
    height: 60px;
    line-height: 60px;
    background-color: rgba(255, 255, 255, .5);
    border-right: 1px solid #ccc;
    p{
      margin-left: 210px;
    }
  }
  &.router-link-active {
    .ivu-col-span-6 {
      color: #fff;
      box-sizing: border-box;
      box-shadow: 0px 1px 9px 1px	#333;
      background-color: #368fdb;
    }
  }

  .random-img {
    background: url(../../assets/images/random.png) no-repeat
  }
  .self-img{
      background: url(../../assets/images/self.png) no-repeat
    }
     .usual-img{
    background: url(../../assets/images/usual.png) no-repeat
  }
  .history-img{
    background: url(../../assets/images/history.png) no-repeat
  }
  .usual-img, .history-img{
    position: absolute;
    height: 200px;
    width: 200px;
    left: 100px;
    background-size: 65px 65px;
    background-position: 46px -2px;
  }
  .random-img, .self-img{
    position: absolute;
    height: 200px;
    width: 200px;
    left: 100px;
    background-size: 65px 65px;
    background-position: 48px -1px;
  }

</style>
