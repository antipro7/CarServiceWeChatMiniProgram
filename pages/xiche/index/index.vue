<template>
	<view >
		<view class="vipTop">
		</view>
		<!-- <view style="width: 100vw;height: 40vw;background:#333333;">
			<view style="display: flex;">
				<view style="flex: 1;">
					<image src="../../../static/img/logo.jpg"
						style="width: 50px;height: 50px;margin-top: 20vw;margin-left: 10vw;"></image>
				</view>
				<view style="flex: 2;margin-top: 20vw;">
					<view style="color: #FFFFFF;font-size: 2rem;">
						晨夜车管家
					</view>
					<view style="color: #FFFFFF;font-size: 1rem;">
						管家式上门养车服务
					</view>
				</view>
				
			</view>
			
		</view> -->
		<view class="vipContent">
			<view class="chepai" @click="tiaozhuan_xinzheng_chepai()">
				<view class="chepaiLeft">
					<image src="../../../static/img/carIcon.png" mode=""></image>
					<view class="leftChepaihao" v-if="cheliang_list.length==0">添加车辆</view>
					<view class="leftChepaihao" v-if="cheliang_list.length!=0">{{cheliang_list[0].carNum}}</view>
				</view>
				<view class="chepaiRight">
					<view class="rightAddr" v-if="cheliang_list.length==0"></view>
					<view class="rightAddr" v-if="cheliang_list.length!=0">
						<!-- 厦门市第十一中学厦门市第十一中学（湖滨南路） -->
						{{cheliang_list[0].loactionName}} {{cheliang_list[0].memo}}
					</view>
					<text class="cuIcon-right rightIcon"></text>
				</view>
			</view>
			<view class="xicheService">
				<view style="width: 50%;" @click="tiaozhuan_xinzheng_dingdan()">
					<image src="../../../static/img/xiche.png" mode=""></image>
				</view>
				<view style="width: 50%;" @click="tishi()">
					<image src="../../../static/img/xiuche.png" mode=""></image>
				</view>
			</view>
			<!-- <view v-if="cheliang_list.length > 0" v-for="(cheliang,index) in cheliang_list" :key="index"
			
				style="display: flex;background: #FFFFFF;width: 96vw;height: 10vw;margin: 2vw;font-size: 1rem;line-height: 10vw;">
				<view style="flex: 1;text-align: left;margin-left: 2vw;">{{cheliang.carNum}}</view>
				<view style="flex: 3;text-align: right;margin-right: 2vw; overflow: hidden;text-overflow:ellipsis;">{{cheliang.loactionName}}</view>
			</view> -->
			<!-- <view v-if="cheliang_list.length < 1"> -->
			<!-- <view>
				<button @click="tiaozhuan_xinzheng_chepai()" class="huxing_quan_mini"
					style="width: 96vw;margin: 2vw;background: #FFFFFF;">+添加车牌</button>
			</view> -->
			
			<!-- <view class="huxing_quan" style="width: 96vw;height: 40vw;background: #FFFFFF;margin: 2vw;">
				<view style="padding: 2vw;">
					
				</view>
				<view style="display: flex;">
					<view @click="tiaozhuan_xinzheng_dingdan()" style="flex: 1;text-align: center;">
						<view >
							<image style="width: 20vw;height: 20vw;" src="../../../static/img/2.png" ></image>
						</view>
						<view>
							一键洗车
						</view>
					</view>
					<view @click="tishi()" style="flex: 1;text-align: center;">
						<view>
							<image style="width: 20vw;height: 20vw;" src="../../../static/img/1.png"></image>
						</view>
						<view>
							一键维保
						</view>
					</view>
				</view>
			</view> -->
			
			<view class="cu-modal"  :class="a==1?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">余额充值111</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<radio-group @change="dianji" @confirm="weixin_zhifu" class="cu-form-group margin-top" >
						<view class="title">充值金额</view>
						<label style="left: 10rpx;">
							<radio class='radio' :value="50"/>50
							<radio class='radio' :value="100"/>100
							<radio class='radio' :value="150"/>150
						     <radio class="radio" :value="1"/>其他
						</label>
								
					</radio-group>
						
					<view class="cu-dialog" v-show="m==1">
						<view class="researchScript">
						<!-- 搜索框 -->
							<input type="text" class="researchText" placeholder="输入不小于50元的充值金额" 
								confirm-type="search" @input="shuru_jine"  @confirm="weixin_zhifu"></input>
						</view>			
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-green margin-tb-sm lg"  @tap="weixin_zhifu">微信支付</button>
					</view>
				</view>
			</view>
			
			<!-- <view style="width: 100vw;text-align: center;font-size: 37rpx;height: 10vw;line-height: 10vw;">服务中</view> -->
			<view class="serviceTitle" v-if="dingdan_list.length!=0">服务中</view>
			
			<!-- <view class="huxing_quan" style="width: 96vw;background: #FFFFFF;margin: 2vw;"
			v-for="(item,index) in dingdan_list" :key="index" @tap="dingdan_xiangqing(item.orderId,item.stateName)">
				<view class="cardTop">
					<view style="flex: 1;text-align: left;margin-left: 2vw;">{{item.carNum}}</view>
					<view style="flex: 1;text-align: right;margin-right: 2vw;">{{item.stateName}}</view>
				</view>
				<view style="width: 90vw;height: 2px;background-color: #e9e9e9;margin: 3vw;margin-top: 0;"></view>
			
				<view style="display: flex;width: inherit;height: 20vw;">
					<view style="flex: 2;text-align: center;">
						
						<view v-if="item.stewardAvatar">
							<image style="width: 20vw;height: 20vw;" :src="item.stewardAvatar"></image>
						</view>
						<view v-if="!item.stewardAvatar">
							<image style="width: 20vw;height: 20vw;" src="../../../static/img/logo.jpg"></image>
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
							管家名称：{{item.stewardName}}
						</view>
						<view style="margin-top: 2vw;">
							管家口令：{{item.stewardPasswd}}
						</view>
					</view>
				</view>
				<view class="cardBottom" @tap.stop="">
					<view class="dianhua">
						<view class="huxing_quan phoneBtn"
						@click="boda_dianhua([item.stewardPhone])">
							电话
						</view>
					</view>
					<view class="userPasswd">我的口令：{{item.userPasswd}}
					</view>
				</view>
			</view> -->
			
			<view class="orderList" v-for="(item,index) in dingdan_list" :key="index" @tap="dingdan_xiangqing(item.orderId,item.stateName)">
				<view class="orderListTop">
					<view>{{item.carNum}}</view>
					<view>{{item.stateName}}</view>
				</view>
				<view class="orderListMid">
					<view v-if="item.stewardAvatar" class="orderListImg">
						<image style="width: 20vw;height: 20vw;" :src="item.stewardAvatar"></image>
					</view>
					<view v-if="!item.stewardAvatar" class="orderListImg">
						<image style="width: 20vw;height: 20vw;" src="../../../static/img/logo.jpg"></image>
					</view>
					<view class="orderListRight">
						<view v-if="item.stewardName==null">管家名称：</view>
						<view v-if="item.stewardName!=null">管家名称：{{item.stewardName}}</view>
						<view>服务类别：上门洗车</view>
						<view v-if="item.carwCondition==null"><text>价&emsp;&emsp;格</text>：等待管家确认价格</view>
						<view v-if="item.carwCondition!=null"><text>价&emsp;&emsp;格</text>：{{item.totalFee}}元</view>
					</view>
				</view>
				<view class="orderListBot" @tap.stop="">
					<view class="orderNum"></view>
					<!-- <view class="orderNum">我的口令：{{item.userPasswd}}</view> -->
					<view class="orderListBotBtn" v-if="item.carwCondition==null||item.tradeState==2">
						<button @click="boda_dianhua([item.stewardPhone])">联系管家</button>
					</view>
					<view class="orderListBotBtn" v-if="item.carwCondition!=null&&item.tradeState!=2">
						<button @click="userPayBtn(item)">付款</button>
					</view>
					<!-- <view class="orderListBotBtn">
						<button @click="userPayBtn(item)">付款</button>
					</view> -->
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cheliang_list: [],
				dingdan_list:[],
				a:'',
				chongzhi_jine:'0',
				m:'',
			};
		},
		onLoad: function() {
			let _this = this
			_this.weixin_logn()
			console.log(getApp().globalData.public_server_url)
		},
		methods: {
			userPayBtn(zhifuItem){
				console.log(zhifuItem)
				let payState=1;//只有车况
				if(zhifuItem.carwService!=null){
					payState=2;//服务报告不为空（已填写
				}
				let data2={
					price: zhifuItem.totalFee, //价格限制
					payState:payState,
					orderUid:zhifuItem.orderUid,
					discountedPrice:zhifuItem.discountedPrice
				}
				console.log("data2",data2)
				// 付款
				let _this=this;
				if(data2.price==0.00){
					uni.showModal({
						title: '提示',
						content: '是否进行付款？',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								_this.wangluo_qingqiu('/wx/pay/payZero', data2, true, true, 'POST').then(value2 => {
									console.log(value2)
									if (value2) {
										uni.showModal({
											title: '提示',
											content: '支付成功。',
											confirmText: '知道了',
											showCancel: false,
											success: res => {
												_this.huoqu_fuwu_liebiao();
											}
										});
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}.bind(this)
					});
					
				}else{
					_this.wangluo_qingqiu('/wx/pay/sendipmsfeecharge', data2, true, true, 'POST').then(value => {
						if (value) {
							console.log("sendipmsfeecharge");
							console.log(value);
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: value.timeStamp,
								nonceStr: value.nonceStr,
								package: value.package,
								signType: value.signType,
								paySign: value.paySign,
								success: function(res) {
									console.log(res)
									_this.huoqu_fuwu_liebiao();
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
				}
			},
			chakan_yue(){
				if(getApp().globalData.xinxi==1){
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/userBalance', null, true, true, 'GET').then(value => {
					console.log("userBalance")
					console.log(value)
					getApp().globalData.public_yonghu_yue = value
					// if (value) {
					// 	getApp().globalData.public_yonghu_yue = value
					// }
				})
				}
			},
			showModal(e) {
				this.a = e.currentTarget.dataset.target
				console.log(this.a)
			},
			hideModal(e) {
				this.a = null
			},
			weixin_logn: function() {

				let _this = this
				uni.login({
					provider: 'weixin',
					success(res) {
						let data = {
							code: res.code
						}
						console.log('data',data)
						_this.wangluo_qingqiu('/wx/user/login', data, false, true, 'GET').then(value => {
							if (value) {
								console.log('/wx/user/login')
								console.log(value)
								getApp().globalData.public_user_token = value.token
								console.log(value.token)
								getApp().globalData.public_login_status = true
								getApp().globalData.public_user_phone = value.has_phone

								if (value.special_value == 1) {
									getApp().globalData.public_wxapp_type = true
								} else {
									getApp().globalData.public_wxapp_type = false

								}
                              
                               _this.wangluo_qingqiu('/wx/carw/checkUserInfo', null, true, true, 'GET').then(value => {
                                	console.log('q')
                                	console.log(value)
									const res=value
                                	if (value!=false) {
										console.log('a')
										getApp().globalData.xinxi=0
										console.log(getApp().globalData.xinxi)
										uni.switchTab({
											url:"../../index_4/index_4"
										})
                               		}
									else if(value==false){
										getApp().globalData.xinxi=1
									}
                                })
                            
								_this.huoqu_souye_xinxi()
							}
						})
					}
				})

			},
			huoqu_souye_xinxi: function() {
				this.huoqu_chepai_liebiao()
				this.huoqu_fuwu_liebiao()
				this.chakan_yue()
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

			},
			tishi:function(){
				uni.showModal({
					titile:'提示',
					content:'敬请期待',
					
						success: function() {
							uni.navigateBack({
						
							})
						}
					
				})
			},
			tiaozhuan_xinzheng_chepai: function() {
				if(getApp().globalData.xinxi==0){
					uni.showModal({
						title:"提示",
						content:"请登录",
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url:"../../index_4/index_4"
								})
							}
							else if(res.cancel){
								
							}
						}
					})
				}
				else if(getApp().globalData.xinxi==1){
					if(this.cheliang_list.length==0){
						uni.navigateTo({
							url: "../xinzheng_chepai/xinzheng_chepai"
						})
					}else{
						uni.navigateTo({
							url: "/pages/modular/baoxiu_list/baoxiu_list"
						})
					}
					
				}else{}
			},
			tiaozhuan_xinzheng_dingdan:function(){
				if(getApp().globalData.xinxi==0){
					uni.showModal({
						title:"提示",
						content:"请登录",
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url:"../../index_4/index_4"
								})
							}
							else if(res.cancel){
								
							}
						}
					})
				}
				else if(this.cheliang_list.length > 0){
					let _this=this
					if(getApp().globalData.public_yonghu_yue<0){
					
						_this.a=1
						console.log(_this.a)
					}
					if(getApp().globalData.public_yonghu_yue>=0){
					uni.navigateTo({
						url: "../xinzheng_dingdan/xinzheng_dingdan"
					})
					}
				}else{
						uni.showModal({
							title: '提示',
							content: "暂车辆信息，请先添加车辆信息。",
							showCancel: false,
							success: function() {
								uni.navigateTo({
									url:"../xinzheng_chepai/xinzheng_chepai?id="+1
								})
							}
						});
				}
				
				
			},
			shuru_jine(e){
				console.log(e.detail.value);
				this.chongzhi_jine=e.detail.value;
			},
			dianji:function(e){
				if(e.detail.value==1)
				{
					this.m=1
				}
				
				else{
				this.chongzhi_jine=e.detail.value;
				this.m=0
				}
			},
			weixin_zhifu(){
				
				this.hideModal();
				let _this=this;
				let data={
					num:_this.chongzhi_jine
				}
				console.log(data)
				if (!(/(^[1-9]\d*$)/.test(_this.chongzhi_jine))) { 
					uni.showModal({
						title: '提示',
						content: "请输入大于50的整数金额",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				if(_this.chongzhi_jine>=50){
					_this.wangluo_qingqiu('/wx/pay/sendipmsfeecharge', data, true, true, 'POST').then(value => {
						if (value) {
							console.log("myBalanceRecharge");
							console.log(value);
							_this.orderNumber = value.orderNumber
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: value.timeStamp,
								nonceStr: value.nonceStr,
								package: value.package,
								signType: value.signType,
								paySign: value.paySign,
								success: function(res) {
									console.log(res)
									
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
				}else{
					uni.showModal({
						title: '提示',
						content: "请输入大于50的整数金额",
						showCancel: false,
						success: function() {}
					});
				}
			},
			huoqu_fuwu_liebiao:function(){
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/getOrdering', null, true, true, 'GET').then(value => {
					if (value) {
						console.log("订单")
						console.log(value)
						_this.dingdan_list = value
						for(let i=0;i<value.length;i++){
							let dingdanItem=value[i];
							let userpay=0;
							if(dingdanItem.carwCondition!=null){
								// 服务总价
								let servicesPrice=0;
								for(let j=0;j<dingdanItem.carwCondition.services.length;j++){
									servicesPrice=Number(servicesPrice)+Number(dingdanItem.carwCondition.services[j].servicePrice)
								}
								if(dingdanItem.tradeState==2){
									_this.dingdan_list[i].discountedPrice=dingdanItem.discountedPrice
									userpay=Number(servicesPrice)-Number(dingdanItem.discountedPrice);
									// console.log('userpay',dingdanItem.discountedPrice)
								}else{
									_this.dingdan_list[i].discountedPrice=0;
									if(dingdanItem.cardName=="晨夜会员"){
										_this.dingdan_list[i].discountedPrice=Number(servicesPrice*0.12).toFixed(2)
										userpay=Number(servicesPrice)-Number(servicesPrice*0.12);
									}else{
										userpay=Number(servicesPrice);
									}
								}
								
							}
							
							if(dingdanItem.carwService!=null){
								// 退钱
								let projectsPrice=0;
								for(let j=0;j<dingdanItem.carwService.projects.length;j++){
									projectsPrice=Number(projectsPrice)+Number(dingdanItem.carwService.projects[j].price)
								}
								if(dingdanItem.payState!=1){
									userpay=Number(userpay)+Number(projectsPrice)
								}
							}
							userpay=userpay.toFixed(2)
							_this.dingdan_list[i].totalFee=userpay;
						}
					}
				})
			},
			boda_dianhua:function(res){
				uni.makePhoneCall({
					phoneNumber: res[0] //仅为示例
				});
			},
			dingdan_xiangqing(orderId,stateName){
				console.log(orderId,stateName);
				// if (stateName=="等待管家接单") {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: "等待管家接单",
				// 		showCancel: false,
				// 		success: function() {}
				// 	});
				// 	return false;
				// }
				uni.navigateTo({
					url:"../dingdan_xiangqing/dingdan_xiangqing?orderId="+orderId,
				})
			}
			
		},
		onShareAppMessage(res) {
			return {
				title: "晨夜车管家",
				path: '/pages/xiche/index/index',
				imageUrl: '/static/img/logo.jpg',
			}
		},
		onShow: function() {
			if(getApp().globalData.public_login_status){
				this.huoqu_chepai_liebiao()
				this.huoqu_souye_xinxi()
			}
		}
	};
</script>

<style>
	page {
		background: #fcf9fc;
	}
	.vipTop{
		width: 100%;
		height: 26vh;
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
		margin-top: -4vh;
		/* background: -webkit-gradient(linear, 0 0, 0 100%, from(red), to(black)); */
		background:#fcf9fc;
		border: #00000000 solid 1rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}
	.chepai{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		padding-top: 40rpx;
	}
	.chepaiLeft{
		width: 220rpx;
		display: flex;
		align-items: center;
		color: #000000;
	}
	.chepaiLeft image{
		width: 50rpx;
		height: 50rpx;
		margin-right: 5rpx;
	}
	.chepaiRight{
		display: flex;
		align-items: center;
		color: #727071;
		font-size: 25rpx;
	}
	.rightAddr{
		width: 430rpx;
		text-align: right;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-right: 10rpx;
	}
	.xicheService{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 30rpx 20rpx;
	}
	.xicheService view{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.xicheService image{
		width: 320rpx;
		height: 350rpx;
	}
	.serviceTitle{
		width: 100%;
		padding-left: 25rpx;
		height: 50rpx;
		line-height: 52rpx;
		font-size: 30rpx;
		font-weight: bold;
		border-left: #c62525 solid 12rpx;
		margin-left: -1rpx;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
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
	/* .phoneBtn{
		text-align: center;
		background-color: #333333;
		color: #FFFFFF;
		width: 15vw;
		padding: 10rpx 0;
		margin-left: 9.5vw;
	}
	.userPasswd{
		height: 5vw;
		text-align: right;
		margin-right: 2vw;
	} */
	
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
