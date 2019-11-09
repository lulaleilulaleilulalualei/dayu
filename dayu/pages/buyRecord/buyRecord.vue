<template>
	<view class="buyRecord">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom bgColor="white" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="contentTitle"><text class="skeleton-rect">购买记录</text></view>
		<view class="contentBox">
			<scroll-view class="contentScroll" :scroll-y="!isShowSkeleton" @scrolltolower="toLoadMore">
				<view class="itemShowStore" :class="{noUserCoupon: item.type == 1 && item.ticket_status != 0}" v-for="(item, idx) in buyList" :key="idx" @click="toJumpBuyDetail(idx)">
					<view class="itemStoreImg skeleton-rect">
						<image :src="item.proImg" mode="aspectFill"></image>
					</view>
					<view class="itemStoreInfo">
						<view class="itemStoreTopInfo">
							<view class="itemStoreTitle skeleton-rect">{{item.proName}}</view>
							<view class="itemStoreBuyTime skeleton-rect">购买时间：{{item.created_time}}</view>
							<view class="itemStoreEffectTime skeleton-rect" v-if="item.type == 1">有效期： {{item.startTime}}-{{item.endTime}}</view>
						</view>
						<view class="itemStorePrice skeleton-rect">¥{{item.pay_fee}}</view>
					</view>
					
					<view class="showCouponStatus" v-if="item.type == 1 && item.ticket_status != 0">
						<img :src="item.ticket_status == 1? '../../static/hadUse.png': item.ticket_status == 2? '../../static/pastDut.png': ''" alt="">
					</view>
				</view>
				<noMore v-if="!isMore"></noMore>
			</scroll-view>
		</view>
		
		<noListData v-if="buyList.length == 0" noText="还没有购买记录"></noListData>
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	import noMore from '@/components/noMore.vue'
	import noListData from '@/components/noListData.vue'
	import loadErr from '@/components/loadErr.vue'
	
	export default {
		data() {
			return {
				isShowSkeleton: true,
				buyList: [{},{},{},{}], //购买列表
				index: 1,
				size: 10,
				isMore: true,
				isLoadErr: false
			}
		},
		components: {noMore, noListData, loadErr, skeleton},
		onLoad() {
			if(this.$userInfo) {
				this.buyList = []
				if(this.$userInfo && this.$userInfo.buy_count > 0) {
					for(var i=0;i<this.$userInfo.buy_count;i++) {
						this.buyList.push({})
					}
				}
				this.getBuyList()
			}else {
				this.buyList = []
				setTimeout(() => {
					this.isShowSkeleton = false
				}, 200)
			}
		},
		methods: {
			toJumpBuyDetail(idx) {
				const $this = this
				uni.navigateTo({
					url: `/pages/orderDetail/orderDetail?id=${$this.buyList[idx].buy_id}`
				})
			},
			toLoadMore() {
				if(this.isMore) {
					this.getBuyList()
				}
			},
			toRelaodData() {
				this.isLoadErr = false
				this.index = 1
				this.buyList = []
				this.isMore = true
				this.getBuyList()
			},
			getBuyList() {
				this.$api.ajax({
					url: this.$config.buyRecord,
					data: {
						uid: this.$userInfo.uid,
						index: this.index,
						size: this.size
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.index == 1) {
							this.buyList = []
						}
						let arr = res.data.data
						arr.map((v, i) => {
							let buyObj = JSON.parse(v.buy_json)
							v.proImg = buyObj.proImg
							v.proName = buyObj.proName
							v.type = buyObj.type
							if(buyObj.type == 1) {
								v.startTime = buyObj.expireStart.replace(/-/g, '/')
								v.endTime = buyObj.expireEnd.replace(/-/g, '/')
							}
						})
						if(arr.length < this.size) {
							this.buyList = this.buyList.concat(arr)
							this.isMore = false //没有更多了
						}else {
							this.buyList = this.buyList.concat(arr)
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
				.catch((err) => {
					console.log(err)
					if(this.index == 1) {
						this.isShowSkeleton = false
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('加载失败')
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.buyRecord {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.contentTitle {
			padding: 30upx 30upx 60upx;
			font-size: 48upx;
			color: $uni-text-color-black;
			font-weight: 800;
		}
		.contentBox{
			flex: 1;
			width: 100%;
			overflow: hidden;
			padding: 0 30upx;
			.contentScroll {
				width: 100%;
				height: 100%;
			}
		}
	}
	.noUserCoupon {
		background-color: rgba(0,0,0,0.02)
	}
	.itemShowStore {
		display: flex;
		width: 100%;
		height: 200upx;
		margin-bottom: 50upx;
		position: relative;
		.itemStoreImg {
			width: 200upx;
			height: 100%;
			position: relative;
			z-index: 1;
			border-radius: 8upx;
			overflow: hidden;
			background-color: $uni-bg-color;
			margin-right: 30upx;
		}
		.itemStoreInfo {
			height: 100%;
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
		.itemStoreTopInfo {
			.itemStoreTitle {
				font-size: 32upx;
				color: $uni-text-color-black;
				font-weight: 700;
				margin-bottom: 10upx;
				@extend .ellipse1;
			}
			.itemStoreBuyTime {
				font-size: 24upx;
				color: $uni-text-color-grey;
			}
			.itemStoreEffectTime {
				font-size: 20upx;
				color: $uni-text-color-grey;
				margin-top: 10upx;
			}
		}
		.itemStorePrice {
			font-size: 48upx;
			color: $uni-text-color-red;
			font-weight: 800;
		}
		.showCouponStatus {
			position: absolute;
			bottom: 0;
			right: 0;
			width: 120upx;
			height: 112upx;
		}
	}
</style>
