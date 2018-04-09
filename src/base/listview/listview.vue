<template>
   <scroll :data="data" 
           class="list-view" 
           ref="listview"
           :listenScroll = 'listenScroll'>
     <!-- 传入data是为了方便scroll内部进行监测  -->
    <ul>
      <li v-for="group in data" :key="group.title" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id" >
            <img class="avatar" v-lazy="item.avatar">
            <div class="dec">{{item.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :key="index" :data-index='index'>{{item}} </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const ANCHOR_HEIGHT = 18
// 行高12 padding 2* 3
export default {
  props: {
    data: {
      default: []
    }
  },
  created() {
    this.touch = {}
    // 存储触摸位置信息，不需要observe
    this.listenScroll = true
    this.listHeight = []
  },
  watch: {
    data() {
      setTimeout(() => this._calculateHeight()) 
    }
  },
  computed: {
    shortcutList() {
      console.log(this.data.map((it, index) => it.title.slice(0, 1))) 
      return this.data.map((it, index) => it.title.slice(0, 1))
    }
  },
  components: {
    Scroll,
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)   
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      //苹果touchmove 会触发多次 scroll只会触发依次，安卓相反
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = delta + parseInt(this.anchorIndex)
      this._scrollTo(anchorIndex)   
    },
    _calculateHeight() {
     let height = 0
     
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.list-view
  position: relative
  height: 100%
  width: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    ul
      .list-group-item
        display: flex
        align-items: center
        padding:20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .dec
          margin-left: 20px
          text-align: center
          color: $color-text-l
          font-size: $font-size-medium
  .list-shortcut
    position: absolute 
    right: 0
    top: 50%
    z-index: 30
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radiuus: 10px
    text-align: center 
    background: $background-color-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      $.current
        color: $color-theme

      


</style>