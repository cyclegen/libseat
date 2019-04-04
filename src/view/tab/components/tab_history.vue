<template>
  <div class="historyTable">
    <div class='history-left'>
      <img src="../../../assets/images/history-p.jpg" alt="">
    </div>
      <Table :columns="columns1" :data="historyData">
      </Table>
  </div>
</template>

<script>
import { getBookHistory } from '@/api/libseat'
export default {
  name: 'tab_history',
  data () {
    return {
      columns1: [
        { title: '座位', key: 'loc', align: 'center', width: 500 },
        {
          title: ' ',
          key: 'h',
          align: 'right',
          width: 100,
          render: (h, params) => {
            return h('icon', { props: { type: 'android-time', size: 25, color: '#4296DE' } })
          }
        },
        {
          title: '开始/结束时间',
          key: 'date',
          align: 'left',
          render: (h, params) => {
            let seat = params.row
            return h('span', seat.date + '  ' + seat.begin + ' - ' + seat.end)
          }
        },
        {
          title: '暂离/返回时间',
          key: 'awayBegin',
          align: 'center',
          render: (h, params) => {
            let away = params.row
            if (away.awayBegin === null) {
              away.awayBegin = ''
            }
            if (away.awayEnd === null) {
              away.awayEnd = ''
            }
            return h('span', away.awayBegin + ' - ' + away.awayEnd)
          }
        },
        {
          title: '状态',
          key: 'stat',
          align: 'center',
          width: 150,
          render: (h, params) => {
            let status = params.row.stat
            let text = ''
            if (status === 'RESERVE') {
              text = '已预约'
            }
            if (status === 'CANCEL') {
              text = '已取消'
            }
            if (status === 'AWAY') {
              text = '暂时离开'
            }
            if (status === 'CHECK_IN') {
              text = '履约中'
            }
            if (status === 'COMPLETE') {
              text = '已完成'
            }
            if (status === 'INCOMPLETE') {
              text = '早退'
            }
            if (status === 'MISS') {
              text = '失约'
            }
            if (status === 'STOP') {
              text = '已结束'
            }
            return h('span', text)
          }
        }
      ],
      historyData: []
    }
  },
  mounted () {
    getBookHistory(this.$global.TOKEN).then(res => {
      this.historyData = res.data.reservations
    })
  },
  deactivated () {
    this.$destroy()
  }
}
</script>
<style lang='less' scoped>
.historyTable {
  display: flex;
  height: 100%;
}
.history-left{
  flex: 1;
  height: 100%;
  img{
    width: 500px;
    height: 100%;
    box-shadow: 0.5px 0.5px 5px #333;
  }
}
.ivu-table-wrapper{
  width: 1300px;
  margin-left: 20px;
  box-shadow: 0.5px 0.5px 5px #333;
}

</style>
<style lang='less'>
.historyTable {
.ivu-table {
  font-size: 20px;
  background-color: rgba(255, 255, 255, .3);
  }
  .ivu-table-row{
    height: 60px;
    td{
      background-color: rgba(255, 255, 255, .3);
  }
  }
  .ivu-table-header{
    height: 60px;
  }
  th{
    height: 60px;
    background-color: rgba(255, 255, 255, .5)
  }
  .ivu-page{
    position: absolute;
    top: 78%;
    left: 65%;
  }
  .ivu-page-prev, .ivu-page-next{
    height: 50px;
    width: 50px;
    line-height: 50px;
    background-color: rgba(255, 255, 255, .3)
  }
  .ivu-page-item{
    height: 50px;
    width: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .3)
  }
}

</style>
