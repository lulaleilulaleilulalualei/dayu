<template>
	<view class="activityDetail">
		<skeleton v-if="isShowSkeleton"></skeleton>
		
		<cu-custom :bgColor="navColor" :isBack="!isSharePage" :textOpacity="textOpacity"><block slot="content">活动详情</block></cu-custom>
		<view class="activityBox">
			<scroll-view class="activiScroll" :scroll-y="!isShowSkeleton" @scroll="toScroll">
				<view class="activitBanner">
					<view class="activityBannerImg">
						<image :src="detailObj.thumb" mode="aspectFill"></image>
					</view>
					<view class="showActivityInfo">
						<view class="activityTitle skeleton-rect">{{detailObj.name}}</view>
						<view class="activityNum skeleton-rect">{{detailObj.apply_num}} 位渔友已经报名活动</view>
					</view>
				</view>
				<view class="showActDetailInfo">
					<view class="itemActInfo skeleton-rect">
						<view class="itemActInfoTitle"><text>地点</text></view>
						<view class="itemShowActInfo">{{detailObj.address}}</view>
					</view>
					<view class="itemActInfo skeleton-rect">
						<view class="itemActInfoTitle">时间</view>
						<view class="itemShowActInfo">{{startTime}} 至 {{endTime}}</view>
					</view>
					<view class="itemActInfo skeleton-rect">
						<view class="itemActInfoTitle">费用</view>
						<view class="itemShowActInfo" v-if="detailObj.is_fee == 0">免费</view>
						<view class="itemShowActInfo" v-if="detailObj.is_fee == 1">¥ {{detailObj.apply_fee}} /人</view>
					</view>
					<view class="itemActInfo skeleton-rect">
						<view class="itemActInfoTitle">主办方</view>
						<view class="itemShowActInfo">{{detailObj.leader}}</view>
					</view>
				</view>
				<view class="activityDetailContent">
					<view class="actDetailTitle"><text class="skeleton-rect">活动详情</text></view>
					<view class="actDetailContent skeleton-rect" :style="{height: isShowMoreContent? 'auto': '400rpx'}">
						<!-- <view class="actDetailContentTxt">{{detailObj.content}}</view> -->
						<rich-text v-if="carRich" class="richTextShow" type="text" :nodes="contentDesc"></rich-text>
						<text style="text-align: center; margin-top: 50upx" decode="true" wx:else>由于您的微信版本过低 \n 无法正常阅读当前内容</text>
					</view>
					<view class="toShowMoreBtn" @click="toShowMoreContent">
						<view class="showMoreBtn" :class="{'toShowMoreContent': isShowMoreContent}">{{isShowMoreContent? '收起': '展开全部'}}</view>
					</view>
				</view>
				<view class="actApplyNum">
					<view class="actApplyTitle skeleton-rect">已报名 · {{detailObj.apply_num}}人/{{detailObj.is_limit == 0? '不限': detailObj.max_num}}</view>
					<view class="actApplyList skeleton-rect" :style="{height: isShowMoreNum? 'auto': '450rpx'}">
						<view class="itemActApply" v-for="item in  detailObj.apply_list" :key="item.apply_id">
							<view class="itemActApplyImg">
								<view class="itemActApplyImgBox"><img :src="item.avatar" alt=""></view>
								<view class="itemActApplyNum" v-if="item.apply_num > 1">{{item.apply_num}}</view>
							</view>
							<view class="itemActApplyName">{{item.name}}</view>
						</view>
					</view>
					<view class="toShowMoreBtn" v-if="detailObj.apply_list && detailObj.apply_list.length > 8"  @click="toShowMoreNum">
						<view class="showMoreBtn" :class="{'toShowMoreContent': isShowMoreNum}">{{isShowMoreNum? '收起': '展开全部'}}</view>
					</view>
				</view>
				<!-- 底部顶高 -->
				<!-- <view class="cu-tabbar-height"></view> -->
			</scroll-view>
			<view class="applyBtnShow">
				<view class="applyBtnInfo">
					<view class="applyBtnActName">{{detailObj.name}}</view>
					<view class="applyBtnActNum">{{detailObj.apply_num}}位小伙伴等你来挑战</view>
				</view>
				<view class="applyToBtn" :class="{actRecruit: detailObj.status == 0, actUnderWay:detailObj.status == 1, actfFnish: detailObj.status == 2}">
					<view @click="toShowSelectBox">{{detailObj.status == 0? '我要报名': detailObj.status == 1? '活动进行中': '活动已结束'}}</view>
					<button v-if="!isAuth" class="toAuthBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">授权</button>
				</view>
			</view>
		</view>
		<selectNum v-if="isShowSelectBox" @toCloseBox="toCloseBox"></selectNum>

		<!-- <loginBox v-if="isShowAccreditBox" @showAuthBox="toEmitShowAuth"></loginBox> -->
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
		<backHome v-if="isSharePage"></backHome>
	</view>
