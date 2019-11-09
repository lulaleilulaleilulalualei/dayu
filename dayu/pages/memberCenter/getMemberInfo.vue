<template>
	<view class="getMemberInfo" data-sign="info" @click="toCloseBox">
		<view class="infoBox">
			<view class="infoBoxTitle">大渔会员</view>
			<view class="itemGetInfo">
				<view class="itemGetInfoTitle">姓名：</view>
				<view class="itemGetInfoInp">
					<input type="text" placeholder="请输入您的真实姓名" @blur="getUserName" @confirm="getUserName" placeholder-style="color: #AEAEAE" name="" id="" />
				</view>
			</view>
			<view class="itemGetInfo">
				<view class="itemGetInfoTitle">手机：</view>
				<view class="itemGetInfoInp" :class="{itemHadInfoInp: isGetInpInfo}">{{userTel}}</view>
				<button class="getTelUser" open-type="getPhoneNumber" @getphonenumber="getUserTel">点击获取</button>
			</view>
			<view class="toOpenCard" @click="toOpenCard">开启大渔之旅</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				userTel: '请点击右侧授权获取',
				isGetInpInfo: false,
			}
		},
		methods: {
			getUserName(e) {
				this.userName = e.detail.value
			},
			getUserTel(e) {
				const $this = this
				this.$api.ajax({
					url: this.$config.getPhone,
					data: {
						session_key: this.$userInfo.session_key,
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.isGetInpInfo = true
						this.userTel = res.data.data.phoneNumber
					}else {
						this.api.warnNotice(res.data.message)	
					}
				})
				.catch(() => {
					this.api.warnNotice('操作失败')
				})
			},
			toOpenCard() {
				if(this.$api.trim(this.userName) != '') {
					if(this.isGetInpInfo) {
						this.$emit('getMemberInfo', {type: 1, userName: this.userName, userTel: this.userTel})
					}
				}else {
					this.$api.warnNotice('真实姓名不能为空')
				}
			},
			toCloseBox(e) {
				if(e.target.dataset.sign == 'info') {
					this.$emit('getMemberInfo', {type: 0, userName: '', userTel: ''})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.getMemberInfo {
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
		.infoBox {
			height: auto;
			width: 670upx;
			padding: 40upx;
			border-radius: 8upx;
			background-color: #fff;
			.infoBoxTitle {
				font-size: 36upx;
				color: $uni-text-color-black;
				font-weight: 700;
				margin-bottom: 60upx;
			}
			.itemGetInfo {
				display: flex;
				align-items: center;
				margin-bottom: 40upx;
				.itemGetInfoTitle {
					font-size: 32upx;
					color: $uni-text-color-black;
					width: 120upx;
				}
				.itemGetInfoInp {
					flex: 1;
					height: 60upx;
					line-height: 60upx;
					font-size: 32upx;
					color: $uni-text-color-grey;
					input {
						display: block;
						width: 100%;
						height: 100%;
						color: $uni-text-color-black;
					}
				}
				.itemHadInfoInp {
					color: $uni-text-color-black;
				}
				.getTelUser {
					width: 160upx;
					height: 60upx;
					margin-left: 20upx;
					line-height: 60upx;
					font-size: 28upx;
					color: $uni-text-color;
					padding: 0;
					@extend .btnImg1;
				}
			}
			.toOpenCard {
				margin-top: 80upx;
				width: 100%;
				height: 88upx;
				line-height: 88upx;
				border-radius: 44upx;
				font-size: 32upx;
				color: $uni-text-color;
				text-align: center;
				@extend .btnImg2;
			}
		}
	}
</style>
