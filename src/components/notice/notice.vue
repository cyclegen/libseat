<template>
  <div class="notice">
    <h1>通知</h1>
    {{notice}}
  </div>
</template>

<script>
export default {
  name: 'Notice',
  props: [ 'notice' ]
}
</script>

<style lang="less">
.notice {
  color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 10px 10px;
}
</style>
