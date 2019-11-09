<template>
	<view class="checkPower">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">权益验证</block></cu-custom>
		<view class="checkPowerBox">
			<view class="itemCheckPower" v-for="(item, idx) in checkType" :key="idx" @click="toCheckPower(idx)">
				<view class="itemCheckPowerIcon"><img :src="item.icon" alt=""></view>
				<view class="itemCheckPowerName">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				checkType: [{
					name: '钓鱼券',
					icon: '../../static/pow_icon_1.png',
					type: 0
				}, {
					name: '钓鱼',
					icon: '../../static/pow_icon_1.png',
					type: 1
				}, {
					name: '活鱼',
					icon: '../../static/pow_icon_2.png',
					type: 2
				}, {
					name: '会员礼包',
					icon: '../../static/pow_icon_3.png',
					type: 3
				}, {
					name: '岛钓',
					icon: '../../static/pow_icon_4.png',
					type: 4
				}, {
					name: '出湖钓鱼',
					icon: '../../static/pow_icon_7.png',
					type: 5
				}]
			}
		},
		methods: {
			...mapActions([
				'c_toSaveScanObj'
			]),
			toCheckPower(idx) {
				const $this = this
				let type = this.checkType[idx].type
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						if(res.errMsg == 'scanCode:ok') {
							let obj = JSON.parse(res.result)
							$this.c_toSaveScanObj(obj)
							if(type < 2) {
								uni.navigateTo({
									url: `/pages/checkPower/toCheck?type=${type}`
								})
							}
							if(type == 2 || type == 3) {
								if(obj.vip_id > 1) {
									uni.navigateTo({
										url: `/pages/checkPower/toCheck?type=${type}`
									})
								}else {
									$this.$api.warnNotice('请提升会员等级')
								}
							}
							if(type == 4) {
								if(obj.vip_id > 2) {
									uni.navigateTo({
										url: `/pages/checkPower/toCheck?type=${type}`
									})
								}else {
									$this.$api.warnNotice('请提升会员等级')
								}
							}
							if(type == 5) {
								if(obj.vip_id > 3) {
									uni.navigateTo({
										url: `/pages/checkPower/toCheck?type=${type}`
									})
								}else {
									$this.$api.warnNotice('请提升会员等级')
								}
							}
						}else {
							$this.$api.warnNotice('扫码失败')
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.checkPowerBox {
		display: flex;
		flex-wrap: wrap;
	}
	.itemCheckPower {
		width: 250upx;
		height: 300upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #F0F0F1;
		&:not(:nth-child(3n)) {
			border-right: 1px solid #F0F0F1;
		}
		.itemCheckPowerIcon {
			width: 140upx;
			height: 140upx;
			margin-bottom: 30upx;
		}
		.itemCheckPowerName {
			font-size: 28upx;
			color: $uni-text-color-black;
		}
	}
</style>
