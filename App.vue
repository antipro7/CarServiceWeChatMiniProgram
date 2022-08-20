<script>
	export default {
		onLaunch: function() {			
			
			
			
			
		},
		// onLoad() {
			
		// 	let _this = this
		// 	uni.login({
		// 		provider: 'weixin',
		// 		success(res) {
		// 			let data = {
		// 				code: res.code
		// 			}
		// 			_this.wangluo_qingqiu('/wx/user/login', data, false, true, 'GET').then(value => {
		// 				if (value) {
		// 					getApp().globalData.public_user_token = value.token
		// 					console.log(value.token)
		// 					getApp().globalData.public_login_status = true
		// 					getApp().globalData.public_user_phone = value.has_phone
						
		// 					if (value.special_value == 1) {
		// 						getApp().globalData.public_wxapp_type = true
		// 					} else {
		// 						getApp().globalData.public_wxapp_type = false
						
		// 					}
			              
			              
							
		// 				}
		// 			})
		// 		}
		// 	})
		// },
		onShow: function() {
			console.log('App Show')
			getApp().globalData.xiche_jiamubiao[0]=getApp().globalData.public_server_url+'/profile/upload/priceList.jpg';
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			//登录状态
			public_login_status: false,
			//登录id
			public_login_id: '1',
			//会员数据 
			public_user: [], 
			//服务器地址
			// public_server_url: 'http://124.221.85.97:8082',
			public_server_url: 'https://car-weapp-api.quanxiapp.com', 
			// public_server_url: 'http://116.62.25.241:8083', 
			// public_server_url: 'https://hyedw0tbg0s5.ngrok.xiaomiqiu123.top',

			// public_server_img: 'http://192.168.10.105',
			public_server_img: 'https://car-weapp-api.quanxiapp.com',
			//public_server_img: 'http://nvxv39qjac6z.ngrok2.xiaomiqiu.cn/',
			public_user_token: "", //用户token
			public_user_phone:false,  //绑定手机
			public_user_property:false, //用户是否绑定小区
			public_user_property_id:"",	//用户操作的小区id
			
			public_user_property_data:{},	//用户操作的小区信息
			
			public_wxapp_type:false, //微信审核状态
			public_tiaoshi_moshi:false,
			
			public_user_longitude:"", 
			public_user_dimension:"",
			
			public_debug:[],
			
			public_yonghu_yue:0,
			xinxi:"",
			xiche_jiamubiao:[]
			// xiche_jiamubiao:['https://car-weapp-api.quanxiapp.com/profile/upload/priceList.jpg']
			// xiche_jiamubiao:['http://124.221.85.97:8080/profile/upload/priceList.jpg']
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'common/css.css';
	@import "colorui/main.css"; 
	@import "colorui/icon.css";
</style>
