<template>
	<view class="home">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom bgColor="white" :isShowBorder="false" :isBack="false"><block slot="content"></block></cu-custom>
		<view class="homeTop">
			<view class="homeTitle skeleton-rect"><text v-if="!isShowSkeleton">大渔</text></view>
			<view class="homeMine skeleton-circle" @click="toJumpMine">
				<!-- #ifdef MP-WEIXIN -->
				<open-data v-if="!userUrl" type="userAvatarUrl"></open-data>
				<!-- #endif -->
				<img v-if="userUrl" :src="userUrl" alt="">
			</view>
			
		</view>
		<view class="homeContent">
			<scroll-view class="homeContentScroll" :scroll-y="!isShowSkeleton" @scrolltolower="toLoadMore">
				<view class="showMemberCard">
					<swiper class="swiper" previous-margin="20rpx" next-margin="20rpx">
						<block v-for="(item, idx) in cardArr" :key="item.vip_id">
							<swiper-item class="swiperItem">
							    <view class="itemCardBox" @click="toJumpMemberCenter(idx)">
									<view class="itemCardShow">
										<view class="itemCardBg"><image :src="item.icon" mode=""></image></view>
										<view class="itemCardContent">
											<view class="itemCardTopContent">
												<view class="itemCardTitle skeleton-rect">{{item.vip_name}}</view>
												<view class="itemCardCount skeleton-rect" :class="[{card1_color: item.vip_id == 1}, {card2_color: item.vip_id == 2}, {card3_color: item.vip_id == 3}, {card4_color: item.vip_id == 4}]">开通会员享{{item.rights_list.length}}大会员权益</view>
											</view>
											<view class="itemCardPrice skeleton-rect" v-if="item.vip_id == 1"><text>免费</text></view>
											<view class="itemCardPrice skeleton-rect" v-if="item.vip_id != 1">￥<text>{{item.vip_price}}</text>/年</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</block>
				    </swiper>
				</view>
				<view class="storeBox">
					<view class="storeBoxTop">
						<view class="storeBoxTitle skeleton-rect"><text v-if="!isShowSkeleton">福利商城</text></view>
						<view class="storeBoxRecord skeleton-rect" @click="toJumpBuyRecord"><text v-if="!isShowSkeleton">购买记录</text></view>
					</view>
					<view class="storeList">
						<view class="itemStoreShow" v-for="(item, idx) in storeList" :key="idx" @click="toJumpToStoreDetail(idx)">
							<view class="itemStoreImg skeleton-rect">
								<image :src="item.goods_thumb" mode="aspectFill"></image>
							</view>
							<view class="itemStoreInfo">
								<view class="itemStoreTitle skeleton-rect">{{item.goods_name}}</view>
								<view class="itemStorePrice skeleton-rect">￥<text>{{item.goods_price}}</text></view>
							</view>
							<view class="itemToBuyIcon">BUY</view>
						</view>
						<view class="storeBlank" v-if="storeList.length == 0">
							<view class="storeBlankImg"><img src="../../static/noData.png" alt=""></view>
							<view class="storeBlankText">还没有商品~</view>
						</view>
						<noMore v-if="!isMore" />
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- <loginBox v-if="isShowAccreditBox" @showAuthBox="toEmitShowAuth"></loginBox> -->
		<!-- <noListData noText="数据为空"></noListData> -->
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
		
		<!-- 兴趣选择 -->
		<!-- <selectInterested v-if="isShowInterested" @toCloseInterested="closeInterested"></selectInterested> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import selectInterested from '@/pageA/interestedType/interestedType.vue'
	import skeleton from '@/components/quick-skeleton.vue'
	// import noListData from '@/components/noListData.vue'
	import loadErr from '@/components/loadErr.vue'
	// import loginBox from '@/components/loginBox.vue'
	import noMore from '@/components/noMore.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				cardArr: [{ //默认假数据
					vip_name: '柳叶体验会员',
					vip_price: '0',
					icon: '../../static/member_vip_1.png',
					rights_list: [],
					vip_id: 1
				}, {
					vip_name: '柳叶黄金会员',
					vip_price: 1000,
					icon: '../../static/member_vip_2.png',
					rights_list: [],
					vip_id: 2
				}, {
					vip_name: '柳叶钻石会员',
					vip_price: 5000,
					icon: '../../static/member_vip_3.png',
					rights_list: [],
					vip_id: 3
				}, {
					vip_name: '柳叶黑金会员',
					vip_price: 10000,
					icon: '../../static/member_vip_4.png',
					rights_list: [],
					vip_id: 4
				}],
				userUrl: '',
				isShowSkeleton: true,
				isShowAccreditBox: false, //默认不显示授权弹框
				isLoadErr: false, //加载出错
				isMore: true, //是否还有更多
				index: 1,
				size: 10,
				storeList: [{goods_name: '1'},{goods_name: '1'},{goods_name: '1'},{goods_name: '1'}], //默认产品列表
				
				isShowInterested: false, //是否显示兴趣选择
			}
		},
		components: {skeleton, noMore, loadErr, selectInterested},
		onLoad() {
			if(!this.$userInfo) { //加载登录配置
				this.$api.userLogin(() => {})
			}
			this.loadVipCard() //加载会员卡
			// }
		},
		onShow() {
			Vue.prototype.$isSharePage = false //返回首页后无分享设置
			if(this.$userInfo) {
				this.userUrl = this.$userInfo.avatar
			}
		},
		methods: {
			...mapActions([
				'c_getCardArrList'
			]),
			toJumTestPage() {
				// uni.navigateTo({
				// 	url: `/pageA/interestedType/interestedType`
				// })
			},
			closeInterested(val) {
				this.isShowInterested = val
			},
			toJumpMemberCenter(idx) {
				uni.navigateTo({
					url: `/pages/memberCenter/memberCenter?idx=${idx}`
				})
			},
			toJumpBuyRecord() {
				uni.navigateTo({
					url: '/pages/buyRecord/buyRecord'
				})
			},
			toJumpToStoreDetail(idx) {
				const $this = this
				uni.navigateTo({
					url: `/pages/storeDetail/storeDetail?id=${$this.storeList[idx].goods_id}`
				})
			},
			toJumpMine() {
				uni.navigateTo({
					url: '/pageMine/mine/mine'
				})
			},
			// toEmitShowAuth(status) {
			// 	this.isShowAccreditBox = status
			// 	this.userUrl = this.$userInfo.avatar
			// 	this.loadVipCard() //授权加载
			// },
			// accreditStatus: function() {
			//   const $this = this
			//   this.$api.userLogin((status) => {
			//     if (status == '1') {
			// 		this.userUrl = this.$userInfo.avatar
			// 		this.loadVipCard() //会员价加载
			//     }else {
			// 		this.loadVipCard() //会员价加载
			// 	}
			//   })
			// },
			toRelaodData() { //重新加载
				this.isLoadErr = false
				this.isMore = true
				this.index = 1
				this.size = 10
				this.cardArr = []
				this.storeList = []
				this.loadVipCard()
			},
			loadVipCard() {
				this.$api.ajax({
					url: this.$config.vipCard
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						let arr = res.data.data
						arr.map((v, i) => {
							if(v.vip_id == 1) {
								v.icon = '../../static/member_vip_1.png'
							}else if(v.vip_id == 2) {
								v.icon = '../../static/member_vip_2.png'
							}else if(v.vip_id == 3) {
								v.icon = '../../static/member_vip_3.png'
							}else if(v.vip_id == 4) {
								v.icon = '../../static/member_vip_4.png'
							}
						})
						this.cardArr = arr
						this.c_getCardArrList(arr)
						this.loadStoreList() //加载商品列表
					}else {
						this.api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isLoadErr = true
				})
			},
			loadStoreList() {
				this.$api.ajax({
					url: this.$config.storeList,
					data: {
						index: this.index,
						size: this.size
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.index == 1) {
							this.storeList = []
						}
						let arr = res.data.data
						if(arr.length < this.size) {
							this.storeList = this.storeList.concat(arr)
							this.isMore = false //没有更多了
						}else {
							this.storeList = this.storeList.concat(arr)
							this.index++
						}
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						if(this.index == 1) {
							this.isShowSkeleton = false
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
					}
				})
				.catch(() => {
					if(this.index == 1) {
						this.isShowSkeleton = false
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('商品加载失败')
					}
				})
			},
			toLoadMore() {
				if(this.isMore) {
					this.loadStoreList()
				}
			}
		},
		onShareAppMessage() {
			const $this = this
			return {
			  title: $this.$config.defaultTitle,
			  imageUrl: $this.$config.defaultUrl
			}
		}
	}
