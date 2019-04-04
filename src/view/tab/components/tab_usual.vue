<template>
  <div class='random-body'>
    <Row>
        <Col span="12">
          <span  @click="toggleTab('select1'); isA=!isA,isA=true? true:false" :class="{'usual-img': isA, 'usual-img1': !isA}">
            选择常用座位</span>
        </Col>
        <Col span='12'>
          <span  @click="toggleTab('select2'); isA=!isA,isA=false? true:false" :class="{'search-img': isA, 'search-img1': !isA}">
            按座位号搜索</span>
        </Col>
    </Row>
    <keep-alive>
      <select1 :is="currentTab"></select1>
    </keep-alive>
  </div>
</template>

<script>
import select1 from './selectUsual'
import select2 from './seatSearch'
export default {
  name: 'tab_usual',
  data () {
    return {
      currentTab: 'select1',
      isA: true
    }
  },
  components: {
    select1,
    select2
  },
  methods: {
    toggleTab (tab) {
      this.currentTab = tab
    }
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang='less' scoped>
.random-body{
  height: 95%;
  img{
    display: inline-block;
    height: 200px;
    width: 200px;
  }
}
.ivu-row{
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 3px 4px 5px 0px rgba(0, 0, 0, 0.14);
}

.ivu-col{
  text-align: center;
  font-size: 30px;
  color: #ccc;
  height: 80px;
  line-height: 80px;
}

.usual-img {
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/fav-active.png) no-repeat;
  background-position: 45px 13px;
}

 .usual-img1 {
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/fav.png) no-repeat;
  background-position: 45px 13px;
}

.search-img{
  display: inline-block;
  color: #fff;
  width: 400px;
  background: url(../../../assets/images/search.png) no-repeat;
  background-position: 48px 17px;
}

.search-img1{
  display: inline-block;
  color: #2d8cf0;
  width: 400px;
  background: url(../../../assets/images/search-active.png) no-repeat;
  background-position: 48px 17px;
}
</style>
