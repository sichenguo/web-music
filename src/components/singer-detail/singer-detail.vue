<template>
  <transition name="trans" >
    <div class="singer-detail">singer-detail</div>
  </transition>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
export default{}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.singer-detail
  position: fixed 
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 100
  background: $color-background
  &.trans-enter-active,.trans-leave-active
    transition: all .3s
  &.trans-enter, .trasn-leave-to
    transform: translate3d(100%, 0, 0)


</style>