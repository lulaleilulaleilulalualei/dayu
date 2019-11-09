<template>
	<view class="orderDetail">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">订单详情</block></cu-custom>
		<view class="contentBox">
			<scroll-view class="scrollBox" :scroll-y="true">
				<view class="showStoreImg" v-if="buyObj.type == 0">
					<image :src="buyObj.proImg" mode="aspectFill"></image>
				</view>
				<view class="showCouponBox" v-if="buyObj.type == 1">
					<view class="couponBoxBg"><img src="../../static/coupon_bg.png" alt=""></view>
					<view class="couponBoxInfo">
						<view class="showCouponInfoBox">
							<view class="couponNamePrice">
								<view class="showCouponName">{{buyObj.proName}}</view>
								<view class="showCouponPrice"><text>{{buyObj.proPrice}}</text>元</view>
							</view>
							<view class="showCouponNotice">仅限该商品，限柳叶湖使用</view>
						</view>
					</view>
				</view>
				<view class="showStoreInfo">
					<view class="showTopStoreInfo">
						<view class="showStoreTitle">{{buyObj.proName}}</view>
						<view class="showStoreTextInfo" v-if="buyObj.type == 0">{{buyObj.tips}}</view>
						<view class="showStoreTextInfo" v-if="buyObj.type == 1">有效期： {{startTime}} 至 {{endTime}}</view>
					</view>
					<view class="showStoreMoreInfo" v-if="buyObj.type == 0">
						<view class="itemStoreMoreInfo">
							<view class="itemStoreInfoTitle">收货人</view>
							<view class="itemShowInfoTxt">{{buyObj.name}}</view>
						</view>
						<view class="itemStoreMoreInfo">
							<view class="itemStoreInfoTitle">联系电话</view>
							<view class="itemShowInfoTxt">{{buyObj.tel}}</view>
						</view>
						<view class="itemStoreMoreInfo">
							<view class="itemStoreInfoTitle">收货地址</view>
							<view class="itemShowInfoTxt">{{buyObj.address}}</view>
						</view>
					</view>
					<view class="showStoreMoreInfo" v-if="buyObj.type == 1">
						<view class="showCouponQrCode"><img :src="'data:image/png;base64,'+codeSrc" alt=""></view>
					</view>
				</view>
				<view class="showStorePayInfo">
					<view class="itemStorePayInfo">
						<view class="showPayInfoTitle">支付费用</view>
						<view class="showPayPriceInfo">￥{{detailObj.pay_fee}}</view>
					</view>
					<view class="itemStorePayInfo">
						<view class="showPayInfoTitle">订单编号</view>
						<view class="showPayTextInfo">{{detailObj.plat_trans_no}}</view>
					</view>
					<view class="itemStorePayInfo">
						<view class="showPayInfoTitle">下单时间</view>
						<view class="showPayTextInfo">{{detailObj.created_time}}</view>
					</view>
					<view class="showStoreOrderNotice">
						<view class="storeOrderNotice" v-if="buyObj.type == 0">下单后，将在48小时之内发货</view>
						<view class="storeOrderNotice">如需帮助请拨打客服热线：<text @click="toCallServiceTel">{{serviceTel}}</text></view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				id: null,
				detailObj: {},
				buyObj: {},
				isLoadErr: false,
				startTime: '',
				endTime: '',
				serviceTel: '400-077-8755',
				codeSrc: ''
			}
		},
		components: {loadErr},
		onLoad(options) {
			this.id = options.id
			this.getOrderDetail()
		},
		methods: {
			toCallServiceTel() {
				const $this = this
				uni.makePhoneCall({
					phoneNumber: $this.serviceTel
				})
			},
			toRelaodData() {
				this.isLoadErr = false
				this.detailObj = {}
				this.buyObj = {}
				this.getOrderDetail()
			},
			getOrderDetail() {
				const $this = this
				this.$api.ajax({
					url: this.$config.buyDetail,
					data: {
						buy_id: this.id,
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.detailObj = res.data.data
						this.buyObj = JSON.parse(this.detailObj.buy_json)
						if(this.buyObj.type == 1) {
							this.startTime = this.buyObj.expireStart.replace(/-/g, '/')
							this.endTime = this.buyObj.expireEnd.replace(/-/g, '/')
							this.getCouponCode()
						}
					}else {
						this.api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isLoadErr = true
				})
			},
			getCouponCode() {
				const $this = this
				uni.request({
				  url: `${$this.$config.couponCode}?buy_id=${$this.id}`,
				  responseType: 'arraybuffer',  //设置响应类型
				  success(res) {
				    if (res.statusCode == 200) {
				      let codeSrc = uni.arrayBufferToBase64(res.data);  //对数据进行转换操作
					  $this.codeSrc = codeSrc
				    }else {
				      app.warnNotice(res.data.message)
				    }
				  },
				  fail(e) {
				    app.warnNotice('操作失败')
				  }
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.orderDetail {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.contentBox {
			width: 100%;
			flex: 1;
			background-color: #F1F1F5;
			.scrollBox {
				width: 100%;
				height: 100%;
			}
		}
	}
	.showStoreImg {
		width: 100%;
		height: 292upx;
		background-color: $uni-bg-color;
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
	.showStoreInfo {
		padding: 40upx;
		width: 100%;
		height: auto;
		background-color: #fff;
		margin-bottom: 20upx;
		.showTopStoreInfo {
			padding-bottom: 40upx;
			border-bottom: 1px solid  #E4E6E9;
			.showStoreTitle {
				font-size: 40upx;
				color: $uni-text-color-black;
				font-weight: 700;
				margin-bottom: 10upx;
			}
			.showStoreTextInfo {
				font-size: 24upx;
				color: $uni-text-color-black;
			}
		}
		.showStoreMoreInfo {
			padding-top: 40upx;
			.itemStoreMoreInfo {
				display: flex;
				&:not(:last-child) {
					margin-bottom: 30upx;
				}
				.itemStoreInfoTitle {
					width: 130upx;
					font-size: 32upx;
					color: $uni-text-color-grey;
					margin-right: 30upx;
					line-height: 44upx;
				}
				.itemShowInfoTxt {
					flex: 1;
					overflow: hidden;
					font-size: 32upx;
					color: $uni-text-color-black;
					line-height: 44upx;
				}
			}
			.showCouponQrCode {
				width: 250upx;
				height: 250upx;
				background-color: $uni-bg-color;
				margin: 0 auto;
			}
		}
	}
	.showStorePayInfo {
		padding: 40upx 40upx 0;
		background-color: #fff;
		.itemStorePayInfo {
			display: flex;
			align-items: center;
			&:not(:last-child) {
				margin-bottom: 30upx;
			}
			.showPayInfoTitle {
				font-size: 32upx;
				color: $uni-text-color-grey;
				width: 130upx;
				margin-right: 30upx;
			}
			.showPayPriceInfo {
				font-size: 32upx;
				color: $uni-text-color-red;
			}
			.showPayTextInfo {
				font-size: 32upx;
				color: $uni-text-color-black;
			}
		}
		.showStoreOrderNotice {
			margin-top: 40upx;
			padding-top: 40upx;
			border-top: 1px solid #E6E6E6;
			.storeOrderNotice {
				padding-bottom: 40upx;
				text-align: right;
				font-size: 32upx;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
