import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


Vue.prototype.isEmpty = function(obj) {
	if (typeof obj == "undefined" || obj == null || obj == "") {
		return true;
	} else {
		return false;
	}
}

Vue.prototype.wangluo_qingqiu = function(url, data, denglu, nodata, mode) {

	let token = ""
	if (denglu) {
		if (!getApp().globalData.public_login_status) {
			uni.showModal({
				title: '提示',
				content: "需要登录后操作",
				showCancel: false,
				success: function() {
					uni.navigateTo({
						url: "/pages/denglu/denglu",
						fail: function(res) {
							console.log(res)
						}
					})
				},
				fail: function(res) {
					console.log(res)
				}
			});
		} else {
			token = getApp().globalData.public_user_token
		}
	} else {
		token = ""
	}

	if (denglu) {
		if (!getApp().globalData.public_login_status) {
			return
		}
	}


	uni.showLoading({
		title: '加载中',
		mask: true
	});
	let fuwuqi = getApp().globalData.public_server_url;

	var biaodan = null
	if (nodata) {
		biaodan = data
	} else {
		biaodan = {
			data: JSON.stringify(data)
		}
	}

	return uni.request({ 
		url: fuwuqi + url, //仅为示例，并非真实接口地址。
		method: mode,
		data: biaodan,
		header: {
			//'custom-header': 'hello' //自定义请求头信息
			'content-type': 'application/x-www-form-urlencoded',
			'token': token,
			'accept': 'application/json',
			// 'appid': "wx1c6f28733ed04d73",
			'appid': "wxbc40d490d0c0ef3d",
		}
	}).then(res => {
		if (res[1].statusCode == 200) {
			uni.hideLoading();
			switch (res[1].data.code) {
				case '0' | 0:
					//返回数据
					if (getApp().globalData.public_tiaoshi_moshi) {
						getApp().globalData.public_debug.push("POST:" + JSON.stringify(biaodan))
						getApp().globalData.public_debug.push("URL:" + url)
						getApp().globalData.public_debug.push(JSON.stringify(res[1].data.data))
						getApp().globalData.public_debug.push("--分割线--")
						getApp().globalData.public_debug.push("--分割线--")
						getApp().globalData.public_debug.push("--分割线--")
					}

					return res[1].data.data
					break;
				default:
					console.log(res[1].data.msg)
					console.log(url)
					console.log(biaodan)
					if (getApp().globalData.public_tiaoshi_moshi) {
						getApp().globalData.public_debug.push("POST:" + JSON.stringify(biaodan))
						getApp().globalData.public_debug.push("URL:" + url)
						getApp().globalData.public_debug.push("MSG:" + res[1].data.msg)
						getApp().globalData.public_debug.push("--分割线--")
						getApp().globalData.public_debug.push("--分割线--")
						getApp().globalData.public_debug.push("--分割线--")
					}
					
					uni.showModal({
						title: '提示',
						content: res[1].data.msg,
						showCancel: false,
						success: function() {
						}
					});
					
					break;
			}
		} else {
			uni.hideLoading();
			uni.showModal({
				title: '提示',
				content: "请求数据错误",
				showCancel: false,
				success: function() {}
			});
		}
		console.log(res)
	});
}
