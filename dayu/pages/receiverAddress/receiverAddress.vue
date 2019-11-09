<template>
	<view class="receiverAddress">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">收货地址</block></cu-custom>
		<view class="contentBox">
			<view class="addressInfo">
				<view class="itemAddressInfo">
					<view class="itemInfoName">收货人</view>
					<view class="itemInfoInp">
						<input type="text" :value="userName" @blur="toGetUserName" @confirm="toGetUserName" />
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">联系电话</view>
					<view class="itemInfoInp">
						<input type="number" :value="userTel" @blur="toGetUserTel" @confirm="toGetUserTel" />
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">所在地区</view>
					<view class="itemInfoPicker">
						<picker class="pickerSelectBox" :value="region" mode="region" :range="range" @change="bindPickerChange">
							<view class="showPickerInfo">
								<text v-if="!isSelectPicker">请选择</text>
								<text v-if="isSelectPicker" :class="{hadSelectPicker: isSelectPicker}">{{region[0]}}, {{region[1]}}, {{region[2]}}</text>
							</view>
						</picker>
					</view>
				</view>
				<view class="itemAddressInfo">
					<view class="itemInfoName">详细地址	</view>
					<view class="itemInfoArea">
						<textarea class="itemInfoTextarea" :value="detailAddress" @blur="toGetDetailAddress" @confirm="toGetDetailAddress" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等" />
					</view>
				</view>
			</view>
			<view class="showStoreInfo">
				<view class="showStoreImg"><img :src="c_storeInfo.goods_thumb" alt=""></view>
				<view class="showStoreInfoBox">
					<view class="showStoreTitle">{{c_storeInfo.goods_name}}</view>
					<view class="showStorePrice">¥{{c_storeInfo.goods_price}}</view>
				</view>
			</view>
		</view>
		<view class="toPayBtn" @click="toPayStore">立即支付</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				userName: '',
				userTel: '',
				region: ['北京市', '北京市', '东城区'],
				isSelectPicker: false,
				detailAddress: '',
				isToDetail: false
			}
		},
		computed: {
			...mapGetters([
				'c_storeInfo'
			])
		},
		onLoad(options) {
			if(this.$userInfo.address) {
				this.userName = this.$userInfo.address.name || ''
				this.userTel = this.$userInfo.address.tel || ''
				if(this.$userInfo.address.province) {
					this.isSelectPicker = true
					this.region = [this.$userInfo.address.province, this.$userInfo.address.city, this.$userInfo.address.area]
				}
				this.detailAddress = this.$userInfo.address.detailed_address || ''
			}
		},
		onShow() {
			if(this.isToDetail) {
				uni.navigateBack({
					delta: 1
				})
				this.isToDetail = false
			}
		},
		methods: {
			toGetUserName(e) {
				this.userName = e.detail.value
			},
			toGetUserTel(e) {
				this.userTel = e.detail.value
			},
			toGetDetailAddress(e) {
				this.detailAddress = e.detail.value
			},
			bindPickerChange(e) {
				this.isSelectPicker = true
				this.region = e.detail.value
			},
			toPayStore() {
				if(this.$api.trim(this.userName) != '') {
					if(this.$api.inputTest(this.userTel, 'tel')) {
						if(this.isSelectPicker) {
							if(this.$api.trim(this.detailAddress) != '') {
								uni.showLoading({
								  title: '正在调用支付...',
								  mask: true
								})
								this.toPay()
							}else {
								this.$api.warnNotice('详细地址不能为空')
							}
						}else {
							this.$api.warnNotice('请选择所在地区')
						}
					}
				}else {
					this.$api.warnNotice('收货人不能为空')
				}
			},
			toPay() {
				const $this = this
				this.$api.ajax({
					url: this.$config.buyStore,
					method: 'POST',
					data: {
						uid: this.$userInfo.uid,
						openid: this.$userInfo.openid,
						goods_id: this.c_storeInfo.goods_id,
						buy_num: 1,
						buy_json: JSON.stringify({
							"proName": $this.c_storeInfo.goods_name,
							"proPrice": $this.c_storeInfo.goods_price,
							"proImg": $this.c_storeInfo.goods_thumb,
							"tips": $this.c_storeInfo.goods_tips,
							"type": $this.c_storeInfo.goods_type,
							"name": $this.userName,
							"tel": $this.userTel,
							// "address": `${$this.region.join('')}${$this.detailAddress}`
							"province": $this.region[0],
							"city": $this.region[1],
							"area": $this.region[2],
							"detailed_address": $this.detailAddress
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
										$this.isToDetail = true
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
		}
	}
</script>

<style scoped lang="scss">
	.receiverAddress {
		width: 100%;
		height: auto;
		.contentBox {
			width: 100%;
			height: auto;
			background: #F1F1F5;
		}
	}
	.addressInfo {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 0 40upx;
		margin-bottom: 20upx;
		.itemAddressInfo {
			display: flex;
			height: auto;
			width: 100%;
			&:not(:last-child) {
				border-bottom: 1px solid #E4E6E9;
			}
			.itemInfoName {
				width: 130upx;
				font-size: 32upx;
				color: $uni-text-color-black;
				line-height: 100upx;
				margin-right: 30upx;
			}
			.itemInfoInp {
				flex: 1;
				height: 100upx;
				input {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 32upx;
					color: $uni-text-color-black;
				}
			}
			.itemInfoPicker {
				flex: 1;
				min-height: 100upx;
				.pickerSelectBox {
					width: 100%;
					height: 100%;
					.showPickerInfo {
						width: 100%;
						min-height: 100upx;
						padding: 30upx 0;
						line-height: 44upx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						&::after {
							content: '';
							display: block;
							width: 12upx;
							height: 12upx;
							border: 4upx solid #000;
							border-left-color: transparent;
							border-top-color: transparent;
							transform: rotate(-45deg);
							margin-left: 10upx;
						}
						text {
							font-size: 32upx;
							color: $uni-text-color-grey;
						}
						.hadSelectPicker {
							color: $uni-text-color-black;
						}
					}
				}
			}
			.itemInfoArea {
				flex: 1;
				height: 180upx;
				padding: 30upx 0;
				.itemInfoTextarea {
					width: 100%;
					height: 100%;
					font-size: 32upx;
					line-height: 44upx;
					color: $uni-text-color-black;
				}
			}
		}
	}
	.showStoreInfo {
		padding: 60upx 40upx 0;
		display: flex;
		height: 320upx;
		width: 100%;
		background-color: #fff;
		.showStoreImg {
			width: 200upx;
			height: 200upx;
			border-radius: 8upx;
			overflow: hidden;
			background-color: $uni-bg-color;
			position: relative;
			z-index: 1;
			margin-right: 30upx;
		}
		.showStoreInfoBox {
			height: 200upx;
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.showStoreTitle {
				font-size: 32upx;
				color: $uni-text-color-black;
				font-weight: 700;
			}
			.showStorePrice {
				font-size: 48upx;
				color: $uni-text-color-red;
				font-weight: 700;
			}
		}
	}
	.toPayBtn {
		position: fixed;
		bottom: 88upx;
		left: 40upx;
		width: 670upx;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		font-size: 32upx;
		color: $uni-text-color;
		background-image: linear-gradient(90deg, #FDCE62 0%, #EBA333 100%);
		border-radius: 44px;
	}
</style>