</script>

<style scoped lang="scss">
	.home {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.homeTop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40upx 40upx;
		.homeTitle {
			font-size: 56upx;
			color: $uni-text-color-black;
			font-weight: 800;
		}
		.homeMine {
			width: 80upx;
			height: 80upx;
			background-color: $uni-bg-color;
			box-shadow: 0 10upx 20upx 0 rgba(38,114,255,0.25);
			border-radius: 50%;
			overflow: hidden;
		}
	}
	.homeContent {
		flex: 1;
		width: 100%;
		overflow: hidden;
		.homeContentScroll {
			width: 100%;
			height: 100%;
		}
	}
	.showMemberCard {
		width: 100%;
		height: 430upx;
		.swiper {
			width: auto;
			height: 100%;
			.swiperItem {
				width: 690upx !important;
				height: 100%;
			}
		}
		.itemCardBox {
			width: 670upx;
			height: 100%;
			margin-left: 20upx;
			padding-bottom: 60upx;
			.itemCardShow {
				width: 100%;
				height: 100%;
				box-shadow: 0 20upx 40upx -20upx rgba(0,0,0,0.3);
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
						text {
							display: block;
							font-size: 70upx;
							line-height: 70upx;
							padding: 0 10upx;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
	.storeBox {
		padding: 0 40upx;
		.storeBoxTop {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			margin-bottom: 30upx;
			.storeBoxTitle {
				font-size: 48upx;
				color: $uni-text-color-black;
				font-weight: 600;
			}
			.storeBoxRecord {
				font-size: 28upx;
				color: $uni-text-color-blue;
			}
		}
		.storeList {
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.itemStoreShow {
				width: 324upx;
				height: auto;
				box-shadow: 0 4upx 20upx 0 rgba(211,204,204,0.30);
				border-radius: 16upx;
				overflow: hidden;
				position: relative;
				margin-bottom: 40upx;
				.itemStoreImg {
					width: 100%;
					height: 240upx;
					background-color: $uni-bg-color;
					position: relative;
					z-index: 1;
					border-radius:16rpx 16rpx 0 0;
					overflow: hidden;
				}
				.itemStoreInfo {
					width: 100%;
					height: 180upx;
					padding: 20upx 20upx 32upx 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					.itemStoreTitle {
						font-size: 24upx;
						color: $uni-text-color-black;
						font-weight: 600;
						width: 100%;
						@extend .ellipse1;
					}
					.itemStorePrice {
						font-size: 24upx;
						color: $uni-text-color-black;
						display: flex;
						align-items: flex-end;
						font-weight: 600;
						text {
							display: block;
							font-size: 36upx;
							line-height: 36upx;
						}
					}
				}
				.itemToBuyIcon {
					position: absolute;
					bottom: 32upx;
					right: 0;
					width: 72upx;
					height: 40upx;
					background-color: $uni-text-color-blue;
					text-align: center;
					line-height: 40upx;
					font-size: 20upx;
					color: $uni-text-color;
					border-radius: 20upx 0 0 20upx;
				}
			}
		}
	}
	.storeBlank {
		width: 100%;
		height: 500upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.storeBlankImg {
			width: 300upx;
			height: 230upx;
			margin-bottom: 20upx;
		}
		.storeBlankText {
			font-size: 28upx;
			color: $uni-text-color-grey;
			text-align: center;
		}
	}
</style>
