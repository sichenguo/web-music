<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive> 
      <!-- 在路由切换的时候不会重复渲染view -->
      <router-view/>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header.vue'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style  scoped lang="stylus"  rel="stylesheet/stylus">

</style>
