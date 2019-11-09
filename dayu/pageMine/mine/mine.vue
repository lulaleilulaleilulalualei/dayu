<template>
	<view class="mine">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom v-if="isShowTopNav" :bgColor="navColor" :isShowBorder="false" :isBack="true"><block slot="content"></block></cu-custom>
		<view class="mineBox">
			<scroll-view :scroll-y="!isShowSkeleton" class="mineScroll" :scroll-top="defTopH" @scroll="mineScroll" @scrolltolower="toLoadMore">
				<view class="mineBanner">
					<view class="mineBannerBg"><image :src="imgs.mineBg" mode=""></image></view>
					<view class="mineBannerInfo" :style="{paddingTop: navBarH + 'px'}">
						<view class="mineInfoBox">
							<view class="mineUserInfo">
								<view class="mineUserName">
									<view class="mineUserNameTxt skeleton-rect">
										<text>{{isAuth? userInfo.nick_name: '点击登录账户'}}</text>
										<button v-if="!isAuth"  class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">点击登录账户</button>
									</view>
									<view class="mineUserVipIcon" v-if="userInfo.is_vip == 1">
										<view class="itemUserVipIcon skeleton-rect" v-if="userInfo.vip_id == 1"><img :src="imgs.vipIcon1" alt=""></view>
										<view class="itemUserVipIcon skeleton-rect" v-if="userInfo.vip_id == 2"><img :src="imgs.vipIcon2" alt=""></view>
										<view class="itemUserVipIcon skeleton-rect" v-if="userInfo.vip_id == 3"><img :src="imgs.vipIcon3" alt=""></view>
										<view class="itemUserVipIcon skeleton-rect" v-if="userInfo.vip_id == 4"><img :src="imgs.vipIcon4" alt=""></view>
										<!-- <view class="itemUserVipIcon skeleton-rect"><img :src="imgs.partnerIcon" alt=""></view> -->
										<!-- <view class="itemToApplyPartner skeleton-rect" @click="toApplyPartner">申请成为合伙人</view> -->
									</view>
								</view>
								<view class="mineUserImg skeleton-circle">
									<!-- #ifdef MP-WEIXIN -->
									<open-data v-if="!userInfo.avatar" type="userAvatarUrl"></open-data>
									<!-- #endif -->
									<img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
								</view>
							</view>
							<view class="showMemberInfo">
								<block v-if="userInfo.is_vip != 1">
									<view class="memberCardTitle skeleton-rect">新用户免费领取体验会员</view>
									<view class="memberCardIntro skeleton-rect">我们一起去钓鱼</view>
									<view class="memberCardBottom skeleton-rect">
										<view class="memberCardIcon"><img :src="imgs.vipIcon" alt=""></view>
										<view class="memberCardTxt">享大渔会员专属特权</view>
										<view class="memberCardToPower" @click="toJumpMemberCenter">查看特权</view>
									</view>
									<view class="memberCardQr" @click="toShowCardBox"><img :src="imgs.cardQr" alt=""></view>
								</block>
								<block v-if="userInfo.is_vip == 1">
									<view class="memberCardTitle skeleton-rect">
										{{userInfo.vip_id == 1? '柳叶体验会员': 
										userInfo.vip_id == 2? '柳叶黄金会员':
										userInfo.vip_id == 3? '柳叶钻石会员': '柳叶黑金会员'}}
									</view>
									<view v-if="fishCount" class="memberCardIntro skeleton-rect">剩余次数: {{fishCount}}</view>
									<view v-if="!fishCount && userInfo.vip_id != 1" class="memberCardIntro skeleton-rect">到期时间: {{vipEndTime}}</view>
									<view class="memberCardBottom skeleton-rect">
										<view class="memberCardIcon"><img :src="imgs.vipIcon" alt=""></view>
										<view class="memberCardTxt">享大渔会员专属特权</view>
										<view class="memberCardToPower" @click="toJumpMemberCenter">查看特权</view>
									</view>
									<view class="memberCardQr" @click="toShowCardBox"><img :src="imgs.cardQr" alt=""></view>
								</block>
								<view v-if="userInfo.is_ticker == 1" @click="toJumpChekcPower" class="toCheckCode"><img :src="imgs.codeIcon" alt=""></view>
							</view>
						</view>
					</view>
				</view>
				<view class="activityType">
					<view class="activityTypeBox" :style="{position: cutPostion}">
						<view class="itemActivityShow" 
							:class="{'itemActivityActive': item.isShow}" 
							v-for="(item, idx) in activityType" 
							:key="idx"
							@click="toCutActivityType(idx)">{{item.label}}</view>
					</view>
					
				</view>
				<view class="showActivityList">
					
					<block v-if="actType == 1">
						<view class="itemShowActivity" v-for="(item, idx) in aActArr" :key="idx" @click="toJumpActiviDetail(idx)">
							<view class="itemActivitImg skeleton-rect">
								<image mode="aspectFill" :src="item.thumb"></image>
								<view class="showItemActivityType">{{item.act_type == 0? '普通活动': '赛事活动'}}</view>
							</view>
							<view class="itemActivityInfo">
								<view class="itemActivityTitle skeleton-rect">{{item.name}}</view>
								<view class="itemActivityAddress skeleton-rect">
									<view class="itemAddressIcon"><img src="../../static/position_icon.png" alt=""></view>
									<view class="itemAddressText">{{item.address}}</view>
									<view class="itemActStatus" :class="{actRecruit: item.status == 0, actUnderWay: item.status == 1, actfFnish: item.status == 2}">
										{{item.status == 0? '招募中': item.status == 1? '进行中': '已结束'}}
									</view>
								</view>
								<view class="itemActivityTime skeleton-rect">
									<view class="itemActivityTimeBox">
										<view class="itemTimeIcon"><img src="../../static/time_icon.png" alt=""></view>
										<view class="itemTimeText">{{item.start_time}} 至 {{item.end_time}}</view>
									</view>
									<view class="itemAcitivityPrice">￥<text>{{item.apply_fee}}</text></view>
								</view>
							</view>
						</view>
						<noMore v-if="!aIsMore"></noMore>
						<view class="actArrBlank" v-if="aActArr.length == 0">
							<view class="actBlankImg"><img src="../../static/noData.png" alt=""></view>
							<view class="actBlankText">还没有活动~</view>
						</view>
					</block>
					
					<block v-if="actType == 2">
						<view class="itemShowActivity" v-for="(item, idx) in mActArr" :key="idx" @click="toJumpMyActiviDetail(idx)">
							<view class="itemActivitImg">
								<image mode="aspectFill" :src="item.thumb"></image>
								<view class="showItemActivityType">{{item.act_type == 0? '普通活动': '赛事活动'}}</view>
							</view>
							<view class="itemActivityInfo">
								<view class="itemActivityTitle">{{item.name}}</view>
								<view class="itemShowActApplyTime">报名时间： {{item.submit_time}}</view>
								<view class="itemActivityAddress">
									<view class="itemAddressIcon"><img src="../../static/position_icon.png" alt=""></view>
									<view class="itemAddressText">{{item.address}}</view>
									<view class="itemActStatus" :class="{actRecruit: item.status == 0, actUnderWay: item.status == 1, actfFnish: item.status == 2}">
										{{item.status == 0? '招募中': item.status == 1? '进行中': '已结束'}}
									</view>
								</view>
								<view class="itemActivityTime">
									<view class="itemActivityTimeBox">
										<view class="itemTimeIcon"><img src="../../static/time_icon.png" alt=""></view>
										<view class="itemTimeText">{{item.start_time}} 至 {{item.end_time}}</view>
									</view>
									<view class="itemAcitivityPrice">￥<text>{{item.apply_fee}}</text></view>
								</view>				
							</view>
						</view>
						<noMore v-if="!mIsMore"></noMore>
						<view class="actArrBlank" v-if="mActArr.length == 0">
							<view class="actBlankImg"><img src="../../static/noData.png" alt=""></view>
							<view class="actBlankText">{{isAuth? '还没有报名活动~': '还没有授权登录~'}}</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

		<cardBox v-if="isShowCardBox" @closeCardBox="toCloseCardBox"></cardBox>
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	import noMore from '@/components/noMore.vue'
	import cardBox from './cardBox.vue'
	import loadErr from '@/components/loadErr.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				imgs: {
					mineBg: require('./imgs/mineBg.jpg'),
					vipIcon1: require('./imgs/small_vip_1.png'),
					vipIcon2: require('./imgs/small_vip_2.png'),
					vipIcon3: require('./imgs/small_vip_3.png'),
					vipIcon4: require('./imgs/small_vip_4.png'),
					partnerIcon: require('./imgs/partner_icon.png'),
					vipIcon: require('./imgs/vip_icon.png'),
					cardQr: require('./imgs/card_qr.png'),
					codeIcon: require('./imgs/to_code.png')
				},
				
				isAuth: false, //是否已经授权登录
				userInfo: {},
				isShowSkeleton: true,
				userUrl: '',
				activityType: [{
					value: 1,
					label: '活动',
					isShow: true
				}, {
					value: 2,
					label: '我的活动',
					isShow: false
				}],
				actType: 1,
				navColor: 'transparent',
				scrollTop: 0, //滚动距离
				defTopH: 0, //设置滚动
				isShowTopNav: true, //是否显示顶部导航
				cutPostion: 'absolute',
				isShowCardBox: false, //是否显示会员卡
				fishCount: null, //钓鱼次数
				vipEndTime: '',
				
				aIndex: 1,
				aSize: 10,
				aActArr: [{},{}],
				aIsMore: true, //是否有更多
				mIndex: 1,
				mSize: 10,
				mActArr: [],
				mIsMore: true,
				isLoadErr: false
			}
		},
		components: {noMore, cardBox, loadErr, skeleton},
		computed: {
			...mapGetters([
				'c_isRefreshMinie',
				'c_cardList'
			]),
			navBarH() {
				return this.CustomBar
			}
		},
		onLoad() {
			const $this = this
			uni.getSystemInfo({//高度526upx
				success: (res) => {
					$this.scrollTop = (res.windowWidth / 750) * 526
				}
			})
			
			if(this.$userInfo) {
				this.aActArr = []
				if(this.userInfo.act_count > 0) {
					for(var i=0;i<this.userInfo.act_count;i++) {
						this.aActArr.push({})
					}
				}
			}
			
			this.activityList() //加载活动列表
		},
		onShow() {
			if(this.c_isRefreshMinie) {
				this.aIndex = 1
				this.aActArr = []
				this.aIsMore = true
				this.mIndex = 1
				this.mActArr = []
				this.mIsMore = true
				this.activityList() //加载活动列表
				this.c_toRefreshMine(false)
			}
			if(this.$userInfo) {
				this.userInfo = this.$userInfo
				this.vipEndTime = this.$userInfo.vip_end_time.split(' ')[0].replace(/-/g, '/')
				this.isAuth = true
				this.toRrefreshFishCount()
			}
		},
		onHide() {
			this.isShowTopNav = true
			this.cutPostion = 'absolute'
		},
		methods: {
			...mapActions([
				'c_toRefreshMine'
			]),
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
							$this.userInfo = $this.$userInfo
							$this.vipEndTime = $this.$userInfo.vip_end_time.split(' ')[0].replace(/-/g, '/')
							$this.toRrefreshFishCount()
							if($this.actType == 2) {
								$this.mineActivityList()
							}
			            }
			          })
			      }
			    })
			  }else {
			    this.$api.warnNotice('您已拒绝授权！')
			    this.isAuth = false
			  }
			},
			toApplyPartner() {
				uni.navigateTo({
					url: '/pages/applyPartner/applyPartner'
				})
			},
			toJumpChekcPower() {
				uni.navigateTo({
					url: '/pages/checkPower/checkPower'
				})
			},
			toJumpMemberCenter() {
				if(this.isAuth) {
					this.c_cardList.map((v, i) => {
						if(v.vip_id == this.$userInfo.vip_id) {
							uni.navigateTo({
								url: `/pages/memberCenter/memberCenter?idx=${i}`
							})
						}
					})
				}else {
					uni.navigateTo({
						url: `/pages/memberCenter/memberCenter?idx=0`
					})
				}
			},
			toRelaodData() {
				this.isLoadErr = false
				if(this.actType == 1) {
					this.aActArr = []
					this.aIsMore = true
					this.activityList()
				}else if(this.actType == 2) {
					this.mActArr = []
					this.mIsMore = true
					this.mineActivityList()
				}
				this.toRrefreshFishCount() //更新钓鱼次数
			},
			toRrefreshFishCount() {
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
					// this.$api.warnNotice('操作失败')
				})
			},
			toJumpActiviDetail(idx) {
				const $this = this
				uni.navigateTo({
					url: `/pages/activityDetail/activityDetail?id=${$this.aActArr[idx].act_id}`
				})
			},
			toJumpMyActiviDetail(idx) {
				const $this = this
				uni.navigateTo({
					url: `/pages/activityApplyDetail/activityApplyDetail?id=${$this.mActArr[idx].apply_id}&from=mine`
				})
			},
			toShowCardBox() {
				if(this.userInfo.is_vip == 1) {
					this.isShowCardBox = !this.isShowCardBox
				}else {
					this.$api.warnNotice('您还不是会员')
				}
			},
			toCloseCardBox(val) {
				this.isShowCardBox = val
				this.toRrefreshFishCount() //更新钓鱼次数
			},
			mineScroll(e) { 
				let top = e.detail.scrollTop
				if(top > 10) {
					this.navColor = 'rgba(255,255,255,0.6)'
					if(top >= this.scrollTop) {
						this.isShowTopNav = false
						this.cutPostion = 'fixed'
					}else {
						this.isShowTopNav = true
						this.cutPostion = 'absolute'
					}
				}else {
					this.navColor = 'transparent'
				}
				
			},
			toCutActivityType(idx) {
				this.activityType.map((v, i) => {
					if(idx == i) {
						v.isShow = true
						this.actType = v.value
						if(this.aIndex == 1 && this.aActArr.length == 0) {
							this.activityList()
						}
						if(this.mIndex == 1 && this.mActArr.length == 0) {
							if(this.isAuth) {
								this.mineActivityList()
							}else {
								this.mActArr = []
							}
						}
						
						this.defTopH = -1
						this.isShowTopNav = true
						this.cutPostion = 'absolute'
						setTimeout(() => {
							this.defTopH = 0
						}, 10)
					}else {
						v.isShow = false
					}
				})
			},
			toLoadMore() {
				if(this.actType == 1) {
					if(this.aIsMore) {
						this.activityList()
					}
				}else if(this.actType == 2) {
					if(this.mIsMore) {
						this.mineActivityList()
					}
				}
			},
			activityList() {
				if(this.aIndex == 1) {
					this.aActArr = []
				}
				this.$api.ajax({
					url: this.$config.activiList,
					data: {
						index: this.aIndex,
						size: this.aSize
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.aIndex == 1) {
							this.aActArr = []
						}
						let arr = res.data.data
						arr.map(v => {
							v.start_time = v.start_time.split(' ')[0].replace(/-/g, '/')
							v.end_time = v.end_time.split(' ')[0].replace(/-/g, '/')
						})
						if(arr.length < this.aSize) {
							this.aActArr = this.aActArr.concat(arr)
							this.aIsMore = false //没有更多了
						}else {
							this.aActArr = this.aActArr.concat(arr)
							this.aIndex++
						}
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						if(this.aIndex == 1) {
							this.isShowSkeleton = false
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
					}
				})
				.catch((err) => {
					console.log(err)
					if(this.aIndex == 1) {
						this.isShowSkeleton = false
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('加载失败')
					}
				})
			},
			mineActivityList() {
				this.$api.ajax({
					url: this.$config.mineActivityList,
					data: {
						index: this.mIndex,
						size: this.mSize,
						uid: this.userInfo.uid
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.mIndex == 1) {
							this.mActArr = []
						}
						let arr = res.data.data
						arr.map(v => {
							v.start_time = v.start_time.split(' ')[0].replace(/-/g, '/')
							v.end_time = v.end_time.split(' ')[0].replace(/-/g, '/')
						})
						if(arr.length < this.mSize) {
							this.mActArr = this.mActArr.concat(arr)
							this.mIsMore = false //没有更多了
						}else {
							this.mActArr = this.mActArr.concat(arr)
							this.mIndex++
						}
					}else {
						if(this.mIndex == 1) {
							this.isLoadErr = true
						}else {
							this.$api.warnNotice(res.data.message)
						}
					}
				})
				.catch(() => {
					if(this.mIndex == 1) {
						this.isLoadErr = true
					}else {
						this.$api.warnNotice('加载失败')
					}
				})
			}
		},
		onShareAppMessage() {
			const $this = this
			return {
			  path: '/pages/index/index',
			  title: $this.$config.defaultTitle,
			  imageUrl: $this.$config.defaultUrl
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine {
		width: 100%;
		height: 100%;
		.mineBox {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
		}
		.mineScroll {
			width: 100%;
			height: 100%;
		}
	}
	.mineBanner {
		width: 100%;
		height: 526upx;
		position: relative;
		.mineBannerBg {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			background-color: #efefef;
		}
		.mineBannerInfo {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			.mineInfoBox {
				width: 100%;
				height: 100%;
				padding: 0 40upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.mineUserInfo {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.mineUserName {
						flex: 1;
						overflow: hidden;
						.mineUserNameTxt {
							font-size: 50upx;
							color: $uni-text-color-black;
							margin-bottom: 10upx;
							font-weight: 700;
							position: relative;
							@extend .ellipse1;
						}
						.mineUserVipIcon {
							display: flex;
							align-items: center;
							.itemUserVipIcon {
								width: 98upx;
								height: 36upx;
								border-radius: 18upx;
								overflow: hidden;
								&:not(:last-child) {
									margin-right: 16upx;
								}
							}
							.itemToApplyPartner {
								height: 36upx;
								line-height: 36upx;
								width: 90px;
								text-align: center;
								font-size: 20upx;
								color: #fff;
								background-image: linear-gradient(270deg, #2899FA 0%, #46D8FD 100%);
								border-radius: 18upx;
								overflow: hidden;
							}
						}
					}
					.mineUserImg {
						width: 116upx;
						height: 116upx;
						border-radius: 50%;
						overflow: hidden;
						background-color: $uni-bg-color;
						margin-left: 40upx;
					}
				}
				.showMemberInfo {
					width: 100%;
					height: 240upx;
					padding: 30upx 50upx 0;
					background-color: #201F19;
					border-radius: 16upx 16upx 0 0;
					position: relative;
					.memberCardTitle {
						font-size: 44upx;
						color: $uni-text-color;
						margin-bottom: 10upx;
					}
					.memberCardIntro {
						font-size: 24upx;
						color: $uni-text-color-grey;
						margin-bottom: 36upx;
					}
					.memberCardBottom {
						display: flex;
						align-items: center;
						.memberCardIcon {
							width: 28upx;
							height: 24upx;
							margin-right: 20upx;
						}
						.memberCardTxt {
							font-size: 28upx;
							color: #EBDAB9;
							margin-right: 40upx;
							font-weight: 600;
						}
						.memberCardToPower {
							font-size: 28upx;
							color: #EBDAB9;
						}
					}
					.memberCardQr {
						position: absolute;
						bottom: 0;
						right: 0;
						width: 80upx;
						height: 80upx;
					}
					.toCheckCode {
						position: absolute;
						top: 0;
						right: 0;
						width: 80upx;
						height: 80upx;
					}
				}
			}
		}
	}
	.activityType {
		padding: 60upx 40upx 40upx;
		background-color: #fff;
		height: 166upx;
		position: relative;
		.activityTypeBox {
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			height: 166upx;
			padding: 60upx 40upx 40upx;
			display: flex;
			align-items: flex-end;
			background-color: #fff;
		}
		.itemActivityShow {
			font-size:32upx;
			color: $uni-text-color-black;
			transition: all 0.2s;
			&:not(:last-child) {
				margin-right: 40upx;
			}
		}
		.itemActivityActive {
			font-size: 48upx;
			font-weight: 700;
		}
	}
	.showActivityList {
		padding: 0 40upx;
		.itemShowActivity {
			width: 100%;
			height: auto;
			background: $uni-text-color;
			box-shadow: 0 8upx 32upx 0 rgba(0,0,0,0.10);
			border-radius: 20upx;
			overflow: hidden;
			margin-bottom: 60upx;
			.itemActivitImg {
				width: 100%;
				height: 320upx;
				background-color: $uni-bg-color;
				position: relative;
				border-radius: 20upx 20upx 0 0;
				.showItemActivityType {
					position: absolute;
					top: 20upx;
					left: 20upx;
					font-size: 20upx;
					border-radius: 20upx;
					overflow: hidden;
					color: $uni-text-color;
					padding: 4upx 16upx;
					@extend .btnImg1;
				}
			}
			.itemActivityInfo {
				padding: 20upx;
				position: relative;
				.itemActivityTitle {
					font-size: 36upx;
					color: $uni-text-color-black;
					margin-bottom: 20upx;
					font-weight: 700;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.itemShowActApplyTime {
					font-size: 24upx;
					color: $uni-text-color-grey;
					margin-bottom: 20upx;
				}
				.itemActivityAddress {
					display: flex;
					align-items: center;
					margin-bottom: 10upx;
					position: relative;
					.itemAddressIcon {
						width: 24upx;
						height: 24upx;
						margin-right: 16upx;
					}
					.itemAddressText {
						font-size: 28upx;
						color: $uni-text-color-black;
						margin-bottom: 10upx;
					}
					.itemActStatus {
						position: absolute;
						top: 6upx;
						right: 0;
						padding: 4upx 16upx;
						font-size: 20upx;
						color: $uni-text-color;
						border-radius: 20upx 0 0 20upx;
					}
				}
				.itemActivityTime {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.itemActivityTimeBox {
						display: flex;
						align-items: center;
					}
					.itemTimeIcon {
						width: 24upx;
						height: 24upx;
						margin-right: 16upx;
					}
					.itemTimeText {
						font-size: 28upx;
						color: $uni-text-color-black;
					}
					.itemAcitivityPrice {
						font-size: 24upx;
						color: $uni-text-color-red;
						text {
							font-size: 36upx;
							font-weight: 600;
						}
					}
				}
				.actRecruit {
					background-image: linear-gradient(90deg, #69EFE5 0%, #2CD0FA 100%);
				}
				.actUnderWay {
					background-image: linear-gradient(90deg, #FDCE62 0%, #EBA333 100%);
				}
				.actfFnish {
					background-color: #D8D8D8;
				}
			}
		}
		.actArrBlank {
			width: 100%;
			height: 500upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 88;
			background-color: #FFF;
			.actBlankImg {
				width: 300upx;
				height: 230upx;
				margin-bottom: 20upx;
			}
			.actBlankText {
				font-size: 28upx;
				color: $uni-text-color-grey;
				text-align: center;
			}
		}
	}
</style>
