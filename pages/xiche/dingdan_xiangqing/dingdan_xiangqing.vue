<template>
	<view>
		<view class="detailTop">
			<view class="detailTopLeft">
				<view class="detailTopLeftState">{{getOrderById.stateName}}...</view>
				<view class="detailTopLeftTime">{{getOrderById.createTime}}</view>
			</view>
			<view class="detailTopRight">上门洗车</view>
		</view>
		<view class="detailContent" v-if="getOrderById.stateName!='等待管家接单'">
			<view class="lianxi_guanjia">
				<view class="lianxiImg">
					<img :src="getOrderById.stewardAvatar" alt="">
				</view>
				<view class="lianxiCenter">
					<view class="lianxiName">{{getOrderById.stewardName}}</view>
					<view class="lianxiKouling">管家口令：{{getOrderById.stewardPasswd}}</view>
				</view>
				<view>
					<button class="cu-btn round lianxiBtn" @click="boda_dianhua(getOrderById.stewardPhone)">
						联系管家
					</button>
				</view>
			</view>
		</view>
		<view class="detailContent margin-top" v-if="getOrderById.carwService!=null">
			<view class="detailContentTitle" style="border: none;">
				<view class="titleLeft">
					<view class="titleRed"></view>
					<view>管家养车建议</view>
				</view>
				<view class="titleRight"></view>
			</view>
			<view class="advice">
				{{getOrderById.carwService.memo}}
			</view>
		</view>
		<view class="detailContent margin-top">
			<view class="detailContentTitle">
				<view class="titleLeft">
					<view class="titleRed"></view>
					<view>服务正在进行</view>
				</view>
				<button class="cu-btn round lianxiBtn" @click="userPayBtn()"
				v-if="getOrderById.carwCondition!=null&&getOrderById.tradeState!=2&&getOrderById.state!=21">付款</button>
				<view class="titleRight" v-if="getOrderById.carwCondition==null">等待管家确认金额</view>
				<view class="titleRight2" v-if="getOrderById.tradeState==2">已付款</view>
			</view>
			<!-- 已完成的项目（左边有小红点 -->
			<view class="finished" v-if="getOrderById.receiveTime!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>管家已接单</view>
					<!-- 接单时间 -->
				</view>
				<view class="finishedRight">{{getOrderById.receiveTime}}</view>
			</view>
			<view class="finished"  v-if="getOrderById.conditionTime!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>检查车况</view>
					<!-- 点击到达时间 -->
				</view>
				<view class="finishedRight">{{getOrderById.conditionTime}}</view>
			</view>
			<view class="finished" v-if="getOrderById.carwCondition!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>服务项目</view>
					<!-- 填写车况报告时间 -->
				</view>
				<view class="finishedRight">{{getOrderById.carwCondition.createTime}}</view>
			</view>
			<!-- 左边没有小红点（服务项目 -->
			<view class="finishedlist" v-for="(services,index) in getOrderById.carwCondition.services" :key="index">
				<view class="finishedLeft">
					<view class="redPoint"></view>
					<view>{{services.conditionService}}</view>
				</view>
				<view>¥{{services.servicePrice}}</view>
			</view>
			<!-- 会员优惠:getOrderById.discountedPrice不为0表示有优惠金 -->
			<view class="finishedlist" style="color: #cf030c;"  v-if="getOrderById.discountedPrice==null&&getOrderById.carwCondition!=null&&getOrderById.cardName=='晨夜会员'">
				<view class="finishedLeft">
					<view class="redPoint"></view>
					<view>晨夜会员优惠</view>
				</view>
				<view>- ¥{{reduceHuiyuan}}</view>
				<!-- <view>{{(totalpay*0.88).toFixed(2)}}</view> -->
				<!-- <view>- ¥{{(Number(totalpay)-Number(totalpay)*0.88).toFixed(2)}}</view> -->
			</view>
			<view class="finishedlist" style="color: #cf030c;"  v-if="getOrderById.discountedPrice!=0&&getOrderById.discountedPrice!=null&&getOrderById.carwCondition!=null">
				<view class="finishedLeft">
					<view class="redPoint"></view>
					<view>晨夜会员优惠</view>
				</view>
				<view>- ¥{{getOrderById.discountedPrice}}</view>
				<!-- <view>{{(totalpay*0.88).toFixed(2)}}</view> -->
				<!-- <view>- ¥{{(Number(totalpay)-Number(totalpay)*0.88).toFixed(2)}}</view> -->
			</view>
			<!-- 用户付款 已完成的项目（左边有小红点 -->
			<view class="finished" style="color: #cf030c;" v-if="getOrderById.tradeState==2&&getOrderById.payState==1">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>用户已付款</view>
				</view>
				<view>¥{{userpay}}</view>
			</view>
			<view class="finished" v-if="getOrderById.carwService!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>服务完毕</view>
					<!-- 填写服务报告时间 -->
				</view>
				<view class="finishedRight">{{getOrderById.carwService.createTime}}</view>
			</view>
			<view class="finished" v-if="getOrderById.carwService!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>服务检查完毕</view>
					<!-- 点击结束订单时间，管家 -->
				</view>
				<view class="finishedRight">{{getOrderById.carwService.createTime}}</view>
			</view>
			<!-- 左边没有小红点（退款项目 -->
			<view class="finishedlist" v-for="(projects,index) in getOrderById.carwService.projects" :key="index" v-if="getOrderById.carwService!=null">
				<view class="finishedLeft">
					<view class="redPoint"></view>
					<view>{{projects.project}}</view>
				</view>
				<view>- ¥{{Math.abs(projects.price)}}</view>
			</view>
			<!-- 用户付款 已完成的项目（左边有小红点 -->
			<view class="finished" style="color: #cf030c;" v-if="getOrderById.tradeState==2&&getOrderById.payState==2">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>用户已付款</view>
				</view>
				<view>¥{{userpay}}</view>
			</view>
			<!-- 退款（左边有小红点 -->
			<view class="finished" style="color: #cf030c;" v-if="getOrderById.stateName=='订单已结束'&&getOrderById.payState==1&&getOrderById.carwService!=null">
				<view class="finishedLeft">
					<img class="redPoint" src="/static/img/luyin.png" alt="">
					<view>已退款</view>
				</view>
				<view v-if="reduce==0">- ¥0</view>
				<view v-if="reduce!=0">- ¥{{Math.abs(reduce)}}</view>
			</view>
			<!-- 底部正在进行的状态 -->
			<view class="nowState" v-if="getOrderById.carwService==null">
				<view class="finishedLeft">
					<view class="redPoint"></view>
					<view>{{getOrderById.stateName}}...</view>
				</view>
				<view></view>
			</view>
			<!-- 服务完成后的合计 -->
			<view class="finishState" v-if="getOrderById.carwService!=null">
				<view style="font-size: 30rpx;">合计</view>
				<view style="font-size: 47rpx;">
					¥ {{(Number(finishpay)+Number(reduce)).toFixed(2)}}
				</view>
			</view>
		</view>
		<view class="detailContent margin-top" style="overflow: hidden;" v-if="getOrderById.carwService!=null">
			<view class="detailContentTitle" style="border: none;">
				<view class="titleLeft">
					<view class="titleRed"></view>
					<view>服务项目记录</view>
				</view>
				<view class="titleRight"></view>
			</view>
			
			<scroll-view class=" mx-4 border align-center imgList" style="width: 670rpx; white-space: nowrap;margin-top: 40rpx;" scroll-x="true" >
				<img v-for="(files,index) in imgListsFuwu" :key="index" @tap="ViewImage2" :data-url="imgListsFuwu[index]"
					 :src="files" alt="" mode="aspectFill">
			</scroll-view>
		</view>
		<view class="detailContent margin-top" style="overflow: hidden;" v-if="getOrderById.carwCondition!=null">
			<view class="detailContentTitle">
				<view class="titleLeft">
					<view class="titleRed"></view>
					<view>车况检查报告</view>
				</view>
				<view style="color: #68b020;" v-if="getOrderById.carwCondition.carCondition==1">良好</view>
				<view v-if="getOrderById.carwCondition.carCondition==2">一般</view>
				<view style="color: #ca040b;" v-if="getOrderById.carwCondition.carCondition==3">较差</view>
			</view>
			<view class="finished" v-for="(details,index) in getOrderById.carwCondition.details" :key="index">
				<view class="finishedLeft" v-if="details.condition==1" style="color: #68b020;">
					{{details.conditionDetail}}
				</view>
				<view class="finishedLeft" v-if="details.condition==2">
					{{details.conditionDetail}}
				</view>
				<view class="finishedLeft" v-if="details.condition==3" style="color: #ca040b;">
					{{details.conditionDetail}}
				</view>
				<view v-if="details.condition==1" style="color: #68b020;">良好</view>
				<view v-if="details.condition==2">一般</view>
				<view v-if="details.condition==3" style="color: #ca040b;">较差</view>
			</view>
			<!-- <view class="finished">
				<view class="finishedLeft">
					车身清洁度
				</view>
				<view>一般</view>
			</view>
			<view class="finished" style="color: #68b020;">
				<view class="finishedLeft">
					轮胎状况
				</view>
				<view>良好</view>
			</view> -->
			<scroll-view class=" mx-4 border align-center imgList" style="width: 670rpx; white-space: nowrap;margin-top: 40rpx;" scroll-x="true" >
				<img v-for="(files,index) in imgLists" :key="index" @tap="ViewImage" :data-url="imgLists[index]"
					 :src="files" alt="" mode="aspectFill">
			</scroll-view>
		</view>
		<view class="detailContent margin-top" style="overflow: hidden;">
			<view class="detailContentTitle">
				<view class="titleLeft">
					<view class="titleRed"></view>
					<view>订单信息</view>
				</view>
				<view></view>
			</view>
			<view class="finished">
				<view class="finishedLeft" style="color: #7f7f7f;">
					订单编号
				</view>
				<view class="dingdanMes">{{getOrderById.orderUid}}</view>
			</view>
			<view class="finished">
				<view class="finishedLeft" style="color: #7f7f7f;">
					预约管家上门时间
				</view>
				<view class="dingdanMes">{{getOrderById.priceLimitName}}</view>
			</view>
			<view class="finished" v-if="getOrderById.discountedPrice>0">
				<view class="finishedLeft" style="color: #7f7f7f;">
					会员类别
				</view>
				<view class="dingdanMes">晨夜会员</view>
			</view>
			<view class="finished" v-if="getOrderById.discountedPrice==0">
				<view class="finishedLeft" style="color: #7f7f7f;">
					会员类别
				</view>
				<view class="dingdanMes">普通会员</view>
			</view>
			<view class="finished" v-if="getOrderById.discountedPrice==null">
				<view class="finishedLeft" style="color: #7f7f7f;">
					会员类别
				</view>
				<view class="dingdanMes">{{getOrderById.cardName}}</view>
			</view>
			<view class="finished">
				<view class="finishedLeft" style="color: #7f7f7f;">
					车牌号码
				</view>
				<view class="dingdanMes">{{getOrderById.carNum}}</view>
			</view>
			<view class="finished">
				<view class="finishedLeft" style="color: #7f7f7f;">
					下单时间
				</view>
				<view class="dingdanMes">{{getOrderById.createTime}}</view>
			</view>
			<view class="finished">
				<view class="finishedLeft" style="color: #7f7f7f;">
					服务地址
				</view>
				<view class="dingdanMes" style="width: 505rpx;">{{getOrderById.loactionName}}{{getOrderById.memo}}</view>
			</view>
		</view>
		<view  style="width: 100vw;height: 18vw;text-align: center;font-size: 26rpx;line-height: 18vw;color:#7f7f7f;font-weight: bolder;"
		@click="boda_dianhua('18120718168')" >
			客服热线：18120718168
		</view>
		
		<!-- <view v-if="orderDetail.orderState==0" style="width: 100vw;height: 15vw;text-align: center;font-size: 1.2rem;line-height: 15vw;">
			等待管家接单
		</view>
		<view v-if="orderDetail.orderState==1" style="width: 100vw;height: 15vw;text-align: center;font-size: 1.2rem;line-height: 15vw;">
			管家上门中
		</view>
		<view v-if="orderDetail.orderState==2" style="width: 100vw;height: 15vw;text-align: center;font-size: 1.2rem;line-height: 15vw;">
			车况检查中
		</view>
		<view v-if="orderDetail.orderState==3" style="width: 100vw;height: 15vw;text-align: center;font-size: 1.2rem;line-height: 15vw;">
			等待服务完毕
		</view>
		<view v-if="orderDetail.orderState==4" style="width: 100vw;height: 15vw;text-align: center;font-size: 1.2rem;line-height: 15vw;">
			服务检查完毕
		</view> -->
		
		<!-- <view class="huxing_quan_mini" style="width: 94vw;margin: 3vw;background: #FFFFFF;">
			<view class="titleTop">
				<view class="huxing_quan_mini"
					style="background: #0f0f0f;color: #FFFFFF;width: fit-content;font-size: 0.8rem;padding: 8rpx 20rpx;text-align: center;">
					订单信息
				</view>
				<view class="titleTopTime">{{orderDetail.createTime}}</view>
			</view>
			<view style="padding: 20rpx 30rpx;">
				
				<view>订单号：{{orderDetail.orderUid}}</view>
				<view>车牌号：{{orderDetail.carNum}}</view>
				<view>会员类别：{{orderDetail.cardName}}</view>
				<view>预付金额：{{orderDetail.priceLimitName}}元</view>
				<view v-if="orderDetail.priceLimit!=1">价格限制：{{orderDetail.priceLimitName}}元以内</view>
				<view v-if="orderDetail.isUrgent==1">是否紧急：是</view>
				<view v-if="orderDetail.isUrgent==3">是否紧急：否</view>
				<view>客户地址：{{orderDetail.loactionName}}</view>
				<view>门牌号：{{orderDetail.memo}}</view>
				<view>客户口令：{{orderDetail.userPasswd}}</view>
				
			</view>
		</view>

		<view class="huxing_quan_mini" style="width: 94vw;margin: 3vw;background: #FFFFFF;margin-top: 30rpx;padding-bottom: 15rpx;">
			<view class="titleTop">
				<view class="huxing_quan_mini"
					style="background: #0f0f0f;color: #FFFFFF;width: fit-content;font-size: 0.8rem;padding: 8rpx 20rpx;text-align: center;">
					管家信息
				</view>
				<view class="titleTopTime">{{orderDetail.receiveTime}}</view>
			</view>
			<view style="display: flex;width: inherit;height: 20vw;margin-top: 2vw;">
				<view style="flex: 2;text-align: center;">
					<view>
						<image style="width: 20vw;height: 20vw;" :src="orderDetail.stewardAvatar"></image>
					</view>
				</view>
				<view style="flex: 3;" v-if="orderDetail.stewardName==null">
					<view style="margin-top: 5vw;">
						管家名称：
					</view>
					<view style="margin-top: 2vw;">
						管家口令：
					</view>
				</view>
				<view style="flex: 3;" v-if="orderDetail.stewardName!=null">
					<view style="margin-top: 5vw;">
						管家名称：{{orderDetail.stewardName}}
					</view>
					<view style="margin-top: 2vw;">
						管家口令：{{orderDetail.stewardPasswd}}
					</view>
				</view>
			</view>
			<view class="dianhua">
				<view class="huxing_quan phoneBtn"
				@click="boda_dianhua(orderDetail.stewardPhone)">
					电话
				</view>
			</view>
		</view>
		<view class="huxing_quan_mini" style="width: 94vw;margin: 3vw;background: #FFFFFF;margin-top: 30rpx;" v-show="!yincang_chekuang">
			<view class="titleTop">
				<view class="huxing_quan_mini"
					style="background: #0f0f0f;color: #FFFFFF;width: fit-content;font-size: 0.8rem;padding: 8rpx 20rpx;text-align: center;">
					车况检查报告
				</view>
				<view  class="titleTopTime">{{orderDetail.carwCondition.createTime}}</view>
			</view>
			<view class="report" v-if="orderDetail.carwCondition">
				<view class="">车辆位置：{{orderDetail.carwCondition.carPosition}}</view>
				<view class="carPicture">
					<image @click="chakandatu([public_server_img+orderDetail.carwCondition.carPicture])" class="carPic" :src="public_server_img+orderDetail.carwCondition.carPicture" mode="aspectFill"></image>
				</view>
				<view class="" v-if="orderDetail.carwCondition.carCondition==0">车辆状况：好</view>
				<view class="" v-if="orderDetail.carwCondition.carCondition==1">车辆状况：中</view>
				<view class="" v-if="orderDetail.carwCondition.carCondition==2">车辆状况：差</view>
				<view class="carState">
					<view v-for="(explain,index) in conditionExplain" :key="index">{{explain}}</view>
				</view>
				<view class="totalPic">
					<view class="single" v-for="(picItem,index) in orderDetail.carwCondition.files" :key="index">
						<image @click="chakandatu2([orderDetail.carwCondition.files,index,0])" class="singlePic" :src="public_server_img+picItem.fileUrls[0].fileUrl" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="huxing_quan_mini" style="width: 94vw;margin: 3vw;background: #FFFFFF;margin-top: 30rpx; padding-bottom: 10rpx;" v-show="!yincang_fuwu">
			<view class="titleTop" >
				<view class="huxing_quan_mini"
					style="background: #0f0f0f;color: #FFFFFF;width: fit-content;font-size: 0.8rem;padding: 8rpx 20rpx;text-align: center;">
					服务检查报告
				</view>
				<view  v-if="orderDetail.carwService.carPicture!=0" class="titleTopTime">{{orderDetail.carwService.createTime}}</view>
			</view>
			<view class="report" v-if="orderDetail.carwService.carPicture!=0">
				<view class="">车辆位置：{{orderDetail.carwService.carPosition}}</view>
				<view class="carPicture">
					<image @click="chakandatu([public_server_img+orderDetail.carwService.carPicture])" class="carPic" :src="public_server_img+orderDetail.carwService.carPicture" mode="aspectFill"></image>
				</view>
				<view class="service">服务项目：{{orderDetail.carwService.serviceProvider}}</view>
				<view class="serviceDetail">
					<view v-for="(price,index) in priceDetails" :key="index">{{price}}</view>
					<view class="servicePrice" v-if="orderDetail.cardName=='普通会员'">
						总价：{{orderDetail.carwService.totalPrice}}元
					</view>
					<view class="servicePrice" v-if="orderDetail.cardName!='普通会员'">
						总价：{{orderDetail.carwService.totalPrice}}*<text style="color: red;">0.88</text>={{(orderDetail.carwService.totalPrice*0.88).toFixed(2)}}元
					</view>
				</view>
				<view v-for="(item,index) in orderDetail.carwService.results" :key="index" style="width: 100%;">
					<view class="service">
						第{{item.resultNum}}次检查：
						<text style="color: red;" 
						v-if="item.resultType==1">不通过</text>
						<text style="color: green;" 
						v-if="item.resultType==2">通过</text>
					</view>
					<view class="serviceDetail">
						<view v-for="(rMsg,ind) in resultMsg[index]" :key="ind">{{rMsg}}</view>
					</view>
					<view class="totalPic">
						<view class="single" v-for="(item2,index) in item.fileUrls" :key="index">
						 <image @click="chakandatu2([item.fileUrls,index,1])" class="singlePic" :src="public_server_img+item2.fileUrl" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		 <view class="servicePrice padding-right" v-if="orderDetail.carwService.carPicture==0&&orderDetail.cardName=='普通会员'">
			总价：{{orderDetail.carwService.totalPrice}}元
		 </view>
		 <view class="servicePrice padding-right" v-if="orderDetail.carwService.carPicture==0&&orderDetail.cardName!='普通会员'">
			总价：{{orderDetail.carwService.totalPrice}}*<text style="color: red;">0.88</text>={{(orderDetail.carwService.totalPrice*0.88).toFixed(2)}}元
		 </view>
		<view class="dianhua2" v-show="!yincang_anniu">
			<view class="huxing_quan phoneBtn2"
			@click="complete()">
				待付款
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				orderId:0,
				orderDetail:[],
				public_server_img:'',
				jiagexianzhi:"",
				yincang_chekuang:true,
				yincang_fuwu:true,
				yincang_anniu:true,
				a:[],
				conditionExplain:[],//车辆状况
				priceDetails:[],//价格描述
				resultMsg:[],//洗车描述
				getOrderById:[],
				imgLists:[],
				imgListsFuwu:[],
				totalpay:0,
				reduce:0,
				reduceHuiyuan:0,
				userpay:0,
				finishpay:0,
			};
		},
		onLoad(options) {
			this.public_server_img=getApp().globalData.public_server_url
			console.log("orderId");
			console.log(options.orderId);
			this.orderId=options.orderId;
			
		},
		methods: {
			userPayBtn(){
				console.log(this.totalpay,this.reduceHuiyuan,this.reduce)
				let payState=1;//只有车况
				if(this.getOrderById.carwService!=null){
					payState=2;//服务报告不为空（已填写
				}
				let resPrice=Number(this.totalpay)-Number(this.reduceHuiyuan)+Number(this.reduce)
				let data2={
					price: resPrice.toFixed(2), //价格限制
					payState:payState,
					orderUid:this.getOrderById.orderUid,
					discountedPrice:this.reduceHuiyuan
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
												_this.getOrderByIdDetail();
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
									_this.getOrderByIdDetail();
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
			boda_dianhua:function(res){
				uni.makePhoneCall({
					phoneNumber: res //仅为示例
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgLists,
					current: e.currentTarget.dataset.url
				});
			},
			ViewImage2(e) {
				uni.previewImage({
					urls: this.imgListsFuwu,
					current: e.currentTarget.dataset.url
				});
			},
			chakandatu(res){
				console.log(res)
				const urls= res ;
				const current = 0;
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
			chakandatu2(res){
				
				console.log(res[0].length)
				for(let p=0;p<res[0].length;p++){
					//console.log(res[0][p].fileUrls[0].fileUrl)
					var b
					if(res[2]==0)
					{ b=getApp().globalData.public_server_url+res[0][p].fileUrls[0].fileUrl}
					else
					{ b=getApp().globalData.public_server_url+res[0][p].fileUrl}
					this.a[p]=b
																
					console.log(this.a)
											 
				}
				const urls= this.a ;
				const current = res[1];
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
									
		
			complete(){//用户点击完成订单，该订单进入历史订单
				let _this = this
				console.log(getApp().globalData.public_yonghu_yue );
				console.log(_this.orderDetail.carwService.totalPrice)
				if (false&&getApp().globalData.public_yonghu_yue < _this.orderDetail.carwService.totalPrice) {
					uni.showModal({
						title: '提示',
						content: "您的余额不足，请先进行充值",
						showCancel: false,
						success: function() {
							uni.switchTab({
								url:"../../index_4/index_4"
							})
						}
					});
					return false;
				}
				
				
				
				uni.showModal({
					title: '提示',
					content: '确认付款？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							let data = {
								orderId: _this.orderId
							}
							console.log(data)
							_this.wangluo_qingqiu('/wx/carw/settlementOrder', data, true, true, 'POST').then(value => {
								if (value) {
									uni.navigateBack({});
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
			},
			getOrderByIdDetail(){
				let _this = this
				let data = {
					orderId: _this.orderId
				}
				console.log(data);
				_this.resultMsg=[]
				_this.conditionExplain=[]
				_this.priceDetails=[]
				_this.wangluo_qingqiu('/wx/carw/getOrderById', data, true, true, 'GET').then(value => {
					if (value) {
						console.log(value)
						_this.getOrderById=value;
						_this.orderDetail=value;
						let userpay=0;
						if(value.carwCondition!=null){
							_this.imgLists=[];
							for(let i=0;i<value.carwCondition.files.length;i++){
								_this.imgLists.push(_this.public_server_img + value.carwCondition.files[i].fileUrl)
							}
							// 服务总价
							let servicesPrice=0;
							for(let i=0;i<value.carwCondition.services.length;i++){
								servicesPrice=Number(servicesPrice)+Number(value.carwCondition.services[i].servicePrice)
							}
							_this.totalpay=servicesPrice;
							// getOrderById.discountedPrice不为0表示有优惠金额，为0表示无优惠金额
							if(value.discountedPrice!=null){
								userpay=Number(_this.totalpay)-Number(value.discountedPrice);
							}else{
								if(value.cardName=="晨夜会员"){
									_this.reduceHuiyuan=(servicesPrice*0.12).toFixed(2)
									userpay=Number(_this.totalpay)-Number(_this.reduceHuiyuan);
								}else{
									userpay=Number(_this.totalpay);
								}
							}
							userpay=userpay.toFixed(2)
							_this.userpay=userpay;
							_this.finishpay=userpay;
						}
						
						if(value.carwService!=null){
							_this.imgListsFuwu=[];
							for(let i=0;i<value.carwService.files.length;i++){
								_this.imgListsFuwu.push(_this.public_server_img + value.carwService.files[i].fileUrl)
							}
							// 退钱
							let projectsPrice=0;
							for(let i=0;i<value.carwService.projects.length;i++){
								projectsPrice=Number(projectsPrice)+Number(value.carwService.projects[i].price)
							}
							_this.reduce=projectsPrice.toFixed(2);
							if(value.payState==2){
								userpay=Number(userpay)+Number(projectsPrice)
								userpay=userpay.toFixed(2)
								_this.userpay=userpay;
							}
						}else{
							_this.getOrderById.carwService['projects']=[]
							// _this.reduce=0
						}
						
						console.log(_this.userpay,_this.reduce,value.discountedPrice)
						
						// console.log(_this.imgLists)
						// if(value.stateName=="等待服务完毕"){
						// 	// 显示车况报告、隐藏服务检查报告、隐藏按钮
						// 	this.yincang_chekuang=false;
						// }
						// if(value.stateName=="服务检查完毕"){
						// 	// 显示车况报告、显示服务检查报告、隐藏按钮
						// 	this.yincang_chekuang=false;
						// 	this.yincang_fuwu=false;
							
						// }
						// if(value.stateName=="待付款"){
						// 	// 显示车况报告、显示服务检查报告、显示按钮
						// 	this.yincang_chekuang=false;
						// 	this.yincang_fuwu=false;
						// 	this.yincang_anniu=false;
						// }
						// if(value.stateName=="订单完成"){
						// 	// 显示车况报告、显示服务检查报告
						// 	this.yincang_chekuang=false;
						// 	this.yincang_fuwu=false;
							
						// }
						// console.log(this.yincang_anniu)
						// console.log(_this.orderDetail.carwCondition.conditionExplain.indexOf('\n'))
						//换行切割，不存在换行符不切割
						// if(_this.orderDetail.carwCondition){
						// 	if(_this.orderDetail.carwCondition.conditionExplain.indexOf('\n')!=-1){
						// 		_this.conditionExplain=_this.orderDetail.carwCondition.conditionExplain.split('\n')
						// 	}else{
						// 		_this.conditionExplain[0]=_this.orderDetail.carwCondition.conditionExplain
						// 	}
						// }
						
						// // console.log(_this.conditionExplain)
						// if(_this.orderDetail.carwService){
						// 	if(_this.orderDetail.carwService.priceDetails.indexOf('\n')!=-1){
						// 		_this.priceDetails=_this.orderDetail.carwService.priceDetails.split('\n')
						// 	}else{
						// 		_this.priceDetails[0]=_this.orderDetail.carwService.priceDetails
						// 		// console.log("_this.priceDetails")
						// 		// console.log(_this.priceDetails)
						// 	}
						// 	var results=_this.orderDetail.carwService.results
						// 	for(var i=0;i<results.length;i++){
						// 		if(results[i].resultMsg.indexOf('\n')!=-1){
						// 			_this.resultMsg[i]=results[i].resultMsg.split('\n')
						// 		}else{
						// 			// if(results[i].resultMsg)
						// 			_this.resultMsg[i]=[];
						// 			_this.resultMsg[i][0]=results[i].resultMsg
						// 		}
						// 	}
						// }
						
						// console.log(_this.resultMsg)
						
					}
				})
			},

		},
		onShareAppMessage(res) {
			return {
				title: "晨夜车管家",
				path: '/pages/xiche/index/index',
				imageUrl: '/static/img/logo.png',
			}
		},
		onShow: function() {
			let _this = this
			_this.getOrderByIdDetail();
		}

	};
</script>

<style>
	page {
		background: #f1f1f1;
	}
	.titleTop{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 15rpx;
	}
	.report{
		width: 100%;
		padding: 15rpx 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.carPicture{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx;
	}
	.carPic{
		width: 40vw;
		height: 50vw;
		/* border: 1rpx solid #000000; */
	}
	.carState{
		padding-top: 20rpx;
		padding-left: 10rpx;
		width: 100%;
		/* height: 80rpx; */
		/* border: 1rpx solid #000000; */
	}
	textarea{
		/* border: 1rpx solid #000000; */
		/* height: 80rpx; */
	}
	.totalPic{
		width: 100%;
		display: flex;
		justify-content: left;
		align-items: center;
		flex-wrap: wrap;
		/* padding: 0 10rpx; */
		margin-bottom: 20rpx;
	}
	.singlePic{
		margin-top: 20rpx;
		margin: 15rpx;
		width: 25vw;
		height: 30vw;
		/* border: 1rpx solid #000000; */
	}
	.service{
		width: 100%;
		text-align: left;
	}
	.serviceDetail{
		width: 100%;
		text-align: left;
		margin: 30rpx;
		margin-bottom: 10rpx;
	}
	.sD{
		margin-top: 8rpx;
	}
	.servicePrice{
		width: 100%;
		text-align: right;
		margin-top: 8rpx;
	}
	.dianhua{
		width: 100%;
		height: 7vw;
		/* border: #000000 solid 1rpx; */
	}
	.phoneBtn{
		float: right;
		text-align: center;
		background-color: #333333;
		color: #FFFFFF;
		width: 16vw;
		padding: 10rpx 0;
		margin-right: 20rpx;
	}
	.dianhua2{
		width: 100%;
		margin-top: 30rpx;
		height: 12vw;
		/* border: #000000 solid 1rpx; */
	}
	.phoneBtn2{
		float: right;
		text-align: center;
		background-color: #333333;
		color: #FFFFFF;
		width: 30vw;
		padding: 15rpx 0;
		margin-right: 50rpx;
	}
	
	
	/* 新ui样式css */
	.detailTop{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx;
		padding-bottom: 20rpx;
	}
	.detailTopLeftState{
		font-weight: bold;
		font-size: 44rpx;
		color: #101010;
		margin-bottom: 10rpx;
	}
	.detailTopLeftTime{
		font-size: 26rpx;
		color: #a5a5a5;
	}
	.detailTopRight{
		font-size: 45rpx;
		font-weight: 600;
		color: #ababab;
	}
	.detailContent{
		width: 96vw;
		margin: 2vw;
		padding: 25rpx 30rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
	}
	.detailContentTitle{
		border-bottom: #eeeeee99 1rpx solid;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding-bottom: 25rpx;
		font-size: 34rpx;
		color: #101010;
		font-weight: bold;
	}
	.titleLeft{
		display: flex;
		align-items: center;
		/* padding-left: 10rpx; */
	}
	.titleRed{
		width: 10rpx;
		height: 33rpx;
		background: #cf030c;
		border-radius: 10rpx;
		margin-right: 10rpx;
		/* margin-bottom: 10rpx; */
		/* border-top-left-radius: 10rpx; */
		/* border-bottom-left-radius: 10rpx; */
		/* border-left: 5rpx solid #cf030c; */
	}
	.titleRight{
		font-size: 25rpx;
		font-weight: bold;
		color: #cf030c;
	}
	.titleRight2{
		font-size: 25rpx;
		font-weight: bold;
		color: #bbb;
	}
	
	.lianxi_guanjia{
		display: flex;
		align-items: center;
	}
	.lianxiImg{
		width: 100rpx;
		height: 100rpx;
		border: #eeeeee99 solid 1rpx;
		border-radius: 50rpx;
		margin-right: 30rpx;
	}
	.lianxiImg image{
		border-radius: 50rpx;
		width: 100%;
		height: 100%;
	}
	.lianxiCenter{
		width: 350rpx;
	}
	.lianxiName{
		font-size: 32rpx;
		color: #101010;
		font-weight: bold;
		margin-bottom: 15rpx;
	}
	.lianxiKouling{
		font-size: 25rpx;
		color: #101010;
		font-weight: bold;
	}
	.lianxiBtn{
		color: #FFFFFF;
		background-color: #ca040b !important;
		font-size: 26rpx;
		font-weight: bold;
		/* padding: 0rpx 35rpx !important; */
		width: 180rpx;
		height: 56rpx;
	}
	.advice{
		font-weight: bold;
		color: #ca040b;
		margin: 0 20rpx;
		margin-bottom: 10rpx;
	}
	.finished{
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 15rpx 0; */
		/* border-bottom: #eee 1rpx solid; */
		font-size: 26rpx;
		margin: 20rpx 0;
		font-weight: bolder;
		color: #000;
	}
	.finishedlist{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		/* padding-top: 20rpx 0; */
		font-weight: bold;
		color: #101010;
		margin: 20rpx 0;
		/* padding-top: 20rpx; */
		/* border-bottom: #eee 1rpx solid; */
	}
	.nowState{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: #eeeeee99 1rpx solid;
		font-size: 26rpx;
		margin-top: 20rpx;
		font-weight: bolder;
		color: #101010;
	}
	.finishState{
		margin-top: 20rpx;
		width: 100%;
		height: 135rpx;
		padding-top: 15rpx;
		border-top: #eeeeee99 1rpx solid;
		/* font-size: 31rpx; */
		color: #101010;
		font-weight: bold;
		display: flex;
		justify-content: flex-end;
	}
	.finishState view{
		margin-left: 15rpx;
	}
	.finishedLeft{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.redPoint{
		width: 15rpx;
		height: 15rpx;
		/* padding: 5rpx; */
		/* border: 7rpx solid #cf030c; */
		border-radius: 100%;
		margin-right: 10rpx;
	}
	.finishedRight{
		font-size: 25rpx;
		color: #bbb;
		font-weight: bold;
	}
	.imgList{
		display: flex;
		width: 100%;
		/*可滑动*/
		overflow-y: auto;
		white-space: nowrap
	}
	.imgList image{
		height: 200rpx;
		width: 200rpx;
		margin-right: 15rpx;
		/* border: #000 solid 1rpx; */
	}
	.dingdanMes{
		text-align: right;
		width: 450rpx;
		/* border: #000 solid 1rpx; */
	}
</style>
