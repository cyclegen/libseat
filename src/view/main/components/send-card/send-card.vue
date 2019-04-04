<!--刷卡焦点组件，隐藏域获取到卡号时将卡号发送给electron 浏览器框架-->
<template>
  <div>
    <input class="hide" v-model="cardNo" id="cardNo" />
  </div>
</template>
<script>
const axios = require('axios')
export default {
  name: 'SendCardNo',
  data () {
    return {
      cardNo: ''
    }
  },
  props: {
    focus: true
  },
  methods: {
    _focus () {
      var di = document.getElementById('cardNo')
      setInterval(function () {
        if (this.focus) {
          di.focus()
        } else {
          di.blur()
        }
      }, 500)
    },
    _sendCard (varl) {
      axios.get('http://127.0.0.1:8888/sendCardNo', {
        params: {
          cardNo: varl
        }
      }).then((response) => {
        console.log('向electron发送学号成功')
        this.cardNo = ''
      })
    }
  },
  mounted () {
    this._focus()
  },
  watch: {
    cardNo: function (varl) {
      if (varl !== '') {
        this._sendCard(varl)
      }
    }
  }
}
</script>

<style scoped>
  .hide{width: 20px;position: absolute;margin-left: 94%;margin-top: 3%;z-index:-1}
</style>
