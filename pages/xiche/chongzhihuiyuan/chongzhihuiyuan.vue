<template>
	<view>
		<view class="vipTop">
		</view>
		<view class="vipContent">
			<view class="vipTitle">
				<view>晨夜VIP会员</view>
				<text v-if="nowMemberType==2">到期时间：{{huiyuanTime}}</text>
				<text v-if="nowMemberType==3">过期时间：{{huiyuanTime}}</text>
			</view>
			<view class="vipPrice">
				<view class="vipSelect"  v-for="(item,index) in huiyuanList" @click="huiyuanSelected(item)" v-if="item.cardId!=1">
					<view class="zhekou">{{(item.cardDiscount*10).toFixed(1)}}折</view>
					<view :class="selected==item.cardId?'selectContent1':'selectContent'">
						<view class="priceTitle">{{item.cardName}}</view>
						<view class="price"><text style="font-size: 30rpx;">¥</text>{{(item.cardPrice*item.cardDiscount).toFixed(0)}}</view>
						<view class="priceHua">{{item.cardPrice}}</view>
					</view>
				</view>
				<!-- <view class="vipSelect"  @click="huiyuanSelected(2)">
					<view class="zhekou">4.0折</view>
					<view :class="selected==2?'selectContent1':'selectContent'">
						<view class="priceTitle">晨夜年度VIP</view>
						<view class="price"><text style="font-size: 30rpx;">¥</text>288</view>
						<view class="priceHua">{{(99*0.6).toFixed(0)}}</view>
					</view>
				</view>
				<view class="vipSelect"  @click="huiyuanSelected(3)">
					<view class="zhekou">4.0折</view>
					<view :class="selected==3?'selectContent1':'selectContent'">
						<view class="priceTitle">晨夜年度VIP</view>
						<view class="price"><text style="font-size: 30rpx;">¥</text>288</view>
					</view>
				</view> -->
			</view>
			<view class="quanyiTitle">晨夜VIP会员权益</view>
			<view class="vipQuanyi">
				<!-- v-for="(item,index) in dingdan_list"  -->
				<view class="quanyiContent">
					<!-- <image src="" mode=""></image> -->
					<!-- <view class="quanyizhekou">{{(zhekou*10).toFixed(1)}}</view> -->
					<!-- <view class="quanyi">项目{{(zhekou*10).toFixed(1)}}折</view> -->
					<view class="quanyizhekou">{{8.8}}</view>
					<view class="quanyi">项目{{8.8}}折</view>
				</view>
				<view class="quanyiContent">
					<image src="../../../static/ico/fangxiangpan.png" mode=""></image>
					<view class="quanyi">免代驾费</view>
				</view>
				<view class="quanyiContent">
					<image src="../../../static/ico/gongju-.png" mode=""></image>
					<view class="quanyi">免检测费</view>
				</view>
				<view class="quanyiContent">
					<image src="../../../static/ico/vip-line.png" mode=""></image>
					<view class="quanyi">优先特权</view>
				</view>
			</view>
			<view class="zhifufangshi">
				<!-- <view class="zhifubao" @click="selectFangshi()">
					<image class="zhifuIcon" src="../../../static/ico/zhifubao.png" mode=""></image>
					<view class="zhifuName">支付宝</view>
					<image class="xuanzhong" v-if="!selectedZFB"></image>
					<image class="xuanzhong" v-if="selectedZFB" src="../../../static/ico/wancheng.png" mode=""></image>
				</view> -->
				
				<view class="zhifubao">
					<image class="zhifuIcon" src="../../../static/ico/weixinzhifu.png" mode=""></image>
					<view class="zhifuName">微信支付</view>
					<!-- <image class="xuanzhong" v-if="selectedZFB"></image> -->
					<image class="xuanzhong" src="../../../static/ico/wancheng.png" mode=""></image>
				</view>
			</view>
			<!-- <view class=""></view> -->
			<!-- <button class="cu-btn round lg">大尺寸</button> -->
			<view class="btn">
				<button class="cu-btn margin-tb-sm lg round bottomBtn" @click="zhifuBtn()">确认协议并支付</button>
			</view>
			<view class="bottomText">
				<view class="text1">
					开通前请阅读<text style="color: #CA0209;" @click="dianjixieye">《晨夜车管家会员协议》</text>
				</view>
				<view class="text1">划线价说明：晨夜车管家展示的划线价为建议零售价</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected:2,
				zhekou:0.9,
				selectedZFB:true,
				huiyuanList:[],
				selectHuiyuan:[],
				// cardExpireTime:'',
				nowMemberType:1,
				isHuiyuan:false,
				huiyuanTime:''
			}
		},
		methods: {
			dianjixieye(){
				uni.navigateTo({
					url:"../xiiche_xieyi/xiiche_xieyi"
				})
			},
			huiyuanSelected(item){
				console.log(item)
				this.selected=item.cardId;
				this.zhekou=item.cardDiscount;
				this.selectHuiyuan=item;
			},
			selectFangshi(item){
				console.log(item)
				if(item==1){
					this.selectedZFB=true;
				}else{
					this.selectedZFB=false;
				}
			},
			zhifuBtn(){
				let _this=this
				let data={
					price:(_this.selectHuiyuan.cardPrice*_this.selectHuiyuan.cardDiscount).toFixed(0),
					memberType:_this.selectHuiyuan.cardId,
					// discount:_this.selectHuiyuan.cardDiscount
					// discount:0.1
				}
				console.log(data)
				_this.wangluo_qingqiu('/wx/pay/rechargeMember', data, true, true, 'POST').then(value => {
					if (value) {
						console.log("myBalanceRecharge");
						console.log(value);
						// _this.orderNumber = value.orderNumber
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: value.timeStamp,
							nonceStr: value.nonceStr,
							package: value.package,
							signType: value.signType,
							paySign: value.paySign,
							success: function(res) {
								console.log(res)
								uni.navigateBack({
									
								})
								
							},
							fail: function(err) {
								console.log("err")
								console.log(err)
								uni.showModal({
									title: '注意',
									content: '取消支付。',
									confirmText: '知道了',
									showCancel: false,
									success: res => {
									}
								});
							}
						});
					}
				})
			},
			init(){
				let _this=this
				_this.wangluo_qingqiu('/wx/carw/getMemberPurchaseInformation',null,true,true,'POST').then(res => {
					if(res){
						console.log(res)
						_this.huiyuanList=res.cardList;
						_this.zhekou=res.cardList[1].cardDiscount;
						this.selectHuiyuan=res.cardList[1];
						// if(res.cardExpireTime){
						// 	_this.cardExpireTime=res.cardExpireTime.slice(0,10)
						// }
						// console.log(res)
					}
				})
				_this.wangluo_qingqiu('/wx/carw/getUserInfo',null,true,true,'get').then(res => {
					if(res){
						console.log(res)
						_this.nowMemberType=res.nowMemberType;
						if(res.nowMemberType==2){
							_this.isHuiyuan=true;
							_this.huiyuanTime=res.cardExpireTime.slice(0,10);
						}else if(res.nowMemberType==3){
							_this.huiyuanTime=res.cardExpireTime.slice(0,10);
							_this.isHuiyuan=false;
						}else{
							_this.isHuiyuan=false;
						}
					}
				})
			},
		},
		onShow(){
			this.init();
			console.log("123")
		}
	}
