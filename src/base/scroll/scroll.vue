<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll:{
        // 是否组件监听scroll事件 
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default:null
      },
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
        // this.refresh()
        }, 20)
    },
    methods: {
      _initScroll() {
        if(this.$refs.wrapper) {
          this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: this.click
          }) 
        }
        if(this.listenScroll) {
          let me = this
          debugger
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        // console.log('执行了更新')
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this, arguments)
        // this 指的是vm this.scroll 指的是bscroll
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        // 需要绑定this scrollToElement是bscroll 内部封装好的方法。
      }
    },
    watch: {
      data(){
        setTimeout(() => {
        // console.log('数据更新了')
          this.refresh()
        },20) 
      }
    }


    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>