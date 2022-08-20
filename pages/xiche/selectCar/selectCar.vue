<template>
	<view>
		<!-- <view class="top">添加车辆</view> -->
		<view class="cardList">
			<view class="card" v-if="cardDefault.carId!=0">
				<view class="content" @click="selectCar(carId)">
					<view class="chepaihao">
						<view class="cardtitle">{{cardDefault.carNum}}</view>
						<view class="cardselect">当前</view>
					</view>
					<view class="address">{{cardDefault.loactionName}} {{cardDefault.memo}}</view>
				</view>
				<text class="cuIcon-right rightIcon" @click="editCar(carId)"></text>
			</view>
			<!-- v-for="item in cheliang_list" :key="item.value" -->
			<view class="card" v-for="(item,index) in cardList" :key="index" v-if="!(item.carId==carId)">
				<view class="content" @click="selectCar(item.carId)">
					<view class="chepaihao">
						<view class="cardtitle">{{item.carNum}}</view>
						<!-- <view class="cardselect">当前</view> -->
					</view>
					<view class="address">{{item.loactionName}} {{item.memo}}</view>
				</view>
				<text class="cuIcon-right rightIcon" @click="editCar(item.carId)"></text>
			</view>
		</view>
		<view class="xiadanBtn">
			<button @click="addCar" class="saveBtn">
				添加车辆
			</button>
			<!-- <view class="">服务将在下单晚19:00至次日06:00之内完成</view> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carId:'',
				cardDefault:{
					'carNum':'加载中',
					'loactionName':'加载中',
					'memo':'',
					'carId':0
				},
				cardList:[]
			}
		},
		onLoad(value) {
			this.carId=value.carId;
			console.log(value.carId)
		},
		onShow() {
			this.huoqu_chepai_liebiao();
		},
		methods: {
			selectCar(carId){
				// _this.judgeBookingTime=res2;
				let pages = getCurrentPages();
				console.log(pages)
				let prevPage = pages[pages.length-2];  
				console.log(prevPage)
				prevPage.$vm.carId = carId;
				uni.navigateBack({
					delta:1
				})
			},
			editCar(carId){
				uni.navigateTo({
					url:'../../modular/baoxiu_lishi/baoxiu_lishi?carId='+carId
				})
			},
			addCar(){
				uni.navigateTo({
					url:'../xinzheng_chepai/xinzheng_chepai?selectCarPage=1'
				})
			},
			huoqu_chepai_liebiao: function() {
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/getCar', null, true, true, 'GET').then(value => {
					if (value) {
						_this.cardList = value
						value.forEach(item=>{
							if(item.carId==_this.carId){
								_this.cardDefault=item
							}
						})
						console.log(_this.cardList)
						console.log(_this.cardDefault)
					}
				})
			},
		}
	}
</script>

<style>
page{
	background-color: #FFFFFF;
}
.top{
	float: right;
	margin-right: 30rpx;
	margin-top: 10rpx;
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
	width: 95%;
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
.xiadanBtn{
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
.saveBtn{
	width: 65vw;
	margin: 2vw;
	background: #2d2d2d;
	color: #FFFFFF;
	font-size: 30rpx;
}
.xiadanBtn button{
	border-radius: 8rpx;
}
</style>
