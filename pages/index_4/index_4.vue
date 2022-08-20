<template>
	<view >
		<view :class="isHuiyuan?'UserInfo':'UserInfo2'">
			<!-- 头像 -->
			<view class="profilePicture">
				<image v-bind:src="avatar" id="profileImage"></image>
			</view>
			<!-- 总信息 -->
			<view class="totalInfo">
				<!-- 名字和会员等级部分 -->
				<view v-if="a==1" class="name" >
					{{name}}
				</view>
				<view v-if="a!=1" class="name2" @click="login()" >
					点击登录
				</view>
				<view class="huiyuanIcon" v-if="a==1">
					<view :class="isHuiyuan?'huiyuanLY':'huiyuanLR'">
						<image src="../../static/ico/xingxing.png" mode=""></image>
						<text v-if="!isHuiyuan">普通会员</text>
						<text v-if="isHuiyuan">晨夜会员</text>
					</view>
					<view class="huiyuanR" v-if="nowMemberType==2">到期时间：{{huiyuanTime}}</view>
					<view class="huiyuanR" v-if="nowMemberType==3">过期时间：{{huiyuanTime}}</view>
				</view>
			</view>
		</view>
		<view class="huiyuan">
			<view class="huiyuanLeft">
				<view class="huiyuanName">晨夜VIP会员</view>
				<view class="huiyuanZhekou">限时4.0折起</view>
			</view>
			<button class="cu-btn round bottomBtn" v-if="nowMemberType==1&&(!havePhoneNum)" open-type="getPhoneNumber" @getphonenumber="huoqu_shouji">即享优惠</button>
			<button class="cu-btn round bottomBtn" v-if="nowMemberType==1&&havePhoneNum" @click="chongzhihuiyuan()">即享优惠</button>
			<button class="cu-btn round bottomBtn" v-if="nowMemberType==0" @click="weidenglu()">即享优惠</button>
			<button class="cu-btn round bottomBtn" v-if="nowMemberType==2" @click="chongzhihuiyuan()">立即续费</button>
			<button class="cu-btn round bottomBtn" v-if="nowMemberType==3" @click="chongzhihuiyuan()">立即续费</button>
			<!-- <button type="default">既享优惠</button> -->
		</view>
		<view class="cu-list menu">
			<!-- <view class="cu-item"  v-if="a==0" @click="login">
				<view class="content">
					<text class="cuIcon-camera text-blue"></text>
					<text class="text-grey">  登录</text>
				</view>
				<view class="action"><text class="text-grey text-sm cuIcon-right"></text></view>
			</view>
						
			<view class="cu-item"  v-if="a==1">
				<view class="content">
					<text class="cuIcon-pay text-blue"></text>
					<text class="text-grey">我的余额：{{yonghu_yue}}</text>
				</view>
				<view class="" @tap="showModal" data-target="Modal">点击充值</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">余额充值</view>
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
						<input type="text" class="researchText" placeholder="输入不小于50元的充值金额" 
							 confirm-type="search" v-model="inputValue" @input="shuru_jine"  @confirm="weixin_zhifu"></input>
						</view>
											
						</view>
									
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-green margin-tb-sm lg"  @tap="weixin_zhifu">微信支付</button>
					</view>
				</view>
			</view> -->
			
            <view @longpress="tiaoshi_moshi()" class="cu-item" @click="tiaozhuan_wode_baoxiu()">
				<view class="content">
					<text class="cuIcon-settings text-blue"></text>
					<text class="text-grey">车牌管理</text>
				</view>
				<view class="action"><text class="text-grey text-sm cuIcon-right"></text></view>
			</view>
			<view @longpress="tiaoshi_moshi()" class="cu-item" @click="tiaozhuan_wode_guanyu()">
				<view class="content">
					<text class="cuIcon-info text-blue"></text>
					<text class="text-grey">关于小程序</text>
				</view>
				<view class="action"><text class="text-grey text-sm cuIcon-right"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName:"",
				chongzhi_jine:'0',
				yonghu_yue:0,
				orderNumber:"",
				avatar:'../../static/img/logo.jpg',
				name:"",
				a:"",
				m:'',
				inputValue:'',
				isHuiyuan:false,
				huiyuanTime:'',
				nowMemberType:0,
				havePhoneNum:false,
			};
		},
		methods: {
			login(){
				console.log("登录中")
				let that = this
				debugger
				uni.getUserProfile({
					desc:'登录',
					success:(res)=>{	
						console.log(res);
						let msg = res.userInfo; 
						console.log(msg)
						let data = {
							userAvatar: msg.avatarUrl,
							userName: msg.nickName,
						};
						console.log(data)
						that.wangluo_qingqiu('/wx/carw/updateUser', data,true, true, 'POST').then(value => {
							if (value) {
								console.log(value)
								getApp().globalData.xinxi=1
								uni.showTabBar(); //显示tab
								that.yonghuxinxi()
							}
						});
					},
					fail:(err)=>{
						console.log(err);
						uni.showToast({title:"微信登录授权失败",icon:"none"});
						var wait = setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},2000);
						
					}
				})
			},
			chakan_yue(){
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/userBalance', null, true, true, 'GET').then(value => {
					console.log("userBalance")
					console.log(value)
					if (value) {
						_this.yonghu_yue = value
						_this.a=getApp().globalData.xinxi
						
					}
				})
				
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
			huoqu_shouji: function(res) {
				console.log(res)
				 console.log(res.detail.code)
				if(!res.detail.iv){
					uni.showModal({
						title: '提示',
						content: "获取失败，请重新获取。",
						showCancel: false,
						success: function() {
							// uni.navigateBack({
							// 	delta:1
							// })
							var wait = setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},2000);
						}
					})
				}
				else{
					let _this = this
					let encryptedData = res.detail.encryptedData
					let iv = res.detail.iv
					let data = {
						encryptedData: encryptedData,
						iv: iv,
					}
					console.log(data)
					_this.wangluo_qingqiu('/wx/user/phone', data, true, true, 'POST').then(value1 => {
						console.log(value1)
						if (value1.has_phone) {
							_this.wangluo_qingqiu('/wx/carw/getPhoneNo', null, true, true, 'GET').then(value2 => {
								if (value2) {
									let data2 = {
										userPhone: value2.userPhone,
									};
									console.log(data2)
									_this.wangluo_qingqiu('/wx/carw/updateUser', data2,true, true, 'POST').then(value => {
										if (value) {
											uni.navigateTo({
												url:'../xiche/chongzhihuiyuan/chongzhihuiyuan'
											})
										}
									});
								}
							})
							// uni.navigateTo({
							// 	url:'../xiche/chongzhihuiyuan/chongzhihuiyuan'
							// })
						}
					})
				}
				
			},
			weidenglu(){
				uni.showModal({
					title: '提示',
					content: "需要登录后才能进行操作",
					showCancel: false,
					success: function() {}
				});
			},
			chongzhihuiyuan(){
				uni.navigateTo({
					url:'../xiche/chongzhihuiyuan/chongzhihuiyuan'
				})
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.inputValue=''
				console.log(this.modalName)
			},
			hideModal(e) {
				this.modalName = null
			},
			tiaozhuan_denglu:function(){
				uni.navigateTo({
					url:"../guanli/denglu/denglu"
				})
			},
			//车牌管理
			tiaozhuan_wode_baoxiu: function() {
				if(this.a!=1){
					this.weidenglu()
				}else{
					uni.navigateTo({
						url: "../modular/baoxiu_list/baoxiu_list"
					})
				}
			},
			//关于小程序
			tiaozhuan_wode_guanyu:function(){
				uni.navigateTo({
					url: "../modular/wode_guanyu/wode_guanyu"
				})
			},
			
			yonghuxinxi(){
				let _this=this
				_this.a=getApp().globalData.xinxi
				console.log(_this.a)
				if(_this.a==1){
					_this.wangluo_qingqiu('/wx/carw/getUserInfo',null,true,true,'get').then(res => {
						if(res){
							console.log(res)
							_this.avatar=res.userAvatar;
							_this.name=res.userName;
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
							if(res.userPhone.length==11){
								_this.havePhoneNum=true
							}else{
								_this.havePhoneNum=false
							}
						}
					})
				}
			},
			tiaoshi_moshi:function(){
				uni.showModal({
					title: '提示',
					content: "进入调试模式！",
					showCancel: false,
					success: function() {
						getApp().globalData.public_debug = []
						getApp().globalData.public_tiaoshi_moshi = true
					}
				});
			}

		},
		onLoad() {
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
						}
					})
				}
			})
		},
		onShow: function() {
			if(getApp().globalData.xinxi==1){
				this.chakan_yue();
				uni.showTabBar(); //显示tab
			}else{
				uni.hideTabBar(); //隐藏tab
			}
			this.yonghuxinxi();
		}
	};
