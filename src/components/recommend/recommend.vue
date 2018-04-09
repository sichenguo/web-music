<template>
  <div class="recommend" ref="recommend"	>
		<scroll class="recommend-content" :data="discList" ref="scroll">
			<div> 
				<!-- 直接子元素 -->
				<div v-if="recommends.length" class="slider-wrapper">
					<slider>
						<div v-for="(item,index) in recommends" :key="index">
							<a :href="item.linkUrl"  >
								<img @load="loadImag" class="needsclick" :src="item.picUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul v-if="discList.length">
						<li v-for="item in discList" :key="item.dissid" class="item">
							<div class="icon">
								<img  v-lazy="item.imgurl">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</scroll>
		<loading  v-show="!discList.length"	class="loading"></loading>	
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
import { getRecommendData, getDiscList} from 'api/recommend'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {ERR_OK} from 'api/config'

export default {
	data() {
		return {
			recommends: [],
			discList: [],
			imagechecked:false
		}
	},
	created() {
		this._getRecommendData()
		this._getDiscList()
	},
	methods: {
		_getRecommendData() {
			getRecommendData().then(res => {
				if(res.code === ERR_OK){
					this.recommends = res.data.slider
				}
			})
		},
		_getDiscList() {
			getDiscList().then(res => {
				if(res.code === ERR_OK){
					this.discList = res.data.list
				}
			})
		},
		loadImag() {
			if(!this.imagechecked){
				// console.log("图片加载完成")
				this.$refs.scroll.refresh()
				this.imagechecked = true
			}
		}
	},
	components: {
		Slider,
		Scroll,
		Loading
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
	.recommend
		position: fixed  //輪播圖的位置
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height : 100%
			overflow: hidden
			.slider-wrapper
				position: relative 
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					color: $color-theme
					size: $font-size-medium
				.item	
					display: flex
					box-sizing: border-box
					align-items: center 
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
						img
							width: 60px
							heigth: 60px
					.text	
						display: flex
						flex-direction: column
						justify-content: center 
						text-align: left 
						flex: 1
						line-height: 20px
						font-size: $font-size-medium
						.name
							margin-bottom: 10px
							color: $color-text
						.desc
							color: $color-text-d
		.loading
			position: absolute 
			top: 50%
			transform: translateY(-50%)

							








			





</style>