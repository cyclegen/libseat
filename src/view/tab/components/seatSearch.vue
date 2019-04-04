<template>
  <div class='random-body'>
      <Input type='text' style='width: 30%;' v-model="inputValue" disabled clearable placeholder="请在下方输入座位号" />
      <div class='btn-box'>
          <Button @click="submit">1</Button>
          <Button @click="submit">2</Button>
          <Button @click="submit">3</Button>
          <br>
          <Button @click="submit">4</Button>
          <Button @click="submit">5</Button>
          <Button @click="submit">6</Button>
          <br>
          <Button @click="submit">7</Button>
          <Button @click="submit">8</Button>
          <Button @click="submit">9</Button>
          <br>
          <Button @click="submit">0</Button>
          <Button class="delete-btn" @click="deleteBtn">删除</Button>
          <div class="confirm">
            <button type='button' class="confirm-btn" @click="confirmBtn()">确认</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'select1',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    submit: function (event) {
      this.inputValue += event.target.innerText.trim()
    },
    deleteBtn () {
      this.inputValue = this.inputValue.slice(0, this.inputValue.length - 1)
    },
    confirmBtn () {
      if (this.inputValue === '') {
        this.$Message.warning({
          render: h => {
            return h('h1', [
              '请输入座位号后搜索'
            ])
          }
        })
        return
      }
      this.$router.push({
        path: '/seatList',
        query: {
          name: this.inputValue
        }

      })
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.random-body{
  height: 100%;
  color: #adadad;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.1);
}
.ivu-col{
  text-align: center;
  border-bottom: 2px solid;
  font-size: 30px;
  color: #ccc;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
}
.btn-box{
  width: 30%;
  margin-left: 40%;
}
.ivu-btn{
  margin: 10px;
  height: 15%;
  width: 15%;
  font-size: 30px;
  padding: 20px;
}
.delete-btn{
  width: 34%;
  background-color:#ff9900;
  color: #fff;
  border:none;
}
.confirm-btn{
  position: absolute;
  left: 57%;
  top: 409px;
  display: inline-block;
  width: 100px;
  height: 410px;
  font-size: 30px;
  text-align: center;
  color: #fff;
  background-color: #28a6ff;
  border:1px solid rgba(255, 255, 255, .8);
  border-radius: 4px;
  box-sizing: border-box;
  border:none;
}
</style>
<style lang='less'>
  .ivu-input{
    height: 60px;
    font-size: 30px;
    margin: 15% 120%;
    padding-left: 25px;
  }
  .random-body{
    .ivu-input-icon{
      font-size: 45px;
      text-align: center;
      color: #80848f;
      position: absolute;
      right: -116%;
      top: 44%;
      z-index: 3;
    }
  }
</style>
