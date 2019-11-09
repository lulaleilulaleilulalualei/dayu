<template>
	<view class="selectActNum" data-sign="selectNum" @click="toColseBox">
		<view class="selectNumBox">
			<view class="selectNumTop">
				<text>选择人数</text>
				<view class="toCloseBox" @click="toIconCloseBox"><img src="../../static/close_icon.png" alt=""></view>
			</view>
			<view class="numSelectBox">
				<view class="numSelectInBox">
					<view class="showActApplyCost">
						<view class="showActApplyCostTitle">活动报名费</view>
						<view class="showActApplyCostPrice">¥{{priceTotal}}</view>
					</view>
					<view class="toSelectNumBox">
						<view class="toSelectNumBoxText">选择人数</view>
						<view class="toSelectNumBtn">
							<view class="toSelectLeftBtn" @click="toMinusNum"></view>
							<view class="toShowSelectNum">{{applyNum}}</view>
							<view class="toSelectRightBtn" @click="toAddNum"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="toTureBtn" @click="toJumpActApply">确认加入</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				applyNum: 1, //默认为1
				priceTotal: 0,
				actPrice: 0
			}
		},
		computed: {
			...mapGetters([
				'c_actInfo'
			])
		},
		onLoad() {
			this.actPrice = this.c_actInfo.apply_fee
			this.priceTotal = this.c_actInfo.apply_fee * this.applyNum
		},
		methods: {
			...mapActions([
				'c_toSaveActInfo'
			]),
			toJumpActApply() {
				this.c_toSaveActInfo({
					...this.c_actInfo, 
					priceTotal: this.priceTotal,
					applyNum: this.applyNum
				})
				uni.navigateTo({
					url: '/pages/activityApply/activityApply'
				})
			},
			toColseBox(e) {
				if(e.target.dataset.sign == 'selectNum') {
					this.$emit('toCloseBox', false)
				}
			},
			toIconCloseBox() {
				this.$emit('toCloseBox', false)
			},
			toMinusNum: function() {
			  if (this.applyNum > 1) {
				  this.priceTotal =  this.$api.pointProblem(this.priceTotal, this.actPrice, 'sub')
				  this.applyNum--
			  }
			},
			toAddNum: function() {
				this.applyNum++
				this.priceTotal = this.$api.pointProblem(this.priceTotal, this.actPrice, 'add')
			},
		}
	}
</script>

<style scoped lang="scss">
	.selectActNum {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		background-color: rgba(0,0,0,0.6);
		.selectNumBox {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: auto;
			background: #F1F1F5;
			.selectNumTop {
				width: 100%;
				height: 88upx;
				background-color: #fff;
				text-align: center;
				line-height: 88upx;
				font-size: 32upx;
				color: $uni-text-color-black;
				position: relative;
				.toCloseBox {
					width: 40upx;
					height: 40upx;
					padding: 10upx;
					position: absolute;
					top: 24upx;
					right: 30upx;
				}
			}
			.numSelectBox {
				width: 100%;
				height: auto;
				padding: 30upx;
				.numSelectInBox {
					width: 100%;
					height: auto;
					background-color: #fff;
					padding: 20upx 30upx;
					border-radius: 8upx;
					.showActApplyCost {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 40upx;
						font-weight: 600;
						margin-bottom: 40upx;
						.showActApplyCostTitle {
							color: $uni-text-color-black;
						}
						.showActApplyCostPrice {
							color: $uni-text-color-red;
						}
					}
					.toSelectNumBox {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.toSelectNumBoxText {
							font-size: 28upx;
							color: $uni-text-color-black;
						}
						.toSelectNumBtn {
							display: flex;
							align-items: center;
							height: 60upx;
							width: 220upx;
							border: 1px solid #EBEBEB;
							border-radius: 4upx;
							.toSelectLeftBtn {
								width: 60upx;
								height: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
								border-right: 1px solid #EBEBEB;
								&::before {
									content: '';
									display: block;
									width: 22upx;
									height: 4upx;
									background-color: #979797;
								}
							}
							.toShowSelectNum {
								flex: 1;
								height: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
								font-size: 28upx;
								color: $uni-text-color-black;
							}
							.toSelectRightBtn {
								width: 60upx;
								height: 100%;
								display: flex;
								align-items: center;
								justify-content: center;
								border-left: 1px solid #EBEBEB;
								position: relative;
								&::before {
									content: '';
									display: block;
									width: 22upx;
									height: 4upx;
									background-color: #000;
								}
								&::after {
									content: '';
									display: block;
									width: 4upx;
									height: 22upx;
									background-color: #000;
									position: absolute;
									top: 50%;
									left: 50%;
									margin-top: -11upx;
									margin-left: -2upx;
								}
							}
						}
					}
				}
			}
			.toTureBtn {
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				font-size: 28upx;
				color: $uni-text-color;
				@extend .btnImg2;
			}
		}
	}
</style>
