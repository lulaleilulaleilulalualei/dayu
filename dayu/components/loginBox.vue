<template>
	<view class="loginBox">
		<view class="noticeUserBox">
		    <view class="noticeBoxTop">
		        <view class="noticeBoxTopImg" hover-class="none" hover-stop-propagation="false">
		            <image src="../../static/logo.png"></image>
		        </view>
		        <view class="noticeBoxTopTxt" hover-class="none" hover-stop-propagation="false">
		            大渔<text class="" selectable="false" space="false" decode="false">申请</text>
		        </view>
		    </view>
		    <view class="noticeBoxMiddle" hover-class="none" hover-stop-propagation="false">
		        {{isRejectAuth ? '重新获取您的微信授权信息': '获取您的微信授权信息'}}
		    </view>
		    <view class="noticeBoxBtn" hover-class="none" hover-stop-propagation="false">
		        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权</button>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isRejectAuth: false, //是否拒绝授权
			}
		},
		methods: {
			getUserInfo: function(e) { //按钮登录授权
			  if (e.detail.errMsg == 'getUserInfo:ok') {
			    uni.showLoading({
			      title: '授权登陆中...',
			      mask: true
			    })
			    const $this = this
			    this.$api.userLogin((status) => {
			      if (status == '1') {
			        // if (!this.data.isFromOrdersStage) {
			          uni.hideLoading()
			          uni.showToast({
			            title: '授权登录成功',
			            icon: 'success',
			            mask: true,
			            success: () => {
							$this.isRejectAuth = false
							this.$emit('showAuthBox', false)
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权，只有授权后才能享受我们的产品哦~')
			    this.isRejectAuth = true
				this.$emit('showAuthBox', true)
			  }
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.loginBox {
	  position:fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  z-index: 9800;
	  background-color: rgba(0,0,0,0.4);
	}
	
	.noticeUserBox {
	  position: absolute;
	  bottom: 0;
	  left: 0;
	  width: 100%;
	  height: auto;
	  background: #fff;
	  padding: 40upx 0;
	}
	.noticeBoxTop {
	  display: flex;
	  align-items: center;
	  margin-bottom: 30upx;
	  padding: 0 40upx;
	}
	.noticeBoxTopImg {
	  width: 60upx;
	  height: 60upx;
	  border-radius: 50%;
	  overflow: hidden;
	}
	.noticeBoxTopTxt {
	  font-size: 36upx;
	  color: #222;
	  margin-left: 20upx;
	}
	.noticeBoxTopTxt>text {
	  display: inline-block;
	  margin-left: 20upx;
	}
	.noticeBoxMiddle {
	  font-size: 52upx;
	  color: #000;
	  margin-bottom: 60upx;
	  padding: 0 40upx;
	}
	.noticeBoxBtn {
	  width: 280upx;
	  height: 80upx;
	  margin: 0 auto;
	  background: #FFDA4C;
	  border-radius: 16upx;
	  overflow: hidden;
	}
	.noticeBoxBtn>button {
	  line-height: 80upx;
	  text-align: center;
	  font-size: 36upx;
	  color: #222;
	  font-weight: 600;
	  letter-spacing: 4upx;
	  background: transparent;
	  border: none;
	}
	
</style>
