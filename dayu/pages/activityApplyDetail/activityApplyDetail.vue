<template>
	<view class="activityApplyDetail">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">报名活动详情</block></cu-custom>
		<view class="contentBox">
			<scroll-view class="contentBoxScroll" :scroll-y="true">
				<view class="applyBox">
					<view class="showApplyInfo">
						<view class="applyActImg">
							<image :src="detailObj.thumb" mode="aspectFill"></image>
						</view>
						<view class="applyActInfo">
							<view class="applyActTitle">{{detailObj.name}}</view>
							<view class="applyActOtherInfo">
								<view class="applyActTime">时间：{{startTime}} - {{endTime}}</view>
								<view class="applyActAddress">地点：{{detailObj.leader}}</view>
							</view>
						</view>
					</view>
					<view class="showApplyFee">
						<view class="applyFeeTitle">活动报名费用</view>
						<view class="applyFeeCost" v-if="detailObj.is_fee == 0">免费</view>
						<block v-if="detailObj.is_fee == 1">
							<view class="applyFeeCost" v-if="pay_fee == 0">¥{{detailObj.apply_fee}}/人 x{{detailObj.my_apply.apply_num}}</view>
							<view class="applyFeeCost" else>¥{{detailObj.apply_fee}}/人 x{{detailObj.my_apply.apply_num}}</view>
						</block>
					</view>
				</view>
				<view class="actApplyInfo" v-if="detailObj.my_apply">
					<view class="itemApplyInfoTitle">报名人信息</view>
					<view class="itemActApplyInfo">
						<text>姓名</text>
						<text>{{detailObj.my_apply.name}}</text>
					</view>
					<view class="itemActApplyInfo">
						<text>电话</text>
						<text>{{detailObj.my_apply.tel}}</text>
					</view>
				</view>
				<view class="showActPic">
					<view class="showActPicTitle">
						<view class="showActPicTitleTxt">活动照片 · {{detailObj.picture_count + newAddImg.length}}张</view>
						<view class="toUploadActImg" @click="uploadPhoto">上传照片</view>
					</view>
					<view class="showActPicBox" v-if="(detailObj.picture_count + newAddImg.length) > 0">
						<scroll-view class="toShowPicScroll" :scroll-x="true">
							<view class="itemShowActPic" v-for="(item, idx) in detailObj.picture_list" :key="idx">
								<image :src="item.pic_url" mode="aspectFill"></image>
							</view>
						</scroll-view>
					</view>
					<view class="toShowAllPic" v-if="(detailObj.picture_count + newAddImg.length) > 0" @click="toShowAllImg">点击查看全部</view>
				</view>
				<view class="actApplyNum">
					<view class="actApplyTitle">报名成员 · {{detailObj.apply_num}}人/{{detailObj.is_limit == 0? '不限': detailObj.max_num}}</view>
					<view class="actApplyList" :style="{height: isShowMoreNum? 'auto': '450rpx'}">
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
			</scroll-view>
		</view>
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import loadErr from '@/components/loadErr.vue'
	import { mapGetters , mapActions } from 'vuex';
	
	export default {
		data() {
			return {
				isShowMoreNum: false,
				id: null,
				detailObj: {}, //详情对象
				startTime: '',
				endTime: '',
				isLoadErr: false,
				
				newAddImg: [], //新添加图片
			}
		},
		components: {loadErr},
		onLoad(options) {
			this.id = options.id
			this.getApplyDetail()
			
			if(options.from == 'apply') {
				this.c_toRefreshMine(true)
			}
		},
		methods: {
			...mapActions([
				'c_toRefreshMine'
			]),
			toShowAllImg() {
				const $this = this
				uni.navigateTo({
					url: `/pages/activityPhoto/activityPhoto?id=${$this.detailObj.act_id}`
				})
			},
			toShowMoreNum() {
				this.isShowMoreNum = !this.isShowMoreNum
			},
			toRelaodData() {
				this.detailObj = {}
				this.isLoadErr = false
				this.getApplyDetail()
			},
			getApplyDetail() {
				const $this = this
				this.$api.ajax({
					url: this.$config.actApplyDetail,
					data: {
						apply_id: this.id
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						this.detailObj = res.data.data
						this.startTime = res.data.data.start_time.split(' ')[0].replace(/-/g, '/')
						this.endTime = res.data.data.end_time.split(' ')[0].replace(/-/g, '/')
					}else {
						this.api.warnNotice(res.data.message)
						this.isLoadErr = true
					}
				})
				.catch(() => {
					this.isLoadErr = true
				})
			},
			uploadPhoto() {
				const $this = this
				uni.chooseImage({
				  count: 9,
				  success: (res) => {
				    var paths = res.tempFilePaths
				    for (let i = 0; i < paths.length; i++) {
				      uni.uploadFile({
				        url: $this.$config.saveUpload,
				        filePath: paths[i],
				        name: 'files',
						formData: {
							time: new Date().getTime(),
							act_id: $this.detailObj.act_id,
							uid: $this.$userInfo.uid
						},
				        success: (res) => {
				          let obj = JSON.parse(res.data)
				          if (obj.code == 0) {
				            let url = obj.data[0].url
							this.detailObj.picture_list.unshift({
								pic_url: url
							})
							this.newAddImg.push(url)
				          }else {
				            $this.$api.warnNotice(obj.message)
				          }
				        },
				        fail: () => {
				          $this.$api.warnNotice('图片上传失败')
				        }
				      })
				    }
				  }
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.activityApplyDetail {
		display: flex;
		flex-direction: column;
	}
	.contentBox {
		flex: 1;
		width: 100%;
		overflow: hidden;
		background-color: #F1F1F5;
		.contentBoxScroll {
			width: 100%;
			height: 100%;
		}
	}
	.applyBox {
		background-color: #fff;
		padding: 30upx 30upx 0;
		margin-bottom: 10upx;
		.showApplyInfo {
			width: 100%;
			height: 200upx;;
			display: flex;
			align-items: center;
			padding-bottom: 1px solid #F0F0F1;
			.applyActImg {
				width: 200upx;
				height: 100%;
				border-radius: 8upx;
				background-color: $uni-bg-color;
				margin-right: 30upx;
				overflow: hidden;
			}
			.applyActInfo {
				height: 100%;
				flex: 1;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.applyActTitle {
					font-size: 28upx;
					color: $uni-text-color-black;
					font-weight: 600;
					@extend .ellipse2;
				}
				.applyActOtherInfo {
					width: 100%;
					.applyActTime {
						font-size: 24upx;
						color: $uni-text-color-grey;
						margin-bottom: 10upx;
					}
					.applyActAddress {
						font-size: 24upx;
						color: $uni-text-color-grey;
					}
				}
			}
		}
		.showApplyFee {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			color: $uni-text-color-black;
			padding: 30upx 0;
		}
	}
	.actApplyInfo {
		background-color: #fff;
		padding: 0 30upx;
		margin-bottom: 10upx;
		.itemApplyInfoTitle {
			font-size: 32upx;
			color: $uni-text-color-black;
			padding: 40upx 0;
			font-weight: 600;
		}
		.itemActApplyInfo {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
			color: $uni-text-color-black;
			padding-bottom: 40upx;
		}
	}
	.showActPic {
		padding: 40upx 30upx ;
		background-color: #fff;
		position: relative;
		margin-bottom: 10upx;
		.showActPicTitle {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.showActPicTitleTxt {
				font-size: 32upx;
				color: $uni-text-color-black;
			}
			.toUploadActImg {
				width: 132upx;
				height: 44upx;
				line-height: 44upx;
				text-align: center;
				font-size: 24upx;
				color: $uni-text-color;
				background-image: linear-gradient(90deg, #69EFE5 0%, #2CD0FA 100%);
				border-radius: 4upx;
			}
		}
		.showActPicBox {
			width: 100%;
			height: 200upx;
			margin-top: 40upx;
			.toShowPicScroll {
				width: 100%;
				height: 100%;
				white-space: nowrap;
				.itemShowActPic {
					display: inline-block;
					width: 200upx;
					height: 100%;
					border-radius: 8upx;
					background-color: $uni-bg-color;
					position: relative;
					z-index: 1;
					overflow: hidden;
					&:not(:last-child) {
						margin-right: 20upx;
					}
				}
			}
		}
		.toShowAllPic {
			width: 60upx;
			height: 200upx;
			padding: 0 20upx;
			background: #424242;
			border-radius: 8upx 0 0 8upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			bottom: 40upx;
			right: 0;
			font-size: 20upx;
			color: $uni-text-color;
		}
	}
	.actApplyNum {
		padding: 30upx 30upx 0;
		background-color: $uni-text-color;
		.actApplyTitle {
			font-size: 32upx;
			color: $uni-text-color-black;
			margin-bottom: 60upx;
			font-weight: 700;
		}
		.actApplyList {
			height: 450px;
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
		.toShowMoreBtn {
			width: 100%;
			padding-bottom: 60upx;
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
	}
</style>
