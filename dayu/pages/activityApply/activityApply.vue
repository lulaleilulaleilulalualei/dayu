<template>
	<view class="activityApply">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">活动报名</block></cu-custom>
		<view class="applyBox">
			<view class="showApplyInfo">
				<view class="applyActImg">
					<image :src="c_actInfo.thumb" mode="aspectFill"></image>
				</view>
				<view class="applyActInfo">
					<view class="applyActTitle">{{c_actInfo.name}}</view>
					<view class="applyActOtherInfo">
						<view class="applyActTime">时间：{{startTime}} - {{endTime}}</view>
						<view class="applyActAddress">地点：{{c_actInfo.address}}</view>
					</view>
				</view>
			</view>
			<view class="showApplyFee">
				<view class="applyFeeTitle">活动报名费用</view>
				<view class="applyFeeNum">x{{c_actInfo.applyNum}}</view>
				<view class="applyFeeCost">¥{{c_actInfo.apply_fee}}</view>
			</view>
			<view class="showApplyNotice" v-if="c_actInfo.act_type == 1">钻石会员首次参加减免一人费用，黑金会员一直减免一人费用</view>
		</view>
		<view class="writeApplyInfo">
			<view class="writeInfoTitle">填写报名</view>
			<view class="itemWriteInfo">
				<view class="itemWriteTitle">姓名</view>
				<view class="itemWriteInp">
					<input type="text" :value="userName" confirm-type="done" @blur="toGetUserName" @confirm="toGetUserName" placeholder="请填写您的姓名" />
				</view>
			</view>
			<view class="itemWriteInfo">
				<view class="itemWriteTitle">电话</view>
				<view class="itemWriteInp">
					<input type="number" :value="userTel" confirm-type="done" @blur="toGetUserTel" @confirm="toGetUserTel" placeholder="请填写您的电话" />
				</view>
			</view>
		</view>
		<view class="applyNoticeIcon">
			<view class="itemApplyNotice">
				<view class="itemApplyNoticeIcon">保</view>
				<view class="itemApplyNoticeText">交易保障</view>
			</view>
			<view class="itemApplyNotice">
				<view class="itemApplyNoticeIcon">退</view>
				<view class="itemApplyNoticeText">不支持退款</view>
			</view>
		</view>
		
		<view class="actApplyBtn">
			<view class="actApplyBtnTotal">
				<view class="actApplyBtnTitle">合计</view>
				<view class="actApplyBtnPrice">￥{{c_actInfo.priceTotal}}</view>
			</view>
			<view class="toPayBtn" @click="toPayApply">支付报名</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				userName: '', 
				userTel: ''
			}
		},
		onLoad() {
			if(this.$userInfo.name) {
				this.userName = this.$userInfo.name
			}
			if(this.$userInfo.tel) {
				this.userTel = this.$userInfo.tel
			}
		},
		computed: {
			...mapGetters([
				'c_actInfo'
			]),
			startTime() {
				return this.c_actInfo.start_time.split(' ')[0].replace(/-/g, '/')
			},
			endTime() {
				return this.c_actInfo.end_time.split(' ')[0].replace(/-/g, '/')
			}
		},
		methods: {
			toGetUserName(e) {
				this.userName  = e.detail.value
			},
			toGetUserTel(e) {
				this.userTel = e.detail.value
			},
			toPayApply() {
				if(this.$api.trim(this.userName) != '') {
					if(this.$api.inputTest(this.userTel, 'tel')) {
						if(this.c_actInfo.is_fee == 1) {
							uni.showLoading({
							  title: '正在调用支付...',
							  mask: true
							})
						}
						this.toPay()
					}
				}else {
					this.$api.warnNotice('用户名不能为空')
				}
				
			},
			toPay() {
				const $this = this
				this.$api.ajax({
					url: this.$config.activityPay,
					method: 'POST',
					data: {
						uid: this.$userInfo.uid,
						openid: this.$userInfo.openid,
						avatar: this.$userInfo.avatar,
						name: this.userName,
						tel: this.userTel,
						act_id: this.c_actInfo.act_id,
						apply_num: this.c_actInfo.applyNum,
						apply_json: JSON.stringify({})
					}
				})
				.then((resolve) => {
					if(resolve.statusCode == 200 && resolve.data.code == 0) {
						if(this.c_actInfo.is_fee == 1) {
							wx.hideLoading()
							if(resolve.data.data.paySign) {
								uni.requestPayment({
								  'timeStamp': resolve.data.data.timeStamp,
								  'nonceStr': resolve.data.data.nonceStr,
								  'package': resolve.data.data.package,
								  'signType': resolve.data.data.signType,
								  'paySign': resolve.data.data.paySign,
								  success: (res) => {
								    if (res.errMsg == 'requestPayment:ok') {
								      uni.showToast({
								        title: '支付成功',
								        icon: 'success',
								        success: () => {
								          setTimeout(() => {
								            wx.navigateTo({
								              url: `/pages/activityApplyDetail/activityApplyDetail?id=${resolve.data.data.apply_id}&from=apply`,
								            })
								          }, 1500)
								        }
								      })
								    }
								  },
								  fail: (res) => {
								    this.$api.warnNotice('支付失败')
								  }
								})
							}else {
								uni.showToast({
								  title: '报名成功',
								  icon: 'success',
								  success: () => {
								    setTimeout(() => {
								      wx.navigateTo({
								        url: `/pages/activityApplyDetail/activityApplyDetail?id=${resolve.data.data}&from=apply`,
								      })
								    }, 1500)
								  }
								})
							}
						}else {
							uni.showToast({
							  title: '报名成功',
							  icon: 'success',
							  success: () => {
							    setTimeout(() => {
							      wx.navigateTo({
							        url: `/pages/activityApplyDetail/activityApplyDetail?id=${resolve.data.data}&from=apply`,
							      })
							    }, 1500)
							  }
							})
						}
					}else {
						wx.hideLoading()
						this.$api.warnNotice(resolve.data.message)
					}
				})
				.catch((err) => {
					wx.hideLoading()
					this.$api.warnNotice('报名失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.activityApply {
		width: 100%;
		height: 100%;
		background-color: #F1F1F5;
	}
	.applyBox {
		background-color: #fff;
		padding: 30upx 30upx 0;
		margin-bottom: 10upx;
		.showApplyInfo {
			width: 100%;
			height: 200upx;;
			display: flex;
			align-items: center;
			padding-bottom: 1px solid #F0F0F1;
			.applyActImg {
				width: 200upx;
				height: 100%;
				border-radius: 8upx;
				background-color: $uni-bg-color;
				margin-right: 30upx;
				overflow: hidden;
			}
			.applyActInfo {
				height: 100%;
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.applyActTitle {
					font-size: 28upx;
					color: $uni-text-color-black;
					font-weight: 600;
					@extend .ellipse2;
				}
				.applyActOtherInfo {
					width: 100%;
					.applyActTime {
						font-size: 24upx;
						color: $uni-text-color-grey;
						margin-bottom: 10upx;
					}
					.applyActAddress {
						font-size: 24upx;
						color: $uni-text-color-grey;
					}
				}
			}
		}
		.showApplyFee {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: $uni-text-color-black;
			padding: 30upx 0;
		}
		.showApplyNotice {
			padding-bottom: 30upx;
			font-size: 24upx;
			color: $uni-text-color-grey;
		}
	}
	.writeApplyInfo {
		padding: 30upx 30upx 0;
		background-color: #fff;
		margin-bottom: 20upx;
		.writeInfoTitle {
			font-size: 28upx;
			color: $uni-text-color-black;
			font-weight: 600;
		}
		.itemWriteInfo {
			display: flex;
			height: 100upx;
			width: 100%;
			&:not(:last-child) {
				border-bottom: 1px solid #F0F0F1;
			}
			.itemWriteTitle {
				width: 60upx;
				line-height: 100upx;
				font-size: 28upx;
				color: $uni-text-color-black;
			}
			.itemWriteInp {
				height: 100%;
				flex: 1;
				overflow: hidden;
				input {
					display: block;
					width: 100%;
					height: 100%;
					text-align: right;
					font-size: 28upx;
					color: $uni-text-color-black;
				}
			}
		}
	}
	.applyNoticeIcon {
		display: flex;
		padding: 0 30upx;
		.itemApplyNotice {
			display: flex;
			align-items: center;
			&:not(:last-child) {
				margin-right: 30upx;
			}
			.itemApplyNoticeIcon {
				width: 24upx;
				height: 24upx;
				border-radius: 50%;
				overflow: hidden;
				line-height: 24upx;
				text-align: center;
				margin-right: 10upx;
				background-color: $uni-text-color-blue;
				color: $uni-text-color;
				font-size: 12upx;
			}
			.itemApplyNoticeText {
				font-size: 24upx;
				color: $uni-text-color-blue;
			}
		}
	}
	.actApplyBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		display: flex;
		.actApplyBtnTotal {
			flex: 1;
			overflow: hidden;
			background-color: #fff;
			padding: 0 30upx;
			display: flex;
			align-items: center;
			.actApplyBtnTitle {
				font-size: 28upx;
				color: $uni-text-color-black;
				margin-right: 60upx;
			}
			.actApplyBtnPrice {
				font-size: 28upx;
				color: $uni-text-color-red;
				font-weight: 600;
			}
		}
		.toPayBtn {
			width: 320upx;
			height: 100%;
			text-align: center;
			line-height: 100upx;
			font-size: 28upx;
			color: $uni-text-color;
			@extend .btnImg2;
		}
	}
</style>
