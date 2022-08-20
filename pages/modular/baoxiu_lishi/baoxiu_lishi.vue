<template>
	<view>
		<view class="shuomingTop" >
				{{locationShuoming}}
				<!-- <textarea :value="xiche_jinji_shuoming" placeholder="" /> -->
		</view>
		<view class="huxing_quan" style="width: 96vw;background: #FFFFFF;margin: 2vw;">
		
			<view class="cu-form-group">
				<view class="titleleft">车牌号</view>
				<input type="text" placeholder="请输入车牌号" v-model="cheliang_list.carNum" />
			</view>
		
			<view class="cu-form-group">
				<view class="titleleft">联系人</view>
				<input type="text" placeholder="请输入联系人" v-model="cheliang_list.carContacts" />
			</view>
			
			<view class="cu-form-group"style="border: none;">
				<view class="sexBtn">
					<button @click="input.contactsSex = 0"
						:style="input.contactsSex == 0?'background: #343434;border-color: #343434;color:#FFFFFF;':'background: #FFFFFF;'"
						class="huxing_quan_mini">男士</button>
					<button @click="input.contactsSex = 1"
						:style="input.contactsSex == 1?'background: #343434;border-color: #343434;color:#FFFFFF;':'background: #FFFFFF;'"
						class="huxing_quan_mini">女士</button>
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="titleleft">手机号码</view>
				<input disabled="true" v-model="cheliang_list.contactsPhone" placeholder="请输入手机号码"></input>
				<view class="">
					<button open-type="getPhoneNumber" @getphonenumber="huoqu_shouji"
						class="getPhoneBtn">点击获取手机号</button>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="titleleft locationLeft">当前住址</view>
				<view class="location">
					<view class="cu-form-group shurukuang" @click="huoqu_weizhi_xinxi()">
						<input type="text" placeholder="选择位置" v-model="input.loactionName" disabled="true"/>
						<text class="cuIcon-right rightIcon"></text>
					</view>
					<view class="cu-form-group shurukuang">
						<input type="text" placeholder="楼号/门牌号" v-model="input.memo"/>
					</view>
				</view>
			</view>
			
			<view class="cu-form-group"></view>
		
		</view>
		
		<view class="xiadanBtn">
			<button @click="tijiao_chepai(cheliang_list.carId)"  class="deleteBtn">
				删除车牌
			</button>
			<button @click="tijiao_chepai_xinxi(cheliang_list.carId)" class="saveBtn">
				保存车辆信息
			</button>
			<!-- <view class="">服务将在下单晚19:00至次日06:00之内完成</view> -->
		</view>
		
		
		
		<!-- <view class="huxing_quan" style="width: 96vw;background: #FFFFFF;margin: 2vw;">
			<view class="cu-form-group">
				<view class="title">车牌号：</view>
				<text>{{cheliang_list.carNum}}</text>
			</view>

			<view class="cu-form-group">
				<view class="title">联系人：</view>
				<text>{{cheliang_list.carContacts}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input disabled="true"  >{{cheliang_list.contactsPhone}}</input>
				
			</view>

		</view>

		<view class="huxing_quan"
			style="width: 96vw;height: 40vw;margin: 2vw;">
			<view style="padding:3vw 4vw;padding-top: 5vw;">
				地址
			</view>
			<view class="cu-form-group">
				<view class="title">位置名称：</view>
				<input v-model="input.loactionName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">门牌号：</view>
			    <input type="text" placeholder="请输入门牌号" v-model="input.memo"></input>
			</view>
		</view>
         <view class="cu-form-group padding">
				说明：为保证服务质量，目前仅服务厦门市第十一中学周边1.5公里范围
			</view>
		<button @click="huoqu_weizhi_xinxi()" class="huxing_quan"
			style="width: 96vw;margin: 2vw;background: #2d2d2d;color: #FFFFFF;">选择位置</button>
		<button @click="tijiao_chepai_xinxi(cheliang_list.carId)" v-show="input.carLatitude" class="huxing_quan"
			style="width: 96vw;margin: 2vw;background: #2d2d2d;color: #FFFFFF;">
			保存
		</button>
		<button @click="tijiao_chepai(cheliang_list.carId)"  class="huxing_quan"
			style="width: 96vw;margin: 2vw;background: #2d2d2d;color: #FFFFFF;">
			删除车牌
		</button> -->
       
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				input: {
					carNum: "", //车牌
					carContacts: "", //姓名
					contactsSex: 0, //男：0；女：1；未知：2
					contactsPhone: "", //电话
					loactionName: "", //位置名称
					memo: "", //详细地址
					carLongitude: "", //经度
					carLatitude: "" //维度
				},
				cheliang_list :[],
				locationShuoming:'',
			};
		},
		onLoad: function() {
			let _this = this
		},
		methods: {
			huoqu_weizhi_xinxi: function() {
				let _this = this
				// uni.chooseLocation({
				// 	success: function(res) {
				// 		// console.log('位置名称：' + res.name);
				// 		// console.log('详细地址：' + res.address);
				// 		// console.log('纬度：' + res.latitude);
				// 		// console.log('经度：' + res.longitude);

				// 		_this.input.loactionName = res.name
				// 		_this.input.memo = res.address
				// 		_this.input.carLongitude = res.longitude
				// 		_this.input.carLatitude = res.latitude
				// 	}
				// });


				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userLocation']) {
							uni.authorize({
								scope: 'scope.userLocation',
								success() {
									uni.chooseLocation({
										success: function(res) {
											_this.input.loactionName = res.name
											_this.input.memo = ''
											_this.input.carLongitude = res.longitude
											_this.input.carLatitude = res.latitude
											console.log(_this.input)
										}
									});
								}
							})
						} else {
							uni.chooseLocation({
								success: function(res) {
									_this.input.loactionName = res.name
									_this.input.memo = ''
									_this.input.carLongitude = res.longitude
									_this.input.carLatitude = res.latitude
									console.log(_this.input)
								}
							});
						}
					}
				})
			},
            tijiao_chepai(res){
				let _this = this
				console.log(res)
				let data = {
					carId:res,
				}
				console.log(data)
				uni.showModal({
					title: '提示',
					content: '是否删除该车牌？',
					success: function (showres) {
						if (showres.confirm) {
							console.log('用户点击确定');
							_this.wangluo_qingqiu('/wx/carw/deleteCar', data, true, true, 'post').then(value => {
								console.log(value)
								if(value==1){
									uni.navigateBack({})
								}
								if(value==0){
									uni.showModal({
										title:'提示',
										content:'该车正在服务中，无法删除',
										showCancel:false,
										success() {
											// uni.navigateTo({
											// 	url:"../baoxiu_list/baoxiu_list"
											// })
										}
									})
								}
							})
						} else if (showres.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
				// uni.showModal({
				// 	title: '提示',
				// 	content: "是否删除车牌",
				// 	// showCancel: false,
				// 	success: function() {
				// 		if (res.confirm) {
				// 			_this.wangluo_qingqiu('/wx/carw/deleteCar', data, true, true, 'post').then(value => {
				// 				console.log(value)
				// 				if(value==1){
				// 					uni.navigateBack({})
				// 				}
				// 				if(value==0){
				// 					uni.showModal({
				// 						title:'提示',
				// 						content:'该车正在服务中，无法删除',
				// 						showCancel:false,
				// 						success() {
				// 							uni.navigateTo({
				// 								url:"../baoxiu_list/baoxiu_list"
				// 							})
				// 						}
				// 					})
				// 				}
				// 			})
				// 		}else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
						
				// 	}.bind(this)
				// });	
			},
			huoqu_shouji: function(res) {
				let _this = this
				let encryptedData = res.detail.encryptedData
				if (!_this.isEmpty(encryptedData)) {
					let iv = res.detail.iv
					let data = {
						encryptedData: encryptedData,
						iv: iv,
					}
					_this.wangluo_qingqiu('/wx/user/phone', data, true, true, 'POST').then(value => {

						if (value) {
							_this.wangluo_qingqiu('/wx/carw/getPhoneNo', null, true, true, 'GET').then(value => {
								if (value) {
									_this.input.contactsPhone = value.userPhone
								}
							})
						}

					})
				} else {}
			},

			tijiao_chepai_xinxi: function(res) {
				let _this = this
				const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
				   
				if (!_this.cheliang_list.carContacts) {
					uni.showModal({
						title: '提示',
						content: "姓名不能为空",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				if (!(/^[0-9]{11}$/.test(_this.cheliang_list.contactsPhone))) {
					uni.showModal({
						title: '提示',
						content: "手机号有误，请重填",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				if (!reg.test(_this.cheliang_list.carNum)) {
					uni.showModal({
						title: '提示',
						content: "车牌填写有误，请重填",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				if(!_this.input.carLatitude){
					uni.showModal({
						title: '提示',
						content: "请选择位置",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				if (!_this.input.memo) {
					uni.showModal({
						title: '提示',
						content: "门牌号不能为空，请重填",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				
				
				
				console.log(res)
				let data = {
					carNum:_this.cheliang_list.carNum,
					carContacts: _this.cheliang_list.carContacts,
					loactionName: _this.input.loactionName,
					contactsPhone: _this.cheliang_list.contactsPhone,
					memo: _this.input.memo,
					carLongitude: _this.input.carLongitude.toString(),
					carLatitude: _this.input.carLatitude.toString(),
					carId:_this.cheliang_list.carId,
					contactsSex: _this.input.contactsSex,
				}
				uni.showLoading({
					title: '提交信息中'
				});
				console.log(data)
				_this.wangluo_qingqiu('/wx/carw/updateCarInfo', data, true, true, 'post').then(value => {
					console.log(value)
					if(value==0){
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: "不好意思，您的地址已超出服务范围。请重新选择位置",
							showCancel: false,
							success: function() {
							}
						});
					}
					if (value==1) {
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: "提交完成。",
							showCancel: false,
							success: function() {
								uni.navigateBack({
								})
							}
						});
					}
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: "晨夜车管家",
				path: '/pages/xiche/index/index',
				imageUrl: '/static/img/logo.png',
			}
		},
		onLoad(a) {
			console.log(a)
			let _this = this
			let data= {
				carId:a.carId
			}
			_this.wangluo_qingqiu('/wx/carw/getCarInfo', data, true, true, 'GET').then(value => {
				if (value) {
					
					_this.cheliang_list = value
					console.log("车辆2")
					console.log(value)
					_this.input.loactionName=value.loactionName
					_this.input.memo=value.memo
					_this.input.contactsSex=value.contactsSex
					_this.input.carLongitude=value.carLongitude					
					_this.input.carLatitude=value.carLatitude
				}
			})
			_this.wangluo_qingqiu('/wx/carw/getLocation', null, true, true, 'GET').then(value2 => {
				if (value2) {
					_this.locationShuoming=value2;
					console.log(_this.locationShuoming)
				}
			})
		},
		onShow: function() {


		}

	};
</script>

<style>
	page {
		background: #FFFFFF;
	}
	.shuomingTop{
		width: 100%;
		padding: 20rpx 40rpx;
		background: #fafafa;
		font-size: 26rpx;
		color: #b1b1b1;
	}
	.titleleft{
		width: 180rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
	}
	.sexBtn{
		/* height: 110rpx; */
		margin-left: 160rpx;
		width: 300rpx;
		display: flex;
		align-items: center;
		margin-top: -25rpx;
		/* border: #007AFF solid 1rpx; */
	}
	.huxing_quan_mini{
		font-size: 26rpx;
		padding: 3rpx 23rpx !important;
		height: 50rpx;
		line-height: 45rpx;
		border-radius: 25rpx;
		border: #dedede solid 1rpx;
		color: #989898;
	}
	.getPhoneBtn{
		border: #c72723 solid 1rpx;
		background: #fdf6f6;
		color: #c72723;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 25rpx;
		padding: 0 10rpx;
		margin-right: -10rpx;
	}
	.locationLeft{
		height: 200rpx;
		/* border: #007AFF solid 1rpx; */
	}
	.location{
		width: 550rpx;
		margin-right: -35rpx;
		/* border: #007AFF solid 1rpx; */
	}
	.shurukuang{
		padding-left: 8rpx !important;
		/* border: #007AFF solid 1rpx; */
	}
	.rightIcon{
		margin-right: -20rpx;
		width: 50rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		/* border: #007AFF solid 1rpx; */
		color: #DDDDDD;
		font-size: 28rpx !important;
	}
	.xiadanBtn{
		width: 100%;
		position: fixed;
		bottom: 0rpx;
		padding-bottom: 30rpx;
		padding-top: 10rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		/* background: #f1f1f1; */
	}
	.xiadanBtn button{
		border-radius: 8rpx;
	}
	.deleteBtn{
		width: 25vw;
		margin: 2vw;
		background: #ca020a;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	.saveBtn{
		width: 65vw;
		margin: 2vw;
		background: #2d2d2d;
		color: #FFFFFF;
		font-size: 30rpx;
	}
</style>
