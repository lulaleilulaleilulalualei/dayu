<template>
	<view class="memberCenter">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">会员中心</block></cu-custom>
		<view class="contentBox">
			<view class="showMemberCard">
				<swiper class="swiper" previous-margin="20rpx" :current="currentIdx" next-margin="20rpx" @change="swiperChange">
					<block v-for="item in cardArr" :key="item.vip_id">
						<swiper-item class="swiperItem">
							<scroll-view class="swiperScroll" :scroll-y="true" :scroll-with-animation="true" :scroll-top="item.scrollTop">
								<view class="itemCardBox">
									<view class="itemCardShow">
										<view class="itemCardBg"><image :src="item.icon" mode=""></image></view>
										<view class="itemCardContent">
											<view class="itemCardTopContent">
												<view class="itemCardTitle skeleton-rect" :class="{card4_color: item.vip_id == 4}">{{item.vip_name}}</view>
												<view class="itemCardCount skeleton-rect" :class="[{card1_color: item.vip_id == 1}, {card2_color: item.vip_id == 2}, {card3_color: item.vip_id == 3}, {card4_color: item.vip_id == 4}]">开通会员享{{item.rights_list.length}}大会员权益</view>
											</view>
											<view class="itemCardBottomContent">
												<view class="itemCardPrice skeleton-rect" v-if="item.vip_id == 1"><text>免费</text></view>
												<view class="itemCardPrice skeleton-rect" :class="{card4_color: item.vip_id == 4}" v-if="item.vip_id != 1">￥<text>{{item.vip_price}}</text>/年</view>
												<block v-if="isOpenCard == 1 && item.vip_id == cardId">
													<view class="itemCardUseLimit" v-if="item.vip_id == 1">剩余次数： {{fishCount}}/次</view>
													<view class="itemCardUseLimit" :class="{card4_color: item.vip_id == 4}" v-if="item.vip_id != 1">{{vipEndTime[0]}}年{{vipEndTime[1]}}月{{vipEndTime[2]}}日0点到期</view>
												</block>
											</view>
										</view>
									</view>
								</view>
								<view class="showMemberPower">
									<view class="memberPowerTitle">体验会员权益</view>
									<view class="itemMemberPower" v-for="(val, idx) in item.rights_list" :key="idx">
										<view class="itemMemberPowerIcon"><img :src="val.icon" alt=""></view>
										<view class="itemMemberPowerInfo">
											<view class="itemMemberPowerTitle">{{val.name}}</view>
											<view class="itemMemberPowerDesc">{{val.desc}}</view>
											<view class="itemMemberPowerType" v-if="val.type == 1">
												<view class="itemShowMemberText">大渔会员{{item.count_vip_price}}元/次</view>
												<view class="itemShowNoMemberText">普通用户{{item.count_price}}元/次</view>
											</view>
											<view class="itemMemberPowerType" v-if="val.type != 1">
												<view class="itemShowMemberText">
													{{item.vip_id == 1? '体验会员专属': item.vip_id == 2? '黄金会员专属': item.vip_id == 3? '钻石会员专属': '黑金会员专属'}}
												</view>
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
					</block>
			    </swiper>
			</view>
		</view>
		
		<view class="operationBtn" v-if="isOpenCard == 0">
			<view @click="toOpenMemberCard">
				<text>{{btnText}}</text>
			</view>
			<button v-if="!isAuth" class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权</button>
		</view>
		<view class="operationBtn" v-if="isOpenCard == 1 && curShowVip.vip_id != 1 && curShowVip.vip_id >= cardId && isAuth">
			<view  @click="toOpenMemberCard">{{btnText}}</view>
		</view> 
		
		<getMemberInfo v-if="isShowMemberInfo" @getMemberInfo="memberInfo"></getMemberInfo>
		<payBox v-if="isToPayBox" @toPayBox="toPayBox" :vipid="curShowVip.vip_id" :vip_pri="curShowVip.vip_price" @toPayMember="toPayMember"></payBox>
		<memberSuccess v-if="isShowSuccessBox" :vipid="curShowVip.vip_id" @toMemberSuccess="toMemberSuccess"></memberSuccess>
	</view>
</template>

