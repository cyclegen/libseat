<template>
  <div class="header-bar">
    <div class="header-logo">
      <img src="../../../../assets/images/logo.png">
      <span class='header-shu'></span>
      <span class='header-title'>座位预约系统</span>
    </div>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import './header-bar.less'
export default {
  name: 'HeaderBar'
}
</script>