</template>

<script>
	import skeleton from '@/components/quick-skeleton.vue'
	import selectNum from './selectActNum.vue'
	// import loginBox from '@/components/loginBox.vue'
	import loadErr from '@/components/loadErr.vue'
	import backHome from '@/components/backHome.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				isShowSkeleton: true,
				navColor: 'white',
				isShowMoreContent: false, //是否展示更多内容
				textOpacity: 0,
				detailObj: {}, //详情数据
				startTime: 0,
				endTime: 0,
				actId: null, //活动id
				isLoadErr: false, //页面加载出错
				isShowSelectBox: false, //人数选择框
				isShowAccreditBox: false, //默认不显示授权弹框
				isShowMoreNum: false,
				isSharePage: this.$isSharePage,
				carRich: uni.canIUse('rich-text'),
				contentDesc: '',
				
				isAuth: false, //是否授权
			}
		},
		components: {selectNum, loadErr, backHome, skeleton},
		onLoad(options) {
			this.actId = options.id
			this.getDetailData() //授权加载
			if(this.$userInfo) {
				this.isAuth = true
			}
		},
		onShow() {
			this.c_toSaveActInfo({})
		},
		methods: {
			...mapActions([
				'c_toSaveActInfo'
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
							if($this.detailObj.status == 0) {
								$this.c_toSaveActInfo($this.detailObj)
								$this.isShowSelectBox = !$this.isShowSelectBox
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
			// toEmitShowAuth(status) {
			// 	this.isShowAccreditBox = status
			// 	this.getDetailData() //授权加载
			// },
			// accreditStatus: function() {
			//   const $this = this
			//   this.$api.userLogin((status) => {
			//     if (status == '1') {
			// 		this.isShowAccreditBox = false
			// 		this.getDetailData() //授权加载
			//     }else {
			// 		$this.isShowAccreditBox = true
			// 	}
			//   })
			// },
			toCloseBox(val) {
				this.isShowSelectBox = val
			},
			toShowSelectBox() {
				if(this.detailObj.status == 0) {
					this.c_toSaveActInfo(this.detailObj)
					this.isShowSelectBox = !this.isShowSelectBox
				}else {
					if(this.detailObj.status == 1) {
						this.$api.warnNotice('活动进行中')
					}else if(this.detailObj.status == 2) {
						this.$api.warnNotice('活动已结束')
					}
				}
			},
			toScroll(e) {
				let top = e.detail.scrollTop
				this.textOpacity = top / 400 > 1 ? 1 : top / 400
			},
			toShowMoreContent() {
				this.isShowMoreContent = !this.isShowMoreContent
			},
			toShowMoreNum() {
				this.isShowMoreNum = !this.isShowMoreNum
			},
			toRelaodData() {
				this.detailObj = {}
				this.isLoadErr = false
				this.getDetailData()
			},
			getDetailData() {
				const $this = this
				this.$api.ajax({
					url: this.$config.actDetail,
					data: {
						act_id: this.actId,
						uid: 1
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.detailObj = res.data.data
						this.startTime = res.data.data.start_time.split(' ')[0].replace(/-/g, '/')
						this.endTime = res.data.data.end_time.split(' ')[0].replace(/-/g, '/')
						
						let content = res.data.data.content.replace(/section/g, "div")
						content = content.replace(/<img/g, '<img class="photo"')
						this.contentDesc = content
						
						setTimeout(() => {
							this.isShowSkeleton = false
						}, 200)
					}else {
						this.isShowSkeleton = false
						this.api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isShowSkeleton = false
					this.isLoadErr = true
				})
			}
		},
		onShareAppMessage() {
			const $this = this
			return {
			  path: `/pages/activityDetail/activityDetail?id=${$this.actId}`,
			  title: $this.detailObj.name,
			  imageUrl: $this.detailObj.thumb
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.activityDetail {
		width: 100%;
		height: 100%;
		position: relative;
		.activityBox {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			background: #F1F1F5;
		}
		.activiScroll {
			width: 100%;
			height: 100%;
			.activitBanner {
				width: 100%;
				height: 750upx;
				position: relative;
				background-color: $uni-bg-color;
				.activityBannerImg {
					width: 100%;
					height: 100%;
					position: relative;
					z-index: 1;
				}
				.showActivityInfo {
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: 10;
					width: 100%;
					height: auto;
					background-image: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
					padding: 30upx;
					.activityTitle {
						font-size: 36upx;
						color: $uni-text-color;
						margin-bottom: 10upx;
					}
					.activityNum {
						font-size: 32upx;
						color: $uni-text-color;
					}
				}
			}
			.showActDetailInfo {
				width: 100%;
				height: auto;
				background-color: $uni-text-color;
				margin-bottom: 10upx;
				.itemActInfo {
					display: flex;
					align-items: center;
					min-height: 100upx;
					width: 100%;
					&:not(:last-child) {
						.itemShowActInfo {
							border-bottom: 1upx solid #E4E6E9;
						}
					}
					.itemActInfoTitle {
						width: 174upx;
						padding-left: 30upx;
						font-size: 28upx;
						color: $uni-text-color-grey;
						align-self: flex-start;
						line-height: 100upx;
					}
					.itemShowActInfo {
						flex: 1;
						overflow: hidden;
						padding: 30upx 0;
						font-size: 28upx;
						color: $uni-text-color-black;
						line-height: 40upx;
					}
				}
			}
			.activityDetailContent {
				padding: 30upx 30upx 0;
				background-color: $uni-text-color;
				margin-bottom: 10upx;
				.actDetailTitle {
					font-size: 32upx;
					color: $uni-text-color-black;
					margin-bottom: 30upx;
					font-weight: 700;
				}
				.actDetailContent {
					height: 400upx;;
					width: 100%;
					overflow: hidden;
					.actDetailContentTxt {
						font-size: 28upx;
						color: $uni-text-color-black;
						line-height: 40upx;
					}
					.actDetailContentImg {
						width: 100%;
						height: 384upx;
						background-color: $uni-bg-color;
						margin: 20upx 0;
					}
				}
				.richTextShow {
					width: 100%;
					height: auto;
					overflow: hidden;
				}
			}
			.actApplyNum {
				padding: 30upx 30upx 100upx;
				background-color: $uni-text-color;
				.actApplyTitle {
					font-size: 32upx;
					color: $uni-text-color-black;
					margin-bottom: 60upx;
					font-weight: 700;
				}
				.actApplyList {
					display: flex;
					flex-wrap: wrap;
					overflow: hidden;
					.itemActApply {
						width: 120upx;
						height: auto;
						margin-bottom: 60upx;
						&:not(:nth-child(4n)) {
							margin-right: 70upx;
						}
						.itemActApplyImg {
							width: 100%;
							height: 120upx;
							margin-bottom: 20upx;
							position: relative;
							.itemActApplyImgBox {
								width: 100%;
								height: 100%;
								border-radius: 50%;
								overflow: hidden;
								background-color: $uni-bg-color;
								position: relative;
								z-index: 1;
							}
							.itemActApplyNum {
								position: absolute;
								bottom: 0;
								right: 0;
								z-index: 1;
								width: 30upx;
								height: 30upx;
								text-align: center;
								line-height: 30upx;
								border-radius: 50%;
								background-color: $uni-text-color-red;
								color: $uni-text-color;
								font-size: 20upx;
							}
						}
						.itemActApplyName {
							font-size: 28upx;
							color: $uni-text-color-black;
							text-align: center;
							width: 100%;
							@extend .ellipse1;
						}
					}
				}
			}
		}
		.toShowMoreBtn {
			width: 100%;
			padding: 30upx 0;
			display: flex;
			justify-content: center;
			.showMoreBtn {
				display: flex;
				align-items: center;
				font-size: 28upx;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: center;
				&::after {
					content: '';
					display: block;
					border: 8upx solid $uni-text-color-black;
					margin-left: 20upx;
					transform: rotate(45deg);
					transition: all 0.2s;
					border-left-color: transparent;
					border-top-color: transparent;
					position: relative;
					top: -4upx;
				}
			}
			.toShowMoreContent {
				&::after {
					transform: rotate(225deg);
					top: 4upx;
				}
			}
		}
		.applyBtnShow {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100upx;
			display: flex;
			z-index: 99;
			background-color: $uni-text-color;
			box-shadow: 0 10upx 40upx rgba(0,0,0,0.3);
			.applyBtnInfo {
				flex: 1;
				overflow: hidden;
				height: 100%;
				padding: 12upx 30upx 0;
				.applyBtnActName {
					font-size: 28upx;
					color: $uni-text-color-black;
					font-weight: 600;
					margin-bottom: 2upx;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
				.applyBtnActNum {
					font-size: 24upx;
					color: $uni-text-color-grey;
				}
			}
			.applyToBtn {
				width: 320upx;
				height: 100%;
				position: relative;
				view {
					width: 100%;
					height: 100%;
					text-align: center;
					line-height: 100upx;
					font-size: 28upx;
					color: $uni-text-color;
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
</style>
