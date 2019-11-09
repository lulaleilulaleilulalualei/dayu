<template>
	<view class="storeDetail">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom bgColor="white" :isBack="!isSharePage"><block slot="content">商品详情</block></cu-custom>
		<view class="contentBox">
			<scroll-view class="scrollBox" :scroll-y="!isShowSkeleton">
				<view v-if="isShowSkeleton" class="storeBanner skeleton-rect"></view>
				<view class="storeBanner" v-if="detailObj.goods_type == 0">
					<swiper class="storeSwiperBox" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800">
						<block v-for="(item, idx) in storeImgs" :key="idx">
							<swiper-item>
								<view class="itemStoreBanner" @click="toPriviewImg(idx)">
									<image :src="item" mode="aspectFill"></image>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
				<view class="showCouponBox" v-if="detailObj.goods_type == 1">
					<view class="couponBoxBg"><img src="../../static/coupon_bg.png" alt=""></view>
					<view class="couponBoxInfo">
						<view class="showCouponInfoBox">
							<view class="couponNamePrice">
								<view class="showCouponName">{{detailObj.goods_name}}</view>
								<view class="showCouponPrice"><text>{{detailObj.goods_price}}</text>元</view>
							</view>
							<view class="showCouponNotice">仅限该商品，限柳叶湖使用</view>
						</view>
					</view>
				</view>
				<view class="showTxtContent">
					<view class="showStoreInfo">
						<view class="showStoreName"><text class="skeleton-rect">{{detailObj.goods_name}}</text></view>
						<view class="showStorePrice">
							<view class="showCurStorePri skeleton-rect">￥ <text>{{detailObj.goods_price}}</text>元</view>
							<view class="showBefStorePri skeleton-rect" v-if="detailObj.cost_price">原价{{detailObj.cost_price}}元</view>
						</view>
						<view class="showStoreOtherInfo skeleton-rect" v-if="detailObj.goods_type == 0 && detailObj.goods_tips">{{detailObj.goods_tips}}</view>
						<view class="showStoreOtherInfo skeleton-rect" v-if="detailObj.goods_type == 1">有效期：{{startTime}} 至 {{endTime}}</view>
					</view>
					<view class="showStoreDetail">
						<view class="showStoreTitle"><text class="skeleton-rect">商品详情</text></view>
						<view class="showStoreDetailBox skeleton-rect">{{detailObj.goods_desc}}</view>
					</view>
					<view class="showStoreIntro">
						<view class="showStoreTitle"><text class="skeleton-rect">重要声明</text></view>
						<view class="showStoreIntroBox skeleton-rect">{{detailObj.important_explain}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="toBuyStoreBtn">
			<view @click="bindToBuyStore">立即购买</view>
			<button v-if="!isAuth" class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权</button>
		</view>
		
		<!-- <loginBox v-if="isShowAccreditBox" @showAuthBox="toEmitShowAuth"></loginBox> -->
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
		<backHome v-if="isSharePage"></backHome>
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	// import loginBox from '@/components/loginBox.vue'
	import loadErr from '@/components/loadErr.vue'
	import backHome from '@/components/backHome.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				isShowSkeleton: true,
				id: null,
				detailObj: {},
				storeImgs: [], //商品图片
				startTime: '',
				endTime: '',
				isLoadErr: false,
				isShowAccreditBox: false, //默认不显示授权弹框
				isSharePage: this.$isSharePage,
				
				isAuth: false
			}
		},
		components: {loadErr, skeleton, backHome },
		onLoad(options) {
			this.id = options.id
			this.getDetailData()
			if(this.$userInfo) {
				this.isAuth = true
			}
		},
		onShow() {
			this.c_toSaveStoreInfo({})
		},
		methods: {
			...mapActions([
				'c_toSaveStoreInfo'
			]),
			toPriviewImg(idx) {
				const $this = this
				uni.previewImage({
					current: $this.storeImgs[idx],
					urls: $this.storeImgs
				})
			},
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
							$this.isAuth = true
							if($this.detailObj.goods_type == 1) {
								uni.showLoading({
								  title: '正在调用支付...',
								  mask: true
								})
								$this.toBuyCoupon()
							}else {
								$this.c_toSaveStoreInfo($this.detailObj)
								uni.navigateTo({
									url: '/pages/receiverAddress/receiverAddress'
								})
							}
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权！')
			    this.isAuth = false
			  }
			},
			// toEmitShowAuth(status) {
			// 	this.isShowAccreditBox = status
			// 	this.getDetailData() //授权加载
			// },
			// accreditStatus: function() {
			//   const $this = this
			//   this.$api.userLogin((status) => {
			//     if (status == '1') {
			// 		this.isShowAccreditBox = false
			// 		this.getDetailData() //授权加载
			//     }else {
			// 		$this.isShowAccreditBox = true
			// 	}
			//   })
			// },
			toRelaodData() {
				this.isLoadErr = false
				this.detailObj = {}
				this.storeImgs = []
				this.getDetailData()
			},
			getDetailData() {
				const $this = this
				this.$api.ajax({
					url: this.$config.storeDetail,
					data: {
						goods_id: this.id,
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.detailObj = res.data.data
						if(this.detailObj.goods_type == 0) {
							this.storeImgs = this.detailObj.picture_arr.split(',')
						}else if(this.detailObj.goods_type == 1) {
							this.startTime = this.detailObj.expire_start_date.split(' ')[0].replace(/-/g, '/')
							this.endTime = this.detailObj.expire_end_date.split(' ')[0].replace(/-/g, '/')
						}
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						this.isShowSkeleton = false
						this.api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isShowSkeleton = false
					this.isLoadErr = true
				})
			},
			bindToBuyStore() {
				if(this.detailObj.goods_type == 1) {
					uni.showLoading({
					  title: '正在调用支付...',
					  mask: true
					})
					this.toBuyCoupon()
				}else {
					this.c_toSaveStoreInfo(this.detailObj)
					uni.navigateTo({
						url: '/pages/receiverAddress/receiverAddress'
					})
				}
			},
			toBuyCoupon() {
				const $this = this
				this.$api.ajax({
					url: this.$config.buyStore,
					method: 'POST',
					data: {
						uid: this.$userInfo.uid,
						openid: this.$userInfo.openid,
						goods_id: this.detailObj.goods_id,
						buy_num: 1,
						buy_json: JSON.stringify({
							"proName": $this.detailObj.goods_name,
							"proPrice": $this.detailObj.goods_price,
							"proImg": $this.detailObj.goods_thumb,
							"tips": $this.detailObj.goods_tips,
							"type": $this.detailObj.goods_type,
							"expireStart": $this.detailObj.expire_start_date,
							"expireEnd": $this.detailObj.expire_end_date,
						})
					}
				})
				.then((resolve) => {
					if(resolve.statusCode == 200 && resolve.data.code == 0) {
						wx.hideLoading()
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
						              url: `/pages/orderDetail/orderDetail?id=${resolve.data.data.buy_id}`
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
						wx.hideLoading()
						this.$api.warnNotice(resolve.data.message)
					}
				})
				.catch((err) => {
					wx.hideLoading()
					this.$api.warnNotice('购买失败')
				})
			}
		},
		onShareAppMessage() {
			const $this = this
			return {
			  path:`/pages/storeDetail/storeDetail?id=${$this.id}`,
			  title: $this.detailObj.goods_name,
			  imageUrl: $this.detailObj.goods_thumb
			}
		}
	}