</script>

<style>
.vipTop{
	width: 100%;
	height: 25vh;
	border: #000000 solid 1rpx;
	background-image: url(../../../static/img/tupian.png);
	background-size: 100% 100%;
	-moz-background-size: 100% 100%;
	-webkit-background-size: 100% 100%;

}
.vipTop image{
	width: 100%;
	height: 100%;
}

.vipContent{
	width: 100%;
	height: 79vh;
	margin-top: -4vh;
	/* background: -webkit-gradient(linear, 0 0, 0 100%, from(red), to(black)); */
	background: linear-gradient(red, black);
	border: solid 1rpx;
	border-top-left-radius: 30rpx;
	border-top-right-radius: 30rpx;
	padding: 35rpx;
	padding-top: 100rpx;
	
}
.vipTitle{
	color: #FFFFFF;
	font-size: 32rpx;
	height: 50rpx;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding-right: 20rpx;
	padding-bottom: 5rpx;
}
.vipTitle view{
	font-size: 32rpx;
}
.vipTitle text{
	font-size: 25rpx;
}
.vipPrice{
	margin-top: 10rpx;
	width: 100%;
	height: 22vh;
	/* border: #000000 solid 1rpx; */
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.vipSelect{
	width: 30%;
	height: 100%;
	/* border: #000000 solid 1rpx; */
}
.zhekou{
	font-size: 25rpx;
	color: #FFFFFF;
	width: 90rpx;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
	background: #FF0000;
	border: #FF0000 solid 1rpx;
	border-top-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	position: relative;
	z-index: 9;
}
.selectContent{
	width: 100%;
	height: 80%;
	z-index: -1;
	border:#e5c27dcc solid 1rpx;
	border-radius: 20rpx;
	margin-top: -20rpx;
	background: linear-gradient(#d60000, #141414);
}
.selectContent1{
	width: 100%;
	height: 80%;
	z-index: -1;
	border:#e5c27d solid 1rpx;
	box-shadow: 0px 0px 5px 5px #e5c27d99;
	border-radius: 20rpx;
	margin-top: -20rpx;
	background: linear-gradient(#d60000, #141414);
	
}
.priceTitle{
	margin-top: 40rpx;
	width: 100%;
	text-align: center;
	color: #FFFFFF;
	/* border:#20f432 solid 1rpx; */
}
.price{
	width: 100%;
	margin-top: 15rpx;
	color: #FFFFFF;
	font-size: 56rpx;
	/* font-weight: bold; */
	text-align: center;
	/* border:#ffffff solid 1rpx; */
}
.priceHua{
	width: 100%;
	margin-top: 10rpx;
	color: #FFFFFF99;
	font-size: 35rpx;
	text-decoration: line-through;
	/* font-weight: bold; */
	text-align: center;
	/* border:#ffffff solid 1rpx; */
}
.quanyiTitle{
	color: #FFFFFF;
	font-size: 32rpx;
	margin-top: 50rpx;
}
.vipQuanyi{
	width: 100%;
	margin-top: 20rpx;
	height: 150rpx;
	/* border:#ffffff solid 1rpx; */
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.quanyiContent{
	width: 120rpx;
	height: 130rpx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	/* border:#ffffff solid 2rpx; */
}
.quanyiContent image{
	width: 70rpx;
	height: 70rpx;
	padding: 5rpx;
	border:#e5c27d solid 1rpx;
	border-radius: 50%;
	background: linear-gradient(#d60000, #141414);
}
.quanyiContent .quanyizhekou{
	width: 70rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	font-size: 35rpx;
	font-weight: bold;
	color: #e5c27d;
	border:#e5c27d solid 1rpx;
	border-radius: 50%;
	background: linear-gradient(#d60000, #141414);
}
.quanyiContent .quanyi{
	font-size: 25rpx;
	color: #FFFFFF;
}
.zhifufangshi{
	/* border:#e5c27d solid 1rpx; */
	width: 100%;
	height: 80rpx;
}
.zhifubao{
	width: 100%;
	height: 75rpx;
	/* border:#e5c27d solid 1rpx; */
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.zhifubao .zhifuIcon{
	/* border:#FFFFFF solid 1rpx; */
	height: 54rpx;
	width: 54rpx;
	border-radius: 50%;
	background: #FFFFFF;
	padding: 3rpx;
}
.zhifuName{
	width: 80%;
	color: #FFFFFF;
	/* border:#FFFFFF solid 1rpx; */
}
.zhifubao .xuanzhong{
	width: 42rpx;
	height: 42rpx;
	border: 1rpx solid #FFFFFF;
	border-radius: 50%;
	background: #FFFFFF;
	color: #ff0000;
}
.cuIco{
	
}
.btn{
	width: 100%;
	display: flex;
	justify-content: center;
}
.bottomBtn{
	width: 500rpx;
	border: #FFFFFF 1rpx solid;
	background: #ca0209 !important;
	color: #FFFFFF;
	
}
.bottomText{
	width: 100%;
}
.text1{
	width: 100%;
	color: #FFFFFF;
	font-size: 24rpx;
	text-align: center;
}
</style>
