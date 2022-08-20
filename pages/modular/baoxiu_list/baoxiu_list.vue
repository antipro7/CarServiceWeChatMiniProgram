<template>
	<view>
		<!-- <view class="top">添加车辆</view> -->
		<view class="cardList">
			<!-- <view class="card">
				<view class="content" @click="selectCar(carId)">
					<view class="chepaihao">
						<view class="cardtitle">{{cardDefault.carNum}}</view>
						<view class="cardselect">当前</view>
					</view>
					<view class="address">{{cardDefault.loactionName}} {{cardDefault.memo}}</view>
				</view>
				<text class="cuIcon-right rightIcon"></text>
			</view> -->
			<view class="card" v-for="(item,index) in cheliang_list" :key="index" v-if="!(item.carId==carId)">
				<view class="content">
					<view class="chepaihao">
						<view class="cardtitle">{{item.carNum}}</view>
					</view>
					<view class="address">{{item.loactionName}} {{item.memo}}</view>
				</view>
				<view class="editBtn">
					<button  @click="xiugaixinxi(item.carId)">编辑</button>
				</view>
				<!-- <text class="cuIcon-right rightIcon"></text> -->
			</view>
		</view>
		
		<!-- <view v-if="cheliang_list.length > 0" v-for="(cheliang,index) in cheliang_list" :key="index"
		@click="xiugaixinxi(cheliang.carId)"
			style="display: flex;background: #FFFFFF;width: 96vw;height: 10vw;margin: 2vw;font-size: 1rem;line-height: 10vw;">
			<view style="flex: 1;text-align: left;margin-left: 2vw;">{{cheliang.carNum}}</view>
			<view style="flex: 3;text-align: right;margin-right: 2vw; overflow: hidden;text-overflow:ellipsis;">{{cheliang.loactionName}}</view>
		</view> -->
		<!-- <view>
			<button @click="tiaozhuan_xinzheng_chepai()" 
				style="width: 96vw;margin: 2vw;background: #FFFFFF;">+添加车牌</button>
			
		</view> -->
		<view class="kong"></view>
		<view class="xiadanBtn">
			<button @click="tiaozhuan_xinzheng_chepai()" class="huxing_quan"
				style="width: 70vw;margin: 3vw 15vw;margin-bottom: 0; background: #2d2d2d;color: #FFFFFF;">
				添加车牌
			</button>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cheliang_list:[],
			}
		},
		methods: {
			xiugaixinxi:function(res){
				console.log(res)
				uni.navigateTo({
					url:"../baoxiu_lishi/baoxiu_lishi?carId="+res
				})
			},
			
			tiaozhuan_xinzheng_chepai(){
				uni.navigateTo({
					url:"../../xiche/xinzheng_chepai/xinzheng_chepai"
				})
			},
			huoqu_chepai_liebiao: function() {
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/getCar', null, true, true, 'GET').then(value => {
					if (value) {
						
						_this.cheliang_list = value
						console.log("车辆")
						console.log(value)
					}
				})
			
			}
		},
		onLoad:function(){
		},
		onShow:function(){
			this.huoqu_chepai_liebiao()
		},
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.cardList{
		width: 92vw;
		margin: 4vw;
		margin-top: 2vw;
	}
	.card{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: #007AFF solid 1rpx; */
		border-bottom: #e9e9e9 solid 1rpx;
	}
	
	.content{
		width: 83%;
		/* border: #2bff43 solid 1rpx; */
		/* height: 200rpx; */
	}
	.chepaihao{
		display: flex;
		align-items: center;
		/* margin: 15rpx 0; */
		height: 80rpx;
		/* border: #2bff43 solid 1rpx; */
	}
	.cardtitle{
		font-size: 30rpx;
		font-weight: 500;
		color: #000000;
		margin-right: 20rpx;
	}
	.cardselect{
		font-size: 24rpx;
		background: #c54041;
		padding: 1rpx 10rpx;
		color: #FFFFFF;
	}
	.address{
		height: 70rpx;
		color: #393939;
		/* border: #2bff43 solid 1rpx; */
		width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rightIcon{
		width: 10%;
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
		/* border: #2bff43 solid 1rpx; */
		color: #DDDDDD;
	}
	.editBtn{
	}
	.editBtn button{
		background: #2d2d2d;
		color: #FFFFFF;
		border-radius: 15rpx;
		height: 55rpx;
		line-height: 55rpx;
		font-size: 28rpx;
		padding: 2rpx 20rpx;
	}
	.kong{
		width: 700rpx;
		height: 150rpx;
	}
	.xiadanBtn{
		background: white;
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		padding-bottom: 30rpx;
		padding-top: 10rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		/* background: #f1f1f1; */
	}
	.xiadanBtn button{
		border-radius: 15rpx;
	}
</style>