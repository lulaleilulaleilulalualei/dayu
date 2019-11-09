<template>
	<view class="memberSuccess" data-sign="success" @click="closeBox">
		<view class="showBox">
			<view class="showBoxText">恭喜您成为</view>
			<view class="showBoxTitle">柳叶{{vipid == 1? '体验': vipid == 2? '黄金': vipid == 3? '钻石': vipid == 4? '黑金': ''}}会员</view>
			<view class="showBoxImg"><img src="../../static/member_success.png" alt=""></view>
			<view class="showBoxBtn" @click="closeBoxBtn">查看权益</view>
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
			}
		},
		methods: {
			closeBox(e) {
				if(e.target.dataset.sign == "success") {
					this.$emit('toMemberSuccess', false)
				}
			},
			closeBoxBtn() {
				this.$emit('toMemberSuccess', false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.memberSuccess {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		.showBox {
			width: 568upx;
			height: 800upx;
			background-color: #fff;
			border-radius: 24upx;
			padding-top: 50upx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			align-items: center;
			.showBoxText {
				font-size: 32upx;
				color: #888888;
				margin-bottom: 20upx;
			}
			.showBoxTitle {
				font-size: 60upx;
				color: #888888;
				margin-bottom: 60upx;
			}
			.showBoxImg {
				width: 370upx;
				height: 318upx;
				margin-bottom: 80upx;
			}
			.showBoxBtn {
				width: 304upx;
				height: 84upx;
				border-radius: 42upx;
				line-height: 84upx;
				text-align: center;
				background: #FF9B59;
				line-height: 84upx;
				font-size: 32upx;
				color: $uni-text-color;
			}
		}
	}
</style>
