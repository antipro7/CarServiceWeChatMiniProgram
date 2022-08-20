<template>
	<view>
		<view class="shuoming" style="color: #ca0209;">
			{{getExplanation}}
			<!-- <textarea :value="xiche_jinji_shuoming" placeholder="" /> -->
		</view>
		<view class="huxing_quan" style="width: 98vw;background: #FFFFFF;margin: 1vw;margin-top: 0;">
			<view  class="cu-form-group" @tap="priceImg">
				<view class="titleleft">价目表</view>
				<view class="titleCenter" style="color: #54a8fc;">
					点击查看
				</view>
				<text class="rightIcon"></text>
			</view>
			<view class="cu-form-group">
				<view class="titleleft">上门时间</view>
				<view class="titleCenter">
					<picker @change="xiche_jiage_xuanzhe" :value="xiche_jiage_dangqian" :range="xiche_jiage_liebiao">
						<view class="pickerContent">
							{{xiche_jiage_liebiao[xiche_jiage_dangqian]}}
						</view>
					</picker>
				</view>
				<text class="cuIcon-right rightIcon"></text>
				
			</view>
			<!-- <view class="cu-form-group">
				<view class="titleleft">车辆信息</view>
				<view class="titleCenter">
					选择车辆
				</view>
				<text class="cuIcon-right rightIcon"></text>
			</view> -->
			<view class="cu-form-group" @click="selectCard">
				<view class="titleleft cheliangMess">车辆信息</view>
				<view class="titleCenter">
					<view class="carCard">
						<view class="cardTop">{{cheliang_list.carNum}}</view>
						<view class="cardMess">{{cheliang_list.loactionName}}({{cheliang_list.memo}})</view>
						<view class="cardMess">{{cheliang_list.carContacts}} {{cheliang_list.contactsPhone}}</view>
					</view>
				</view>
				<text class="cuIcon-right rightIcon"></text>
				<!-- <view class="" v-for="item in cheliang_list" :key="item.value"
					@click="cheliang_xuanzhe = item.carId"
					:style="cheliang_xuanzhe == item.carId?'background: #d4d4d4;':'background: #FFFFFF;'"
					style="width: 96vw;margin: 2vw;padding: 2vw;font-size: 1.2rem;">
					<view>{{ item.carNum }}</view>
					<view>{{ item.loactionName }}</view>
					<view>{{ item.memo }}</view>
					<view>{{ item.carContacts }} {{ item.contactsPhone }}</view>
				</view> -->
			</view>
			
			<view class="cu-form-group">
				<view class="titleleft">备注</view>
				<input type="text"  v-model="beizhu" placeholder="请输入备注信息"/>
			</view>
			<view class="cu-form-group"></view>
		</view>

		
         
		<view class="kong"></view>
		<view class="xiadanBtn">
			<button @click="clickFreeOrder()" class="huxing_quan"
				style="width: 94vw;margin: 3vw;margin-bottom: 0; background: #2d2d2d;color: #FFFFFF;">
				一键免费下单
			</button>
			<!-- <view class="">服务将在下单晚19:00至次日06:00之内完成</view> -->
		</view>
		
		
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog cu-dialog-padding" @tap.stop="">
				
				<view class="vipContent">
					<view class="vipTitle">
						<view>晨夜服务</view>
						<text class="cuIcon-close" @click="hideModal()"></text>
					</view>
					<view class="vipPrice">
						<!-- _this.getPrice[_this.xiche_jiage_dangqian].dictLabel -->
						<text>¥</text>{{getPrice[xiche_jiage_dangqian].dictLabel}}
					</view>
					<view class="quanyiTitle"><text>一键洗车&emsp;订单预付金</text></view>
					<view class="zhifu_shuoming">
						<view>
							服务结束后将原路退还多余部分金额,
						</view>
						<view>具体服务内容由管家根据您车辆的具体情况进行确认。</view>
					</view>
					<view class="zhifufangshi">
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
						<button class="cu-btn margin-tb-sm lg round bottomBtn" @click="tijiao_xiche_dingdan()">确认并支付</button>
					</view>
					<view class="bottomText">
						<view class="text1">管家将于今日晚19:00至次日早06:00内为您上门服务</view>
					</view>
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
				xiche_fangshi_dangqian: 0,
				xiche_fangshi_liebiao: [
					"外观洗", "全车洗","精致洗"],
				jiage_xianzhi:0,
				
				xiche_jiage_dangqian: 0,
				xiche_jiage_liebiao: ['50元以内','100元以内'],
				getPrice:[],
				
				xiche_jinji_dangqian: 0,
				xiche_jinji_liebiao: [
					"否", "是"
				],
				xiche_jinji_shuoming:"服务将在下单日晚8：00至次日早晨6：00完成。",
				// {{cheliang_list[0].contactsPhone}}</view>
				cheliang_list: {
					'carNum':'加载中...',
					'loactionName':'加载中...',
					'contactsPhone':'加载中...',
					'carContacts':'加载中...',
					'memo':''
				},
				cheliang_xuanzhe: -1,
				dingdan_num:0,
				beizhu:"",
				a:"",
				input:{
					loactionName: "", //位置名称
					memo: "", //详细地址
					carLongitude: "", //经度
					carLatitude: "" //维度
				},
				b:'',
				//显示支付提示窗口ChooseModal
				modalName:'',
				getExplanation:'',
				carId:0,
				carNumisNull:true,
			};
		},
		onShow: function() {
			let _this = this
			_this.xiche_jiage_huoqu();
			
			// 获取选中的车牌
			if(_this.carId==0){
				_this.huoqu_chepai_liebiao()
			}else{
				uni.showLoading({
					title: '信息加载中'
				});
				setTimeout(()=>{
					uni.hideLoading();
				},500)
				let data= {
					carId:_this.carId
				}
				console.log(data)
				_this.wangluo_qingqiu('/wx/carw/getCarInfo', data, true, true, 'GET').then(value => {
					
					if (value) {
						_this.cheliang_list = value
						console.log("车牌id",value.carId)
						console.log(_this.cheliang_list)
						// _this.input.loactionName=value.loactionName
						// _this.input.memo=value.memo
						// _this.input.contactsSex=value.contactsSex
						
						let data2={
							carNum:value.carNum,
						}
						_this.wangluo_qingqiu('/wx/carw/checkCarNumIsOrdering', data2, true, true, 'GET').then(value2 => {
							
							console.log(data2,value2)
							if (value2==1) {
								_this.carNumisNull=false;
								console.log(value2)
							}else{
								_this.carNumisNull=true;
							}
						})
					}
				})
			}
			
			// 获取服务中的订单数量
			_this.wangluo_qingqiu('/wx/carw/getOrdering', null, true, true, 'GET').then(value => {
				if (value) {
					_this.dingdan_num = value.length
					console.log("服务中的订单数量")
					console.log(value.length)
				}
			})
			getApp().globalData.xiche_jiamubiao[0]=getApp().globalData.public_server_url+'/profile/upload/price/priceList.jpg?v='+Math.random();
			// getApp().globalData.xiche_jiamubiao[0]=getApp().globalData.public_server_url+'/profile/upload/2022/06/01/a40b16f67d8fedab73d1d8a0a2f49892.jpg';
			// _this.huoqu_xiche_fangshi()
			// _this.huoqu_xiche_jiage()
			// _this.huoqu_xiche_qiangdu()
		},
		methods: {
			selectCard(){
				uni.navigateTo({
					url:'../selectCar/selectCar?carId='+this.cheliang_list.carId
				})
			},
			hideModal(){
				this.modalName=''
			},
			showTheModal(){
				let _this=this;
				// if (_this.cheliang_xuanzhe < 0) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: "请选择车辆",
				// 		showCancel: false,
				// 		success: function() {}
				// 	});
				// 	return false;
				// }
				
				if(_this.dingdan_num>=2){
					uni.showModal({
						title: '提示',
						content: "您已有两个或以上的订单正在进行中，请结束后再试",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				this.modalName='ChooseModal';
			},
			priceImg(){
				//先构造要预览的图片数组
				//https://car-weapp-api.quanxiapp.com/profile/upload/priceList.jpg
				// const urls = ['https://thirdwx.qlogo.cn/mmopen/vi_32/9xkaQhBrbjLEVHsrJMlxfLvibfWvFnbu10KicFdhElyFkscBxiaxZTcViaCPRUuOgjA0HqU0Ju1N3PXT3Z86MqXZEg/132',];
				// const urls = ['https://car-weapp-api.quanxiapp.com/profile/upload/priceList.jpg',];
				const urls = getApp().globalData.xiche_jiamubiao;
				const current = 0;
				console.log("打开图片",urls)
				uni.previewImage({
					urls,
					current,
				    // longPressActions: {
				    //     itemList: ['发送给朋友', '保存图片', '收藏'],
				    //     success: function(data) {
				    //         console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) +
				    //             '张图片');
				    //     },
				    //     fail: function(err) {
				    //         console.log(err.errMsg);
				    //     }
				    // }
				});
			},
			xiche_jiage_huoqu(){
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/getPrice', null, true, true, 'GET').then(value => {
					console.log("/wx/carw/getPrice")
					console.log(value)
					if (value) {
						// _this.xiche_jiage_liebiao = value.map(item=>item.dictLabel+'元以内');
						_this.xiche_jiage_liebiao = value.map(item=>item.dictLabel);
						_this.getPrice=value;
						console.log(_this.xiche_jiage_liebiao)
					}
				})
				_this.wangluo_qingqiu('/wx/carw/getExplanation', null, true, true, 'GET').then(value2 => {
					console.log("/wx/carw/getExplanation")
					console.log(value2)
					if (value2) {
						// _this.xiche_jiage_liebiao = value.map(item=>item.dictLabel);
						_this.getExplanation=value2;
					}
				})
			},
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
											_this.input.memo = res.address
											_this.input.carLongitude = res.longitude
											_this.input.carLatitude = res.latitude
											console.log(_this.input.memo)
										},
										
									});
								}
							})
						} else {
							uni.chooseLocation({
								success: function(res) {
									_this.input.loactionName = res.name
									_this.input.memo = res.address
									_this.input.carLongitude = res.longitude
									_this.input.carLatitude = res.latitude
								}
							});
						}
					}
				})
			},
			
			// xiche_fangshi_xuanzhe(e) {
			// 	this.xiche_fangshi_dangqian = e.detail.value
			// 	this.xiche_jiage_dangqian=1
			// 	this.xiche_jinji_dangqian=0
			// 	this.xiche_jinji_shuoming="服务将在下单日晚8：00至次日早晨6：00完成。"
			// 	if(e.detail.value==0){
			// 		this.xiche_jiage_liebiao = ["0元","50元以内"]
			// 	}else if(e.detail.value==1){
			// 		this.xiche_jiage_liebiao = ["0元","100元以内"]
			// 	}else if(e.detail.value==2){
			// 		this.xiche_jiage_liebiao = ["0元","500元以内"]
			// 	}else{
					
			// 	}
				
			// },
			xiche_jiage_xuanzhe(e) {
				this.xiche_jiage_dangqian = e.detail.value
			},
			xiche_jinji_xuanzhe(e) {
				 this.a=e.detail.value
				if(this.a==0){
					this.xiche_jinji_dangqian = this.a
					this.xiche_jinji_shuoming="服务将在下单日晚8：00至次日早晨6：00完成。"
				}else{
					this.xiche_jinji_dangqian = this.a
					this.xiche_jinji_shuoming="紧急服务将多收取20元调度费用。"
				}
				if(this.xiche_fangshi_dangqian==2&&this.a==1){
					this.xiche_jinji_dangqian = 0
					this.xiche_jinji_shuoming="服务将在下单日晚8：00至次日早晨6：00完成。"
					uni.showModal({
						title: '提示',
						content: '非常抱歉，由于精致洗耗时较久，需要预约，无法执行紧急服务。',
						showCancel: false,
						success: function (res) {
							
						}
					});
				}
			},
			huoqu_chepai_liebiao: function() {
				let _this = this
				_this.wangluo_qingqiu('/wx/carw/getCar', null, true, true, 'GET').then(value => {
					if (value) {
						_this.cheliang_list = value[0]
						_this.carId=value[0].carId;
						console.log("车辆列表",_this.carId)
						console.log(value)
						let data={
							carNum:_this.cheliang_list.carNum
						}
						_this.wangluo_qingqiu('/wx/carw/checkCarNumIsOrdering', data, true, true, 'GET').then(value2 => {
							
							console.log(data,value2)
							if (value2==1) {
								_this.carNumisNull=false;
							}else{
								_this.carNumisNull=true;
							}
						})
					}
				})
			},
			
			// huoqu_xiche_fangshi: function() {
			// 	let _this = this
			// 	let data = {
			// 		dictKey: "carw_wash_type"
			// 	}
			// 	_this.wangluo_qingqiu('/wx/carw/getDictValue', data, true, true, 'GET').then(value => {
			// 		if (value) {
			// 			_this.xiche_fangshi_liebiao = value
			// 			console.log("getDictValue")
			// 			console.log(value)
			// 		}
			// 	})
			// },
			// huoqu_xiche_jiage: function() {
			// 	let _this = this
			// 	let data = {
			// 		dictKey: "carw_price_limit"
			// 	}
			// 	_this.wangluo_qingqiu('/wx/carw/getDictValue', data, true, true, 'GET').then(value => {
			// 		if (value) {
			// 			_this.xiche_jiage_liebiao = value
			// 			console.log("价格")
			// 			console.log(value)
			// 		}
			// 	})
			// },
			// huoqu_xiche_qiangdu: function() {
			// 	let _this = this
			// 	let data = {
			// 		dictKey: "carw_is_urgent"
			// 	}
			// 	_this.wangluo_qingqiu('/wx/carw/getDictValue', data, true, true, 'GET').then(value => {
			// 		if (value) {
			// 			_this.xiche_jinji_liebiao = value
			// 			console.log("紧急")
			// 			console.log(value)
			// 		}
			// 	})
			// },
			
			clickFreeOrder() {
				const _this = this
				uni.showModal({
					titile:'提示',
					content:'管家将于今晚18:30后开始接单，管家接单后会立即与您电话联系，请保持您的手机畅通，非常感谢您的支持',
					success: res => {
						const { confirm, cancel } = res
						if (cancel) {
							uni.navigateBack({})
							return
						}

						if (confirm) {
							_this.tijiao_xiche_dingdan()
							return
						}
					}
				})
			},
			
			tijiao_xiche_dingdan: function() {
				
				let _this = this
				// if (_this.yonghu_yue < 0) {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: "您的余额为负，请先进行充值",
				// 		showCancel: false,
				// 		success: function() {
				// 			uni.switchTab({
				// 				url:"../../index_4/index_4"
				// 			})
				// 		}
				// 	});
				// 	return false;
				// }

				if (!_this.carNumisNull) {
					uni.showModal({
						title: '提示',
						content: "该车牌已有订单正在进行中",
						showCancel: false,
						success: function() {}
					});
					return false;
				}
				
				if(_this.dingdan_num>2){
					uni.showModal({
						title: '提示',
						content: "您已有三个或以上的订单正在进行中，请结束后再试",
						showCancel: false,
						success: function() {}
					});
				}else{
					//价格限制
					// let jiage_xianzhi=0;
					// if(_this.xiche_fangshi_dangqian!=2&&_this.xiche_jiage_dangqian==0){
					// 	jiage_xianzhi=1//外观洗、全车洗，0元
					// }else if(_this.xiche_fangshi_dangqian==0&&_this.xiche_jiage_dangqian==1){
					// 	jiage_xianzhi=3//外观洗，50元以内
					// }else if(_this.xiche_fangshi_dangqian==1&&_this.xiche_jiage_dangqian==1){
					// 	jiage_xianzhi=5//全车洗，100元以内
					// }else{}
					// //洗车方式
					// let xiche_fangshi=0;
					// if(_this.xiche_fangshi_dangqian==0){
					// 	xiche_fangshi=3//外观洗
					// }else if(_this.xiche_fangshi_dangqian==1){
					// 	xiche_fangshi=1//全车洗
					// }else if(_this.xiche_fangshi_dangqian==2){
					// 	xiche_fangshi=5//精致洗
					// 	jiage_xianzhi=7//精致洗，500元以内
					// }else{}
					// //是否紧急
					// let shifoujinji=0;
					// if(_this.xiche_jinji_dangqian==1){
					// 	shifoujinji=1//紧急
					// }else{
					// 	shifoujinji=3//不紧急
					// }
					let arr = _this.cheliang_list
			 
			        //遍历数组
			 
			        for (let i = 0; i < arr.length; i++) {
			            //在页面上运行
			            console.log(_this.cheliang_list[i])
						if(_this.cheliang_xuanzhe==_this.cheliang_list[i].carId){
							_this.b=_this.cheliang_list[i].memo
						}
			 
			        }
					uni.requestSubscribeMessage({
						tmplIds: [
							'qBM01AyCHsAIMnJyK7lORvzrQ-6uTCY_6CnqMEfAf34', //管家接单
							'qksBgtDb2oKaovE7TcFVETRkQR8L3Qpwu7Xa4uhHo5I', //车况检查
							'3BLN5rDr4xxDYlQnjpoGqeqiO-SJLN_v4v4P6V1kSSo' //服务检查
						],
						success: function (res) {
							
							let data = {
								carId: _this.cheliang_list.carId, //车辆唯一标识
								// carwMode: xiche_fangshi, //洗车方式
								// isUrgent: shifoujinji, //是否紧急
								// orderUid:value.orderNumber,
								priceLimit: _this.getPrice[_this.xiche_jiage_dangqian].dictValue, //价格限制
								userMemo:_this.beizhu ,
								memo:_this.cheliang_list.memo,
							}
							console.log('data',data)
							//付款成功后下单
							_this.wangluo_qingqiu('/wx/carw/setOrder', data, true, true, 'POST').then(value2 => {
								if (value2) {
									console.log('setOrder')
									console.log(value2)
									uni.hideLoading();
									uni.showModal({
										title: '提示',
										content: "提交完成。",
										showCancel: false,
										success: function() {
											uni.switchTab({
												url:"../index/index"
											})
										}
									});
								}
							})
							
							
							// console.log(res)
							// console.log("提交信息中")
							// let data2={
							// 	price: _this.getPrice[_this.xiche_jiage_dangqian].dictLabel, //价格限制
							// 	// orderUid:value.orderUid
							// }
							// console.log("data2",data2)
							//付款
							// _this.wangluo_qingqiu('/wx/pay/sendipmsfeecharge', data2, true, true, 'POST').then(value => {
							// 	if (value) {
							// 		console.log("myBalanceRecharge");
							// 		console.log(value);
							// 		_this.orderNumber = value.orderNumber
							// 		uni.requestPayment({
							// 			provider: 'wxpay',
							// 			timeStamp: value.timeStamp,
							// 			nonceStr: value.nonceStr,
							// 			package: value.package,
							// 			signType: value.signType,
							// 			paySign: value.paySign,
							// 			success: function(res) {
							// 				console.log(res)
							// 				let data = {
							// 					carId: _this.cheliang_list.carId, //车辆唯一标识
							// 					// carwMode: xiche_fangshi, //洗车方式
							// 					// isUrgent: shifoujinji, //是否紧急
							// 					orderUid:value.orderNumber,
							// 					priceLimit: _this.getPrice[_this.xiche_jiage_dangqian].dictValue, //价格限制
							// 					userMemo:_this.beizhu ,
							// 					memo:_this.b,
							// 				}
							// 				console.log('data',data)
							// 				//付款成功后下单
							// 				_this.wangluo_qingqiu('/wx/carw/setOrder', data, true, true, 'POST').then(value2 => {
							// 					if (value2) {
							// 						console.log('setOrder')
							// 						console.log(value2)
							// 						uni.hideLoading();
							// 						uni.showModal({
							// 							title: '提示',
							// 							content: "提交完成。",
							// 							showCancel: false,
							// 							success: function() {
							// 								uni.switchTab({
							// 									url:"../index/index"
							// 								})
							// 							}
							// 						});
							// 					}
							// 				})
							// 			},
							// 			fail: function(err) {
							// 				console.log("err")
							// 				console.log(err)
							// 				uni.showModal({
							// 					title: '注意',
							// 					content: '取消支付。',
							// 					confirmText: '知道了',
							// 					showCancel: false,
							// 					success: res => {
							// 					}
							// 				});
							// 			}
							// 		});
							// 	}
							// })
							
							
						}.bind(this),
						fail: function(err) {
							console.log("err")
							console.log(err)
							uni.showModal({
								title: '注意',
								content: '请在设置中打开通知推送',
								confirmText: '知道了',
								showCancel: false,
								success: res => {
								}
							});
						}
					})
				}

			}
		},
		onShareAppMessage(res) {
			return {
				title: "晨夜车管家",
				path: '/pages/xiche/index/index',
				imageUrl: '/static/img/logo.png',
			}
		},
	};