</script>

<style scoped lang="scss">
	.storeDetail {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.contentBox {
			width: 100%;
			flex: 1;
			overflow: hidden;
			.scrollBox {
				width: 100%;
				height: 100%;
			}
		}
	}
	.storeBanner {
		width: 100%;
		height: 480upx;
		.storeSwiperBox {
			width: 100%;
			height: 100%;
		}
		.itemStoreBanner {
			width: 100%;
			height: 100%;
			background-color: $uni-bg-color;
		}
	}
	.showCouponBox {
		width: 100%;
		height: 292upx;
		position: relative;
		.couponBoxBg {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;
		}
		.couponBoxInfo {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			display: flex;
			justify-content: flex-end;
			.showCouponInfoBox {
				width: 450upx;
				height: 100%;
				padding: 80upx 50upx 40upx 20upx;
				.couponNamePrice {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 24upx 0 30upx;
					.showCouponName {
						font-size: 40upx;
						color: $uni-text-color-black;
						font-weight: 700;
					}
					.showCouponPrice {
						font-size: 28upx;
						color: $uni-text-color-red;
						text {
							font-size: 40upx;
							font-weight: 700;
						}
					}
				}
				.showCouponNotice {
					padding-top: 30upx;
					font-size: 28upx;
					color: $uni-text-color-grey;
				}
			}
		}
	}
	.showTxtContent {
		width: 100%;
		height: auto;
		padding: 40upx 40upx 130upx;
		.showStoreInfo {
			padding-bottom: 40upx;
			border-bottom: 1px solid #E4E6E9;
			margin-bottom: 40upx;
			.showStoreName {
				font-size: 40upx;
				font-weight: 800;
				color: $uni-text-color-black;
				margin-bottom: 20upx;
			}
			.showStorePrice {
				display: flex;
				align-items: center;
				margin-bottom: 20upx;
				.showCurStorePri {
					display: flex;
					align-items: flex-end;
					font-size: 28upx;
					color: $uni-text-color-red;
					margin-right: 20upx;
					text {
						display: block;
						font-size: 48upx;
						line-height: 48upx;
						font-weight: 700;
					}
				}
				.showBefStorePri {
					font-size: 28upx;
					color: $uni-text-color-grey;
					text-decoration: line-through;
				}
			}
			.showStoreOtherInfo {
				font-size: 24upx;
				color: $uni-text-color-black;
			}
		}
		.showStoreTitle {
			font-size: 32upx;
			color: $uni-text-color-black;
			font-weight: 700;
			margin-bottom: 30upx;
		}
		.showStoreDetail {
			margin-bottom: 30upx;
			.showStoreDetailBox {
				min-height: 100upx;
				font-size: 28upx;
				color: $uni-text-color-black;
				line-height: 40upx;
			}
		}
		.showStoreIntro {
			margin-bottom: 20upx;
			.showStoreIntroBox {
				min-height: 100upx;
				font-size: 28upx;
				color: $uni-text-color-black;
				line-height: 40upx;
			}
		}
	}
	.toBuyStoreBtn {
		width: 670upx;
		height: 88upx;
		position: fixed;
		left: 40upx;
		bottom: 34upx;
		background-image: linear-gradient(90deg, #FDCE62 0%, #EBA333 100%);
		border-radius: 44px;
		position: relative;
		view {
			width: 100%;
			height: 100%;
			line-height: 88upx;
			text-align: center;
			font-size: 32upx;
			color: $uni-text-color;
		}
	}
</style>
