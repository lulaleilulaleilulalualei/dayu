<template>
	<view class="activityPhoto">
		<cu-custom bgColor="white" :isBack="true"><block slot="content">活动照片</block></cu-custom>
		<view class="showPhotoBox">
			<scroll-view class="scrollPhotoBox" :scroll-y="true" @scrolltolower="toLoadMore">
				<view class="toShowPhotoBox">
					<view class="sectionPhotoBox">
						<view class="itemPhotoBox" v-for="item in leftArr" :key="item.idx" @click="toPreviewImg(item.idx)">
							<view class="itemPhotoImg" :style="{height: item.rh + 'px',width: item.rw + 'px'}"><img :src="item.pic_url" alt=""></view>
							<view class="itemPhotoUser">
								<view class="itemPhotoUserHead"><img :src="item.avatar" alt=""></view>
								<view class="itemPhotoUserName">{{item.nick_name}}</view>
							</view>
						</view>
					</view>
					<view class="sectionPhotoBox">
						<view class="itemPhotoBox" v-for="item in rightArr" :key="item.idx" @click="toPreviewImg(item.idx)">
							<view class="itemPhotoImg" :style="{height: item.rh + 'px',width: item.rw + 'px'}"><img :src="item.pic_url" alt=""></view>
							<view class="itemPhotoUser">
								<view class="itemPhotoUserHead"><img :src="item.avatar" alt=""></view>
								<view class="itemPhotoUserName">{{item.nick_name}}</view>
							</view>
						</view>
					</view>
				</view>
				<noMore v-if="!isMore"></noMore>
			</scroll-view>
		</view>
		<view class="toUploadImg" @click="toUploadImg"><img src="../../static/toUploadImg.png" alt=""></view>
		
		<noListData v-if="photoArr.length == 0" noText="还没有活动照片~"></noListData>
		<loadErr v-if="isLoadErr" @toRelaodData="toRelaodData"></loadErr>
	</view>
</template>

<script>
	import noListData from '@/components/noListData.vue'
	import loadErr from '@/components/loadErr.vue'
	import noMore from '@/components/noMore.vue'
	
	export default {
		data() {
			return {
				id: null,
				index: 1,
				size: 10,
				photoArr: [],
				isMore: true,
				isLoadErr: false,
				leftArr: [],
				rightArr: []
			}
		},
		components: {noMore},
		onLoad(options) {
			this.id = options.id
			this.getPhototList()
		},
		methods: {
			toPreviewImg(idx) {
				const $this = this
				let arr = []
				this.photoArr.map((v, i) => {
					arr.push(v.pic_url)
				})
				uni.previewImage({
					current: $this.photoArr[idx].pic_url,
					urls: arr
				})
			},
			toUploadImg() {
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
							act_id: $this.id,
							uid: $this.$userInfo.uid
						},
				        success: (res) => {
				          let obj = JSON.parse(res.data)
				          if (obj.code == 0) {
				            let arr = $this.photoArr
							arr.unshift({
								width: obj.data[0].width,
								height: obj.data[0].height,
								pic_url: obj.data[0].url,
								nick_name: $this.$userInfo.nick_name,
								avatar: $this.$userInfo.avatar
							})
							$this.rightArr = []
							$this.leftArr = []
							arr.map((v, i) => { //336upx
								let sysw = uni.getSystemInfoSync().windowWidth; //windowWidth
								let rw = (sysw / 750) * 336 //实际宽
								v.rw = rw
								v.rh = (v.height / v.width) * rw
								
								v.idx = i
								if(i % 2 == 1) {
									$this.rightArr.push(v)
								}else {
									$this.leftArr.push(v)
								}
							})
							$this.photoArr = arr
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
			},
			toLoadMore() {
				if(this.isMore) {
					this.getPhototList()
				}
			},
			toRelaodData() {
				this.isMore = true
				this.index = 1
				this.photoArr = []
				this.rightArr = []
				this.leftArr = []
				this.getPhototList()
			},
			getPhototList() {
				const $this = this
				this.$api.ajax({
					url: this.$config.photoList,
					data: {
						index: this.index,
						size: this.size,
						act_id: 2
					}
				})
				.then((res) => {
					if(res.statusCode == 200 && res.data.code == 0) {
						if(this.index == 1) {
							this.photoArr = []
						}
						let arr = res.data.data
						arr.map((v, i) => { //336upx
							let sysw = uni.getSystemInfoSync().windowWidth; //windowWidth
							let rw = (sysw / 750) * 336 //实际宽
							v.rw = rw
							v.rh = (v.height / v.width) * rw
						})
						
						if(arr.length < this.size) {
							this.photoArr = this.photoArr.concat(arr)
							this.isMore = false //没有更多了
						}else {
							this.photoArr = this.photoArr.concat(arr)
							this.index++
						}
						
						this.rightArr = []
						this.leftArr = []
						this.photoArr.map((v, i) => {
							v.idx = i
							if(i % 2 == 1) {
								this.rightArr.push(v)
							}else {
								this.leftArr.push(v)
							}
						})
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
						this.$api.warnNotice('加载失败')
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.activityPhoto {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.showPhotoBox {
			flex: 1;
			width: 100%;
			overflow: hidden;
			padding: 30upx 30upx 0;
			.scrollPhotoBox {
				width: 100%;
				height: 100%;
				.toShowPhotoBox {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
	.sectionPhotoBox {
		width: 336upx;
		height: auto;
		.itemPhotoBox {
			width: 100%;
			height: auto;
			margin-bottom: 30upx;
			.itemPhotoImg {
				width: 336upx;
				height: 336upx;
				position: relative;
				z-index: 1;
				border-radius: 8upx;
				overflow: hidden;
				margin-bottom: 20upx;
				background-color: $uni-bg-color;
			}
			.itemPhotoUser {
				display: flex;
				align-items: center;
				width: 100%;
				.itemPhotoUserHead {
					width: 40upx;
					height:40upx;
					position: relative;
					z-index: 1;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20upx;
					background-color: $uni-bg-color;
				}
				.itemPhotoUserName {
					flex: 1;
					overflow: hidden;
					font-size: 24upx;
					color: $uni-text-color-black;
				}
			}
		}
	}
	.toUploadImg {
		position: fixed;
		bottom: 60upx;
		left: 50%;
		z-index: 99;
		width: 108upx;
		height: 108upx;
		border-radius: 50%;
		overflow: hidden;
		margin-left: -54upx;
	}
</style>
