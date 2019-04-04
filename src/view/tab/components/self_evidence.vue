<template>
  <div class="random-body">
    <div class="seat-top">
        <img src="../../../assets/images/success.png" alt="">
        <p class="success-p">座位已选好，请开始使用</p>
    </div>
    <div class='seat-bottom'>
              <div class="list-left">
          <p>
            <Icon type="stop"></Icon>
            <span>凭证 : <i>{{ res.receipt }}</i></span>
          </p>
          <p>
            <Icon type="stop"></Icon>
            <span>日期 : <i>{{ res.onDate }}</i></span>
          </p>
          <p>
            <Icon type="stop"></Icon>
            <span>开始 结束时间 : <i>{{ res.begin + '-' + res.end }}</i></span>
          </p>
      </div>
      <div class='list-right'>
          <p>
            <Icon type="stop"></Icon>
            <span>座位 : <i>{{ res.location }}</i></span>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store.js'
import { mapState } from 'vuex'
export default {
  name: 'self_evidence',
  store,
  data () {
    return {
      isActivated: true,
      isActivated1: false
    }
  },
  computed: {
    ...mapState({
      res: state => state.request
    })

  }
}
</script>

<style lang='less' scoped>
.random-body {
  height: 100%;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.8);
}
.ivu-col {
  text-align: center;
  border-bottom: 2px solid;
  font-size: 30px;
  color: #ccc;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
}

.ivu-icon{
    margin: 0 20px;
    color: #2d8cf0;
    font-size: 15px;
}
.seat-top {
  height: 35%;
  border-bottom: 2px solid #ccc;
  img {
    display: block;
    margin: 20px auto;
  }
  .success-p {
    font-size: 20px;
    text-align: center;
    color: #666;
  }
}
.seat-bottom {
  height: 40%;
  i{
    font-style:normal;
    color: #28a6ff;
  }
}
.list-left p, .list-right p{
  height: 50px;
  margin: 20px auto;
  line-height: 50px;
  font-size: 20px;
}
.list-left p{
  width: 400px;
}
.list-right p{
  width: 800px;
  margin: 20px 717px;
}
</style>