<script>
	import getMemberInfo from './getMemberInfo.vue'
	import payBox from './payBox.vue'
	import memberSuccess from './memberSuccess.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				cardArr: [],
				currentIdx: 0, //当前显示
				isOpenCard: 0, //表示未开卡
				cardId: 0, //表示没有开卡
				curShowVip: {},
				scrollTop: 0,
				vipEndTime: '',
				fishCount: null, //钓鱼次数
				btnText: '',
				userName: '',
				userTel: '',
				isShowMemberInfo: false, //是否显示信息框
				isToPayBox: false, //显示支付弹框
				isShowSuccessBox: false, //成功框
				
				isAuth: false, //是否授权
			}
		},
		components: {getMemberInfo, payBox, memberSuccess},
		computed: {
			...mapGetters([
				'c_cardList'
			]),
		},
		onLoad(options) {
			this.currentIdx = options.idx
			if(this.$userInfo) {
				this.isAuth = true
				this.isOpenCard = this.$userInfo.is_vip
				if(this.$userInfo.vip_end_time) {
					this.vipEndTime = this.$userInfo.vip_end_time.split(' ')[0].split('-')
				}
				if(this.isOpenCard == 1) {
					this.cardId = this.$userInfo.vip_id
					this.userName = this.$userInfo.name
					this.userTel = this.$userInfo.tel
				}
			}
			this.cardArr = this.c_cardList
			this.cardArr.map((val, idx) => {
				if(this.isOpenCard == 1) {
					if(this.cardId == val.vip_id) {
						val.btnText = '重新购买'
					}else if(val.vip_id > this.cardId) {
						val.btnText = '立即激活'
					}else {
						val.btnText == ''
					}
				}else {
					if(val.vip_id == 1) {
						val.btnText = '新用户免费体验'
					}else {
						val.btnText = '立即激活'
					}
				}
				val.scrollTop = 0
				val.rights_list.map((v, i) => {
					switch (v.type){
						case 1: v.icon = '../../static/pow_icon_1.png'
							break;
						case 2: v.icon = '../../static/pow_icon_2.png'
							break;
						case 3: v.icon = '../../static/pow_icon_3.png'
							break;
						case 4: v.icon = '../../static/pow_icon_4.png'
							break;
						case 5: v.icon = '../../static/pow_icon_5.png'
							break;
						case 6: v.icon = '../../static/pow_icon_6.png'
							break;
						case 7: v.icon = '../../static/pow_icon_7.png'
							break;
						case 8: v.icon = '../../static/pow_icon_8.png'
							break;
						case 9: v.icon = '../../static/pow_icon_9.png'
							break;
						default: '';
							break;
					}
				})
			})
			this.curShowVip = this.cardArr[this.currentIdx]
			this.btnText = this.cardArr[this.currentIdx].btnText //默认值显示
			setTimeout(() => {
				if(this.isOpenCard == 1) {
					this.residueFishCount()
				}
			}, 10);
			
		},
		methods: {
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
							$this.isOpenCard = $this.$userInfo.is_vip
							if($this.$userInfo.vip_end_time) {
								$this.vipEndTime = $this.$userInfo.vip_end_time.split(' ')[0].split('-')
							}
							if($this.isOpenCard == 1) {
								$this.cardId = $this.$userInfo.vip_id
								$this.userName = $this.$userInfo.name
								$this.userTel = $this.$userInfo.tel
							}
							$this.cardArr.map((val, idx) => {
								if($this.isOpenCard == 1) {
									if($this.cardId == val.vip_id) {
										val.btnText = '重新购买'
									}else if(val.vip_id > $this.cardId) {
										val.btnText = '立即激活'
									}else {
										val.btnText == ''
									}
								}else {
									if(val.vip_id == 1) {
										val.btnText = '新用户免费体验'
									}else {
										val.btnText = '立即激活'
									}
								}
							})
							$this.curShowVip = $this.cardArr[$this.currentIdx]
							$this.btnText = $this.cardArr[$this.currentIdx].btnText //默认值显示
							setTimeout(() => {
								if($this.isOpenCard == 1) {
									$this.residueFishCount()
								}
							}, 10);
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权！')
			    this.isAuth = false
			  }
			},
			toOpenMemberCard() {
				if(this.isOpenCard != 1) {
					this.isShowMemberInfo = !this.isShowMemberInfo
				}else {
					this.isToPayBox = !this.isToPayBox
				}
			},
			memberInfo(val) {
				this.isShowMemberInfo = false
				if(val.type == 1) {
					this.userName = val.userName
					this.userTel = val.userTel
					if(this.curShowVip.vip_id != 1) {
						this.isToPayBox = true
					}else {
						this.toPayMember() //直接成为体验会员
					}
				}
			},
			toPayBox(val) {
				this.isToPayBox = val
			},
			toMemberSuccess(val) {
				this.isShowSuccessBox = val
			},
			swiperChange(e) {
				this.currentIdx = e.detail.current
				this.cardArr[this.currentIdx].scrollTop = -1
				this.curShowVip = this.cardArr[this.currentIdx]
				this.btnText = this.cardArr[this.currentIdx].btnText
				setTimeout(() => {
					this.cardArr[this.currentIdx].scrollTop = 0
				}, 10)
			},
			btnTextChange() {
				this.cardArr.map((val, idx) => {
					if(this.cardId == val.vip_id) {
						val.btnText = '重新购买'
					}else if(val.vip_id > this.cardId) {
						val.btnText = '立即激活'
					}else {
						val.btnText == ''
					}
				})
				this.btnText = this.cardArr[this.currentIdx].btnText
			},
			residueFishCount() {
				const $this = this
				this.$api.ajax({
					url: this.$config.fishCount,
					data: {
						uid: this.$userInfo.uid
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.fishCount = res.data.data.surplus_count
					}else {
						this.$api.warnNotice(res.data.message)
					}
				})
				.catch((err) => {
					this.$api.warnNotice('操作失败')
				})
			},
			toPayMember (val) {
				if(this.curShowVip.vip_id != 1) {
					uni.showLoading({
					  title: '正在调用支付...',
					  mask: true
					})
				}
				const $this = this
				this.$api.ajax({
					url: this.$config.buyCard,
					method: 'POST',
					data: {
						uid: this.$userInfo.uid,
						openid: this.$userInfo.openid,
						vip_id: this.curShowVip.vip_id,
						name: this.userName,
						tel: this.userTel
					}
				})
				.then((resolve) => {
					if(resolve.statusCode == 200 && resolve.data.code == 0) {
						if(this.curShowVip.vip_id != 1) {
							wx.hideLoading()
							uni.requestPayment({
							  'timeStamp': resolve.data.data.timeStamp,
							  'nonceStr': resolve.data.data.nonceStr,
							  'package': resolve.data.data.package,
							  'signType': resolve.data.data.signType,
							  'paySign': resolve.data.data.paySign,
							  success: (res) => {
							    if (res.errMsg == 'requestPayment:ok') {
								this.isToPayBox = false //关闭支付框
							    uni.showToast({
							        title: '支付成功',
							        icon: 'success',
							        success: () => {
							          setTimeout(() => {
							            this.isShowSuccessBox = true //显示购买成功弹框
										this.isOpenCard = 1
										this.cardId = this.curShowVip.vip_id
										this.btnTextChange()
										this.$api.userLogin(() => {})
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
							uni.showToast({
							  title: '开通成功',
							  icon: 'success',
							  success: () => {
							    setTimeout(() => {
							      this.isShowSuccessBox = true //显示购买成功弹框
								  this.isOpenCard = 1
								  this.cardId = this.curShowVip.vip_id
								  this.btnTextChange()
								  this.$api.userLogin(() => {})
							    }, 1500)
							  }
							})
						}
					}else {
						wx.hideLoading()
						this.$api.warnNotice(resolve.data.message)
					}
				})
				.catch((err) => {
					wx.hideLoading()
					this.$api.warnNotice('开通失败')
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.memberCenter {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.contentBox {
			flex: 1;
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;
		}
	}
	.operationBtn {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		padding: 0 40upx 40upx;
		background-color: #fff;
		view {
			width: 100%;
			height: 88upx;
			line-height: 88upx;
			text-align: center;
			font-size: 36upx;
			color: $uni-text-color;
			border-radius: 4upx;
			@extend .btnImg1;
		}
	}
	.showMemberCard {
		width: 100%;
		height: 100%;
		.swiper {
			width: auto;
			height: 100%;
			.swiperItem {
				width: 690upx !important;
				height: 100%;
			}
			.swiperScroll {
				width: 100%;
				height: 100%;
			}
		}
		.itemCardBox {
			width: 670upx;
			height: 430upx;
			margin-left: 20upx;
			padding-bottom: 60upx;
			overflow: hidden;
			.itemCardShow {
				width: 100%;
				height: 100%;
				border-radius: 12upx;
				position: relative;
				.itemCardBg {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 1;
				}
				.itemCardContent {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 10;
					width: 100%;
					height: 100%;
					padding: 60upx 40upx;
					box-shadow: 0 10upx 60upx -10upx rgba(0,0,0,0.4);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.itemCardTitle {
						font-size: 44upx;
						color: $uni-text-color;
						margin-bottom: 20upx;
					}
					.itemCardCount {
						font-size: 24upx;
					}
					.itemCardPrice {
						font-size: 36upx;
						color: $uni-text-color;
						display: flex;
						align-items: flex-end;
						margin-bottom: 10upx;
						text {
							display: block;
							font-size: 70upx;
							line-height: 70upx;
							padding: 0 10upx;
							font-weight: 600;
						}
					}
					.itemCardUseLimit {
						font-size: 24upx;
						color: $uni-text-color;
					}
				}
			}
		}
		.showMemberPower {
			padding: 20upx 50upx 130upx;
			.memberPowerTitle {
				font-size: 32upx;
				color: $uni-text-color-black;
				font-weight: 700;
				margin-bottom: 60upx;
			}
			.itemMemberPower {
				display: flex;
				height: 140upx;
				width: 100%;
				margin-bottom: 60upx;
				.itemMemberPowerIcon {
					width: 140upx;
					height: 100%;
					margin-right: 40upx;
				}
				.itemMemberPowerInfo {
					flex: 1;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.itemMemberPowerTitle {
						font-size: 36upx;
						color: $uni-text-color-black;
						font-weight: 700;
					}
					.itemMemberPowerDesc {
						font-size: 24upx;
						color: $uni-text-color-grey;
					}
					.itemMemberPowerType {
						display: flex;
						align-items: center;
						.itemShowMemberText {
							font-size: 24upx;
							color: $uni-color-card4;
						}
						.itemShowNoMemberText {
							font-size: 24upx;
							color: $uni-text-color-grey;
							margin-left: 20upx;
						}
					}
				}
			}
		}
	}
</style>
