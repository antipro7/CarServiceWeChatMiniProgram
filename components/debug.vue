<template>
	<view v-if="tiaoshi">
		<view @click="tanchuang()" class="dibu debug">
			BUG
		</view>
		<view v-if="xianshi" @click="gengduo_show()" style="width: 100vw;text-align: center;line-height: 10vw;">DEBUG</view>
		<view v-if="gengduo" style="width: 100vw;height: 50vh;overflow-y: scroll;">
			<view v-if="xianshi" v-for="item in debug" :key="item.value">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['datas'],
		data() {
			return {
				debug: [],
				xianshi: false,
				tiaoshi: false,
				gengduo: false,
			}
		},
		methods: {
			tanchuang: function() {
				let _this = this
				_this.debug = getApp().globalData.public_debug
				_this.xianshi = true
				getApp().globalData.public_debug = []
			},
			gengduo_show: function() {
				this.gengduo = !this.gengduo
			}
		},
		created: function() {
			this.tiaoshi = getApp().globalData.public_tiaoshi_moshi
		}
	}
</script>

<style>
	.debug {
		width: 10vw;
		height: 10vw;
		background: #FF0000;
		color: #FFFFFF;
		text-align: center;
		line-height: 10vw;
		z-index: 99999;
		right: 2vw;
		bottom: 2vw;
	}
</style>
