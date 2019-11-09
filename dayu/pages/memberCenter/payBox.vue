<template>
	<view class="payBox" data-sign="payBox" @click="toCloseBox">
		<view class="showBox">
			<view class="showBoxTop">
				<text>确认付款</text>
				<view class="toCloseBox" @click="toCloseBoxBtn"><img src="../../static/close_icon.png" alt=""></view>
			</view>
			<view class="showBoxContent">
				<view class="showMemberPrice">¥ {{vip_pri}}</view>
				<view class="showMemberType">激活柳叶{{vipid == 2?'黄金': vipid == 3?'钻石': vip_pri == 4? '黑金': ''}}会员 （权益使用次数不叠加）</view>
				<view class="showMemberToPay" @click="toPayMember">微信支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			vipid: {
				type: Number,
				default: 0
			},
			vip_pri: {
				type: Number,
				default: 0
			}
		},
		methods: {
			toCloseBoxBtn() {
				this.$emit('toPayBox', false)
			},
			toCloseBox(e) {
				if(e.target.dataset.sign == "payBox") {
					this.$emit('toPayBox', false)
				}
			},
			toPayMember() {
				this.$emit('toPayMember', true)
			}
		}
	}
</script>

<style scoped lang="scss">
	.payBox {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		.showBox {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: auto;
			background-color: #fff;
			.showBoxTop {
				width: 100%;
				height: 82upx;
				text-align: center;
				line-height: 82upx;
				font-size: 32upx;
				color: $uni-text-color-black;
				border-bottom: 1px solid #CACACA;
				.toCloseBox {
					width: 40upx;
					height: 40upx;
					padding: 5upx;
					position: absolute;
					top: 21upx;
					left: 30upx;
				}
			}
			.showBoxContent {
				padding: 60upx 0 30upx;
				.showMemberPrice {
					text-align: center;
					font-size: 72upx;
					color: $uni-text-color-black;
					font-weight: 800;
				}
				.showMemberType {
					font-size: 28upx;
					color: $uni-text-color-black;
					text-align: center;
					margin-bottom: 100upx;
				}
				.showMemberToPay {
					width: 670upx;
					height: 88upx;
					line-height: 88upx;
					text-align: center;
					border-radius: 4upx;
					font-size: 36upx;
					color: $uni-text-color;
					margin: 0 auto;
					@extend .btnImg1;
				}
			}
		}
	}
</style>