</script>

<style>
	page{
		position: relative;
		padding: 0;
	}
	.researchScript{
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding:10rpx;
		margin-top: 20rpx;
	}
	/* 搜索框 */
	.researchText{
		width: 100%;
		height: 80%;
		text-align: center;
		background-color: #eeeeee;
		border-radius: 50rpx;
		font-size: 31rpx;
	}
	/* 登陆人员信息（头像、昵称、会员、账户余额等） */
	.UserInfo {
		display: flex;
		align-items: center;
		height: 300rpx;
		width: 750rpx;
		padding-top: 5rpx;
		background: #dcdcdc;
		background-image: url(../../static/img/jin.png);
		background-size: 100%;
	}
	.UserInfo2{
		display: flex;
		align-items: center;
		height: 300rpx;
		width: 750rpx;
		/* padding-top: 5rpx; */
		background: #dcdcdc;
		background-image: url(../../static/img/yin.png);
		background-size: 100%;
	}
	
	/* 头像图片展示 */
	#profileImage {
		border: #FFFFFF 1rpx solid;
		/* margin-top: 25rpx; */
		margin-left: 25rpx;
		height: 160rpx;
		width: 160rpx;
		border-radius: 100rpx 100rpx 100rpx 100rpx;
	}
	
	.avatarImg {
		border: #FFFFFF 1rpx solid;
		height: 160rpx;
		width: 160rpx;
		border-radius: 100rpx;
		overflow: hidden;
	}
	
	/* 头像右边文字部分 */
	.totalInfo {
		/* height: 200rpx; */
		width: 500rpx;
		/* margin-top: 35rpx; */
		margin-left: 25rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	
	/* 名字的显示样式 */
	.name {
		width: 100%;
		font-size: 38rpx;
		font-weight: bold;
		padding-left: 10rpx;
		/* border: #FF0000 solid 1rpx; */
	}
	.name2{
		width: 100%;
		padding-left: 10rpx;
		font-size: 38rpx;
		font-weight: bold;
		/* border: #FF0000 solid 1rpx; */
	}
	.huiyuanIcon{
		width: 100%;
		/* height: 110rpx; */
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		/* border: #FF0000 solid 1rpx; */
	}
	.huiyuanLR{
		font-size: 25rpx;
		color: #FFFFFF;
		height: 42rpx;
		line-height: 42rpx;
		padding: 5rpx;
		width: 160rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 20rpx;
		background: #FF0000;
		display: flex;
		align-items: center;
	}
	.huiyuanLR image{
		height: 28rpx;
		width: 28rpx;
		margin-right: 10rpx;
	}
	.huiyuanLY{
		font-size: 25rpx;
		color: #FFFFFF;
		height: 40rpx;
		line-height: 40rpx;
		padding: 5rpx;
		width: 160rpx;
		border: 1rpx solid #FFFFFF;
		border-radius: 20rpx;
		/* background: #FF0000; */
		background: linear-gradient(to right,#c48f29, #efbc57,#c48f29);
		display: flex;
		align-items: center;
	}
	.huiyuanLY image{
		height: 28rpx;
		width: 28rpx;
		margin-right: 10rpx;
	}
	
	.huiyuanR{
		color: #998152;
		font-size: 23rpx;
		margin-top: 12rpx;
	}
	.huiyuan{
		position: relative!important;
		z-index: 99!important;
		margin-top: -30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: linear-gradient(#ec0000, #000);
		height: 130rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding-bottom: 5rpx;
	}
	.huiyuanLeft{
		display: flex;
		align-items: center;
		color: #FFFFFF;
		height: 100%;
		padding-bottom: 30rpx;
	}
	.huiyuanName{
		font-size: 32rpx;
		margin-left: 15rpx;
	}
	.huiyuanZhekou{
		margin-left: 15rpx;
		font-size: 25rpx;
		padding: 0 10rpx;
		height: 35rpx;
		line-height: 35rpx;
		background: #FF0000;
		border: #FF0000 solid 1rpx;
		border-top-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}
	.bottomBtn{
		color: #b10000;
		width: 180rpx;
		font-size: 26rpx !important;
		margin-right: 50rpx;
	}
	
</style>
