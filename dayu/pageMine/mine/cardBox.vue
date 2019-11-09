<template>
	<view class="showMemberCard" data-sign="cardBox" @click.stop="toCloseBox">
		<view class="memberCardBox">
			<view class="memberCardBg" v-if="userInfo.vip_id == 1"><img :src="imgs.vipBg1" alt=""></view>
			<view class="memberCardBg" v-if="userInfo.vip_id == 2"><img :src="imgs.vipBg2" alt=""></view>
			<view class="memberCardBg" v-if="userInfo.vip_id == 3"><img :src="imgs.vipBg3" alt=""></view>
			<view class="memberCardBg" v-if="userInfo.vip_id == 4"><img :src="imgs.vipBg4" alt=""></view>
			<view class="memberCardInfo">
				<view class="memberCardText" :class="[{card1_color: userInfo.vip_id == 1}, {card2_color: userInfo.vip_id == 2}, {card3_color: userInfo.vip_id == 3}, {card4_color: userInfo.vip_id == 4}]">柳叶大渔 · VIP会员</view>
				<view class="memberCardUser">
					<view class="memberCardUserInfo">
						<view class="memberCardUserImg"><img :src="userInfo.avatar" alt=""></view>
						<view class="memberCardUserTxt">
							<view class="memberCardUserName">{{userInfo.nick_name}}</view>
							<view class="memberCardText" :class="[{card1_color: userInfo.vip_id == 1}, {card2_color: userInfo.vip_id == 2}, {card3_color: userInfo.vip_id == 3}, {card4_color: userInfo.vip_id == 4}]">
								{{userInfo.vip_id == 1? '体验VIP会员': 
								userInfo.vip_id == 2? '黄金VIP会员':
								userInfo.vip_id == 3? '钻石VIP会员': '黑金VIP会员'}}
							</view>
						</view>
					</view>
					<view class="memberCardIcon"><img :src="imgs.cardBg" alt=""></view>
				</view>
				<view class="memberCardTime">
					<view class="memberCardTimeTxt">到期时间</view>
					<view class="memberCardText" v-if="userInfo.vip_id == 1" :class="[{card1_color: userInfo.vip_id == 1}]">无时限</view>
					<view class="memberCardText" v-if="userInfo.vip_id != 1" :class="[{card2_color: userInfo.vip_id == 2}, {card3_color: userInfo.vip_id == 3}, {card4_color: userInfo.vip_id == 4}]">{{endTime}}</view>
				</view>
				<view class="showMeberCardQr"><img :src="'data:image/png;base64,'+codeSrc" alt=""></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: {
					vipBg1: require('./imgs/vip_bg_1.png'),
					vipBg2: require('./imgs/vip_bg_2.png'),
					vipBg3: require('./imgs/vip_bg_3.png'),
					vipBg4: require('./imgs/vip_bg_4.png'),
					cardBg: require('./imgs/card_bg_icon.png')
				},
				codeSrc: ''
			}
		},
		computed: {
			userInfo() {
				return this.$userInfo
			},
			endTime() {
				return this.$userInfo.vip_end_time.split(' ')[0].replace(/-/g, '/')
			}
		},
		onLoad() {
			this.getCardQrCode()
		},
		methods: {
			toCloseBox(e) {
				if(e.target.dataset.sign == 'cardBox') {
					this.$emit('closeCardBox', false)
				}
			},
			getCardQrCode() {
				const $this = this
				uni.request({
				  url: `${$this.$config.cardCode}?uid=${$this.$userInfo.uid}`,
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
	.showMemberCard {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1999;
		background: rgba(0,0,0,0.50);
		display: flex;
		align-items: center;
		justify-content: center;
		.memberCardBox {
			width: 542upx;
			height: 732upx;
			position: relative;
			.memberCardBg {
				position: relative;
				z-index: 1;
				width: 100%;
				height: 100%;
			}
			.memberCardInfo {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 10;
				padding: 40upx 40upx 0 50upx;
				.memberCardText {
					font-size: 24upx;
					margin-bottom: 50upx;
				}
				.memberCardUser {
					display: flex;
					align-items: center;
					margin-bottom: 50upx;
					.memberCardUserInfo {
						flex: 1;
						overflow: hidden;
						display: flex;
						align-items: center;
						height: 88upx;
						.memberCardUserImg {
							width: 88upx;
							height: 100%;
							border-radius: 50%;
							overflow: hidden;
							margin-right: 20upx;
							background-color: $uni-bg-color;
						}
						.memberCardUserTxt {
							height: 100%;
							flex: 1;
							overflow: hidden;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.memberCardUserName {
								font-size: 28upx;
								color: $uni-text-color;
								@extend .ellipse1;
							}
							.memberCardText {
								font-size: 28upx;
								margin: 0;
							}
						}
					}
					.memberCardIcon {
						width: 120upx;
						height: 100upx;
					}
				}
				.memberCardTime {
					width: 100%;
					height: auto;
					margin-bottom: 60upx;
					.memberCardTimeTxt {
						font-size: 20upx;
						color: $uni-text-color;
						margin-bottom: 10upx;
					}
					.memberCardText {
						margin: 0;
					}
				}
				.showMeberCardQr {
					width: 250upx;
					height: 250upx;
					margin: 0 auto;
					background-color: $uni-bg-color;
					border-radius: 12upx;
				}
			}
		}
	}
</style>
