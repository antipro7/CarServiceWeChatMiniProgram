<template>
	<view>
<!-- 		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索车牌"  v-model="chepai" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round"  @click="search()">搜索</button>
				</view>
			</view>
		</view> -->
		<view class="orderList" v-for="(item,index) in dingdan_list" :key="index" @tap="dingdan_xiangqing(item.orderId)">
			<view class="orderListTop">
				<view>订单号：{{item.orderUid}}</view>
				<view>{{item.updateTime}}</view>
			</view>
			<view class="orderListMid">
				<view class="orderListImg">
					<img :src="item.stewardAvatar" mode="aspectFill" alt="">
				</view>
				<view class="orderListRight">
					<view>
						服务类别：上门洗车
					</view>
					<view>
						车辆信息：{{item.carNum}}
					</view>
					<view v-if="item.totalFee==null">
						总&emsp;&emsp;价：0元
					</view>
					<view v-if="item.totalFee!=null">
						总&emsp;&emsp;价：{{item.totalFee.toFixed(2)}}元
					</view>
					<!-- <view>服务类别：上门洗车</view>
					<view>预付金额：{{item.priceLimitName}}元</view>
					<view><text>总&emsp;&emsp;价</text>：{{item.carwService.totalPrice}}元</view> -->
				</view>
			</view>
			<view class="orderListBot" @tap.stop="">
				<!-- <view class="orderNum">我的口令：{{item.userPasswd}}</view> -->
				<view class="orderListBotBtn" style="width: 130rpx;">
					<button @click="boda_dianhua(['18120718168'])">投诉</button>
				</view>
				<view class="orderListBotBtn">
					<button @click="boda_dianhua([item.stewardPhone])">联系管家</button>
				</view>
			</view>
		</view>
		<!-- <view class="huxing_quan" style="width: 96vw;background: #FFFFFF;margin: 2vw;"
		v-for="(item,index) in dingdan_list1" :key="index" @tap="dingdan_xiangqing(item.orderId)">
			<view class="cardTop">
				<view style="flex: 1;text-align: left;margin-left: 2vw;">{{item.orderUid}}</view>
				<view style="flex: 1;text-align: right;margin-right: 2vw;">{{item.updateTime}}</view>
			</view>
			<view style="width: 90vw;height: 2px;background-color: #e9e9e9;margin: 3vw;margin-top: 0;"></view>
		
			<view style="display: flex;width: inherit;height: 20vw;">
				<view style="flex: 2;text-align: center;">
					<view>
						<image  style="width: 20vw;height: 20vw;" :src="item.stewardAvatar" mode="aspectFill"></image>
					</view>
				</view>
				<view style="flex: 3;" v-if="item.stewardName==null">
					<view style="margin-top: 5vw;">
						管家名称：
					</view>
					<view style="margin-top: 2vw;">
						管家口令：
					</view>
				</view>
				<view style="flex: 3;" v-if="item.stewardName!=null">
					<view style="margin-top: 5vw;">
						服务类别：上门洗车
					</view>
					<view style="margin-top: 2vw;">
						车牌号：{{item.carNum}}
					</view>
					<view style="margin-top: 2vw;" v-if="item.totalFee==null">
						总价：0元
					</view>
					<view style="margin-top: 2vw;" v-if="item.totalFee!=null">
						总价：{{item.totalFee.toFixed(2)}}元
					</view>
				</view>
			</view>
			<view class="cardBottom" @tap.stop="">
				<view class="userPasswd">我的口令：{{item.userPasswd}}
				</view>
				<view class="dianhua">
					<view class="huxing_quan phoneBtn"
					@click="boda_dianhua([item.stewardPhone])">
						电话
					</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dingdan_list:[],
				// dingdan_list1:[{name:1}],
				chepai:'',
				a:'0',
				public_server_img:'',
			}
		},
		methods: {
			huoqu_fuwu_liebiao:function(){
				let _this = this
				_this.public_server_img=getApp().globalData.public_server_url
				
				_this.wangluo_qingqiu('/wx/carw/getUserOrderHistory', null, true, true, 'GET').then(value => {
					if (value) {
						_this.dingdan_list = value
						console.log("历史订单")
						console.log(value)
					}
				})
			},
		
			boda_dianhua:function(res){
				uni.makePhoneCall({
					phoneNumber: res[0] //仅为示例
				});
			},
			search(){
				let _this=this
				let data={
				 	carNum:_this.chepai
				 }
				
				_this.wangluo_qingqiu('/wx/carw/getUserOrderHistoryByCarNum',data, true, true, 'GET').then(value => {
					console.log(value)
					if(value=='{}'||value=='[]'||value==null){
						console.log("空")
						// _this.dingdan_list=[]
						uni.showModal({
							title: '提示',
							content: '请输入精准的车牌号',
							showCancel:false,
							success: function (res) {
								
							}
						});
					}else{
						_this.dingdan_list=value
					}
				});
			},
			dingdan_xiangqing(orderId){
				uni.navigateTo({
					url:"../dingdan_xiangqing/dingdan_xiangqing?orderId="+orderId,
				})
			}
		},
		onShow: function() {
			this.huoqu_fuwu_liebiao()
			// if(getApp().globalData.public_login_status){
			// 	this.huoqu_chepai_liebiao()
			// }
			this.chepai=''
		}
	}
</script>

<style>
	page {
		background: #f1f1f1;
	}
	.orderList{
		width: 92vw;
		background: #FFFFFF;
		margin: 4vw;
		border-radius: 5rpx;
	}
	.orderListTop{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 25rpx;
		border-bottom: #efefef solid 1rpx;
		font-size: 25rpx;
		color: #9b9b9b;
	}
	.orderNum{
		/* border: salmon solid 1rpx; */
		/* width: 45&; */
	}
	.orderListMid{
		width: 100%;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		padding: 15rpx 25rpx;
		/* border: salmon solid 1rpx; */
	}
	.orderListImg{
		width: 190rpx;
		height: 190rpx;
		/* border: salmon solid 1rpx; */
		margin-right: 25rpx;
	}
	.orderListImg image{
		width: 100%;
		height: 100%;
	}
	.orderListRight{
		display: flex;
		flex-direction: column;
		height: 190rpx;
		font-size: 28rpx;
		color: #69686b;
		/* border: salmon solid 1rpx; */
		/* padding-top: 20rpx; */
	}
	.orderListRight view{
		height: 65rpx;
		line-height: 65rpx;
	}
	.orderListBot{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 25rpx;
		color: #393939;
		font-size: 29rpx;
	}
	.orderListBotBtn button{
		border: #c72723 solid 1rpx;
		background: #fdf6f6;
		color: #c72723;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 25rpx;
		padding: 0 15rpx;
		border-radius: 5rpx;
	}
	
	.cardTop{
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* background: #FFFFFF; */
		width: 92vw;
		height: 11.5vw;
		margin: 2vw;
		margin-bottom: 0;
		font-size: 1rem;
		/* padding: 10rpx 0; */
		/* border: #000000 1rpx solid; */
	}
	.cardBottom{
		width: 92vw;
		height: 11.5vw;
		margin: 2vw;
		/* margin-bottom: 1vw; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/* .dianhua{
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: #000000 1rpx solid;
	} */
	.phoneBtn{
		text-align: center;
		background-color: #333333;
		color: #FFFFFF;
		width: 15vw;
		padding: 10rpx 0;
		margin-left: 9.5vw;
		/* margin-top: 2vw; */
	}
	.userPasswd{
		height: 5vw;
		text-align: right;
		margin-right: 2vw;
	}
</style>
