<template>
  <scroll :data="data" 
          class="list-view" 
          ref="listview"
          :listenScroll = 'listenScroll'
          :probeType = 'probeType'
          @scroll="scroll"
  >
     <!-- 传入data是为了方便scroll内部进行监测  -->
    <ul>
      <li v-for="group in data" :key="group.title" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.id"  @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <div class="dec">{{item.name}}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" 
            class="item" :key="index" 
            :data-index='index'
            :class="{'current': currentIndex === index}"
        > {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed"  ref="fixed" v-show="fixedTitle" >
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <loading class="loading" v-show = "!data.length"></loading>
  </scroll>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import Loading from 'base/loading/loading.vue'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
// 行高12 padding 2* 3
export default {
	props: {
		data: {
      default: [],
		},
	},
	created() {
		this.probeType = 3
		this.touch = {}
		// 存储触摸位置信息，不需要observe
		this.listenScroll = true
		this.listHeight = []
	},
	data() {
		return {
			scrollY: -1,
      currentIndex: 0,
      diff: -1,
		}
	},
	watch: {
		data() {
			setTimeout(() => this._calculateHeight(), 20)
		},
		scrollY(newY) {
			const listHeight = this.listHeight
			const listLength = this.listHeight.length
			if (newY > 0) {
				this.currentIndex = 0
				return
			} else if (-newY > listHeight[listLength]) {
				this.currentIndex = listLength - 1
				return
			} else {
				for (let i = 0; i < listLength; i++) {
					let currHeight = listHeight[i]
					let nextHeight = listHeight[i + 1]
					if (!nextHeight || (-newY >= currHeight && -newY < nextHeight)) {
            this.currentIndex = i
            // debugger
            this.diff = newY + nextHeight
            // 用来判定相对位置 当前按页面的位置以及是否需要动画效果
						return
					}
				}
			}
    },
    diff(newVal) {
      let fixedTop = (newVal >= 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      // top : fixedTop
      if(this.fixedTop === fixedTop) {
        return 
      }
      this.fixedTop === fixedTop
      // debugger
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
	},
	computed: {
		shortcutList() {
			console.log(this.data.map((it, index) => it.title.slice(0, 1)))
			return this.data.map((it, index) => it.title.slice(0, 1))
    },
    fixedTitle() {
      if(this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    },
	},
	components: {
    Scroll,
    Loading
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
			//苹果touchmove 会触发多次 scroll只会触发一次，安卓相反
			this.touch.y2 = firstTouch.pageY
			let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
			let anchorIndex = delta + parseInt(this.anchorIndex)
			this._scrollTo(anchorIndex)
		},
		scroll(pos) {
			// console.log(pos)
			this.scrollY = pos.y
    },
    selectItem(item) {
      // debugger
      this.$emit('select', item)
    },
		_calculateHeight() {
			this.listHeight = []
			const list = this.$refs.listGroup
			let height = 0
			this.listHeight.push(height)
			for (let i = 0; i < list.length; i++) {
				let item = list[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		},
		_scrollTo(index) {
      if(!index && index !== 0) {
        return 
      }
      if(index < 0) {
        index = 0
      }else if(index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // 处理两个边缘的情况 因为 滚动事件的触发会超出所需边界，使得index需要处理
      this.scrollY = -this.listHeight[index]
      // 使用bscroll 进行的跳转是不派发scrol事件的，需要手动更新scroll的值
			this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
		},
	},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

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
        padding: 20px 0 0 30px
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
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      color:$color-text-l
      font-size: $font-size-small
      background: $color-highlight-background
  .loading
    position: absolute 
    top: 50%
    transform: translateY(-50%)


</style>