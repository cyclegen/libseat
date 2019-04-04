<template>
  <Row>
    <Col span="6" @click.native="handleRandomClick">随机派座</Col>
    <Col span="6">自选座位</Col>
    <Col span="6">常用座位</Col>
    <Col span="6">预约历史</Col>
  </Row>
</template>

<script>
export default {
  name: 'footer',
  methods: {
    handleRandomClick () {
      this.$router.push({
        name: 'tab_random'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .ivu-row{
    margin-top: 800px;
  }
  .ivu-col-span-6{
    border: 1px solid;
    font-size: 20px;
    text-align: center;
    color: #ccc;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
  }
</style>
