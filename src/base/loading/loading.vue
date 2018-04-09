<template>
  <div>
    <img src="./loading.gif" width="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
export default {
  props: {
    title: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
  
  .loading
    width: 100%
    text-align: center 
    .desc
      text-align: center 
      font-size: $font-size-small
      color: $color-theme-d
</style>