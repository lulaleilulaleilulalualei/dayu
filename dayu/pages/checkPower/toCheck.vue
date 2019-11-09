<template>
	<view class="toCheck">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">扫码确认</block></cu-custom>
		<view class="contentBox">
			<view class="memberHead"><img :src="c_scanObj.avatar" alt=""></view>
			<view class="memberName">{{c_scanObj.nick_name}} <text v-if="c_scanObj.name">({{c_scanObj.name}})</text></view>
			<view class="memberTel" v-if="c_scanObj.tel">手机号码： {{c_scanObj.tel}}</view>
			<view class="memberGrade" v-if="c_scanObj.vip_id" :class="[{card1_color: c_scanObj.vip_id == 1}, {card2_color: c_scanObj.vip_id == 2}, {card3_color: c_scanObj.vip_id == 3}, {card4_color: c_scanObj.vip_id == 4}]">会员等级： 柳叶VIP{{c_scanObj.vip_id == 1? '体验': c_scanObj.vip_id == 2? '黄金': c_scanObj.vip_id == 3? '钻石': c_scanObj.vip_id == 4? '黑金': ''}}会员</view>
			<view class="memberUsePower" v-if="type == 0">使用 <text>钓鱼券</text> 一张</view>
			<view class="memberUsePower" v-if="type == 1">使用权益 <text>钓鱼</text> 一次</view>
			<view class="memberUsePower" v-if="type == 2">领取柳叶生态 <text>活鱼</text> 一条</view>
			<view class="memberUsePower" v-if="type == 3">领取 <text>会员礼包</text> 一份</view>
			<view class="memberUsePower" v-if="type == 4">使用权益 <text>岛钓</text> 一次</view>
			<view class="memberUsePower" v-if="type == 5">使用权益 <text>出湖钓鱼</text> 一次</view>
			<view class="memberPowerIcon" v-if="type == 0"><img src="../../static/pow_icon_1.png" alt=""></view>
			<view class="memberPowerIcon" v-if="type == 1"><img src="../../static/pow_icon_1.png" alt=""></view>
			<view class="memberPowerIcon" v-if="type == 2"><img src="../../static/pow_icon_2.png" alt=""></view>
			<view class="memberPowerIcon" v-if="type == 3"><img src="../../static/pow_icon_3.png" alt=""></view>
			<view class="memberPowerIcon" v-if="type == 4"><img src="../../static/pow_icon_4.png" alt=""></view>
			<view class="memberPowerIcon" v-if="type == 5"><img src="../../static/pow_icon_7.png" alt=""></view>
		</view>
		
		<view class="toTrueUse" @click="toTureCheck">确认</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default{
		data() {
			return {
				type: null
			}
		},
		onLoad(options) {
			this.type = options.type
		},
		computed: {
			...mapGetters([
				'c_scanObj'
			])
		},
		methods: {
			toTureCheck() {
				const $this = this
				this.$api.ajax({
					url: this.$config.checkPower,
					data: {
						uid: this.$userInfo.uid,
						buy_id: this.c_scanObj.buy_id,
						type: this.type
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						uni.showToast({
						  title: '操作成功',
						  icon: 'success',
						  success: () => {
							  setTimeout(() => {
								  uni.navigateBack({
								  	delta: 1
								  })
							  }, 1500)
						  }
						})
					}else {
						this.api.warnNotice(res.data.message)
					}
				})
				.catch(() => {
					this.api.warnNotice('操作失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.contentBox {
		padding-top: 120upx;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		.memberHead {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			overflow: hidden;
			position: relative;
			z-index: 1;
			background-color: $uni-bg-color;
			margin-bottom: 60upx;
		}
		.memberName {
			font-size: 32upx;
			color: $uni-text-color-black;
			font-weight: 600;
			margin-bottom: 30upx;
		}
		.memberTel {
			font-size: 28upx;
			color: $uni-text-color-black;
			margin-bottom: 30upx;
		}
		.memberGrade {
			font-size: 28upx;
			margin-bottom: 30upx;
		}
		.memberUsePower {
			font-size: 28upx;
			color: $uni-text-color-black;
			margin-bottom: 30upx;
			text {
				display: inline-block;
				margin: 0 10upx;
				font-size: 32upx;
				font-weight: 700;
			}
		}
		.memberPowerIcon {
			width: 140upx;
			height: 140upx;
		}
	}
	.toTrueUse {
		position: fixed;
		bottom: 120upx;
		left: 60upx;
		z-index: 99;
		width: 630upx;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		border-radius: 12upx;
		font-size: 32upx;
		color: $uni-text-color;
		margin: 0 auto;
		@extend .btnImg2;
	}
</style>
