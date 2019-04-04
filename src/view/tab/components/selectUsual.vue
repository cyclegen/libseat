<template>
  <div class='random-body'>
          <div class='usual-div' v-for="(item, index) of historyData" :key="index" @click="handleFavClick(item.id)">
            <p>座位号：<span>{{item.name}}</span></p>
            <p>座位：<span>{{item.fullName}}</span></p>
          </div>
  </div>
</template>

<script>
import { getFavSeats } from '@/api/libseat'
export default {
  name: 'select2',
  data () {
    return {
      historyData: []
    }
  },
  methods: {
    _getFavSeats () {
      getFavSeats(this.$global.TOKEN).then(res => {
        if (res.status === true) {
          this.historyData = res.data
        }
      })
    },
    handleFavClick (id) {
      this.$router.push({
        name: 'endTime',
        query: {
          rid: id
        }
      })
    }
  },
  mounted () {
    this._getFavSeats()
  }
}
</script>

<style lang='less' scoped>
.random-body{
  display: flex;
  height: 100%;
  color: #adadad;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.1);
  .usual-div{
    margin: 200px 50px 200px 40px;
    height: 250px;
    width: 280px;
    padding: 20px;
    border-radius: 5px;
    color: #adadad;
    box-shadow: 0.5px 0.5px 5px #333;
    background-color: rgba(255, 255, 255, 0.4);
    p{
      color: #fff;
      font-size: 20px;
      margin-top: 40px;
      span{
        color: #000000
      }
    }
  }

}

</style>