</script>

<style>
	page {
		background: #FFFFFF;
	}
	.shuoming{
		font-size: 26rpx;
		padding:15rpx 38rpx;
		background: #fafafa;
		color: #aeaeae;
		/* margin-left: ; */
	}
	.titleleft{
		width: 180rpx;
		font-size: 28rpx;
	}
	.titleCenter{
		width: 465rpx;
		text-align: left;
		font-size: 28rpx;
		/* border: #000000 solid 1rpx; */
	}
	.pickerContent{
		font-size: 28rpx !important;
	}
	.carCard{
		/* margin: 20rpx 0; */
		/* border: #000000 solid 1rpx; */
		height: 188rpx;
		padding: 30rpx 0;
	}
	.cheliangMess{
		height: 188rpx;
		padding: 30rpx 0;
		/* border: #000000 solid 1rpx; */
	}
	.cardTop{
		margin-bottom: 15rpx;
	}
	.cardMess{
		/* margin-top: 15rxp; */
		color: #AAAAAA;
		font-size: 26rpx;
		padding-bottom: 5rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.rightIcon{
		width: 40rpx;
		height: 40rpx;
		color: #DDDDDD;
		text-align: center;
		line-height: 40rpx;
		font-size: 28rpx !important;
	}
	.selectBtn{
		float: right;
		text-align: center;
		background-color: #333333;
		color: #FFFFFF;
		width: 25vw;
		padding: 0;
		margin-right: 20rpx;
		font-size: 25rpx;
	}
	.cu-dialog-padding{
		padding-top: 30rpx !important;
		background: none;
	}
	.kong{
		width: 100%;
		height: 210rpx;
		/* border: #000000 solid 1rpx; */
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
	.vipContent{
		width: 100%;
		height: 860rpx;
		background: linear-gradient(#d60000, #040404);
		border: solid 1rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding: 35rpx;
		/* padding-top: 100rpx; */
		
	}
	.vipTitle{
		color: #FFFFFF;
		font-size: 32rpx;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 5rpx;
		padding-bottom: 5rpx;
	}
	.vipTitle text{
		font-size: 45rpx;
	}
	.vipPrice{
		margin-top: 20rpx;
		width: 100%;
		height: 180rpx;
		/* border: #FFFFFF solid 1rpx; */
		display: flex;
		align-items: flex-end;
		justify-content: center;
		font-size: 120rpx;
		color: #FFFFFF;
		/* font-weight: bold; */
	}
	.vipPrice text{
		font-size: 60rpx;
		margin-bottom: 20rpx;
		margin-right: 10rpx;
	}
	.quanyiTitle{
		color: #FFFFFF;
		font-size: 32rpx;
		margin-top: 20rpx;
		font-weight: bold;
	}
	.zhifu_shuoming{
		margin-top: 15rpx;
		color: #FFFFFF88;
		font-size: 25rpx;
	}
	.zhifu_shuoming view{
		margin-bottom: 5rpx;
	}
	.zhifufangshi{
		/* border:#e5c27d solid 1rpx; */
		width: 100%;
		height: 80rpx;
		margin-top: 50rpx;
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
		text-align: left;
		font-weight: bold;
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
	.btn{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
	}
	.bottomBtn{
		width: 500rpx;
		border: #FFFFFF 1rpx solid;
		background: #ca0209 !important;
		color: #FFFFFF;
		
	}
	.bottomText{
		width: 100%;
		margin-top: 20rpx;
	}
	.text1{
		width: 100%;
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
	}
</style>
