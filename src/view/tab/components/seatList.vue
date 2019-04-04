<template>
  <div class="random-body1">
    <Table :columns="columns1" :data="historyData">
      </Table>
  </div>
</template>

<script>
import { getRoomByName } from '@/api/libseat'
export default {
  name: 'seatList',
  data () {
    return {
      seatName: '',
      showNum: false,
      columns1: [
        { title: '座位号', key: 'name', align: 'center', width: 600 },
        {
          title: '座位',
          key: 'fullName',
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let status = params.row.status
            let text = ''
            if (status === 'FREE') {
              text = '可预约'
              return h('Button', {
                on: {
                  click: () => {
                    this.$router.push({
                      path: '/endTime',
                      query: {
                        rid: params.row.id
                      }
                    })
                  }
                }
              },
              text)
            }
            if (status === 'IN_USE' || status === 'AWAY' || status === 'NOSELECT') {
              text = '使用中'
              return h('P', text)
            }
          }
        }
      ],
      historyData: []
    }
  },
  methods: {
    _getRoomByName () {
      getRoomByName(this.seatName, this.$global.TOKEN).then(res => {
        if (res.status === true) {
          this.historyData = res.data
        }
      })
    }
  },
  mounted () {
    this.seatName = this.$route.query.name
    this._getRoomByName()
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style scoped>
.random-body1 {
  height: 100%;
  box-shadow: 0.5px 0.5px 5px #333;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
<style lang='less'>
.random-body1 {
  .ivu-table {
    font-size: 20px;
    background-color: rgba(255, 255, 255, .2);
  }
  .ivu-table-row{
    height: 60px;
    td{
      background-color: rgba(255, 255, 255, .2);
  }
  }
  .ivu-table-header{
    height: 60px;
  }
  th{
    height: 60px;
    background-color: rgba(255, 255, 255, .5);
  }

.ivu-table-large{
  font-size: 18px;
  color: #c0c0c0;
}
.ivu-btn{
  font-size: 16px;
  color: #000;
  background-color: rgba(255, 255, 255, .5);
}
}
</style>
