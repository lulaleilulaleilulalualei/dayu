<script>
	import Vue from 'vue'
	
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function(res) {
			Vue.prototype.$isSharePage = false //默认非分享
			// console.log('App Show')
			if (res.scene == 1008 || res.scene == 1007) {
			  Vue.prototype.$isSharePage = true
			} else if (res.scene == 1012 || res.scene == 1013) { //长按图片识别二维码 手机相册选取二维码
			  // this.globalData.isSharePage = true
			}else if (res.scene == 1058) { //公众号文章
				Vue.prototype.$isSharePage = true
			}
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/common.css";
	
	page {
	  background-color: #fff;
	  width: 100%;
	  font-family: '微软雅黑';
	  height: 100%;
	  -webkit-user-select:none;
	  user-select:none;
	  width: 100%;
	  height: 100%;
	}
	::-webkit-scrollbar{
	  width: 0;
	  height: 0;
	  color: transparent;
	}
	image {
		display: block;
		width: 100%;
		height: 100%;
	}
	.card1_color {
		color: #506368 !important;
	}
	.card2_color {
		color: #8C6525 !important;
	}
	.card3_color {
		color: #586179 !important;
	}
	.card4_color {
		color: #A69164 !important;
	}
</style>
