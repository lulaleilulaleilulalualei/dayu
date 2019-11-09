<template>
	<view class="interestedType">
		<cu-custom bgColor="white" :isShowBorder="false" :isBack="false"><block slot="content"></block></cu-custom>
		<view class="toJumpPage">
			<text @click="toCloseInterested">跳过</text>
		</view>
		<view class="interestedTitle">选择3个感兴趣的钓法</view>
		<view class="interestedTxt">提升你的使用体验，可随时更改</view>
		<view class="showContentBox">
			<scroll-view class="scrollBox" :scroll-y="true">
				<div class="interestedBox">
					<view class="itemInterestedBox" v-for="(item, idx) in typeArr" :key="idx" @click="selectInterested(idx)">
						<view class="itemBoxImg"><img :src="item.img" alt=""></view>
						<view :class="['itemBoxNameBox', {'toSelectInterested': item.isSelect && selectCount <= 3}]">{{item.name}}</view>
					</view>
				</div>
			</scroll-view>
		</view>
		
		<view class="toJumpAppBtn" @click="toJumpApp">开启大渔之旅</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeArr: [{
					name: '路亚',
					img: require('./imgs/interestedType_1.jpg'),
					id: 1,
					isSelect: false
				}, {
					name: '海钓',
					img: require('./imgs/interestedType_2.jpg'),
					id: 2,
					isSelect: false
				}, {
					name: '台钓',
					img: require('./imgs/interestedType_3.jpg'),
					id: 3,
					isSelect: false
				}, {
					name: '茷钓',
					img: require('./imgs/interestedType_4.jpg'),
					id: 4,
					isSelect: false
				}, {
					name: '船钓',
					img: require('./imgs/interestedType_5.jpg'),
					id: 5,
					isSelect: false
				}, {
					name: '矶钓',
					img: require('./imgs/interestedType_6.jpg'),
					id: 6,
					isSelect: false
				}, {
					name: '远投',
					img: require('./imgs/interestedType_7.jpg'),
					id: 7,
					isSelect: false
				}, {
					name: '飞绳',
					img: require('./imgs/interestedType_8.jpg'),
					id: 8,
					isSelect: false
				}, {
					name: '拖钓',
					img: require('./imgs/interestedType_9.jpg'),
					id: 9,
					isSelect: false
				}, {
					name: '竞技',
					img: require('./imgs/interestedType_10.jpg'),
					id: 10,
					isSelect: false
				}, {
					name: '野钓',
					img: require('./imgs/interestedType_11.jpg'),
					id: 11,
					isSelect: false
				}, {
					name: '冰钓',
					img: require('./imgs/interestedType_12.jpg'),
					id: 12,
					isSelect: false
				}, {
					name: '坑钓',
					img: require('./imgs/interestedType_13.jpg'),
					id: 13,
					isSelect: false
				}, {
					name: '湖库钓',
					img: require('./imgs/interestedType_14.jpg'),
					id: 14,
					isSelect: false
				}, {
					name: '传统钓',
					img: require('./imgs/interestedType_15.jpg'),
					id: 15,
					isSelect: false
				}],
				selectCount: 0, //选择数量
			}
		},
		methods: {
			selectInterested(idx) {
				this.typeArr.map((v, i) => {
					if(idx == i) {
						if(v.isSelect) {
							v.isSelect = false
							if(this.selectCount > 0) {
								this.selectCount--
							}
							
						}else {
							if(this.selectCount < 3) {
								v.isSelect = true
								this.selectCount++
							}
						}
					}
				})
			},
			toCloseInterested() {
				this.$emit('toCloseInterested', false)
			},
			toJumpApp() {
				this.$emit('toCloseInterested', false)
			}
		}
	}
</script>

<style scoped lang="scss">
	.interestedType {
		padding: 0 40upx 0;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: #fff;
		width: 100%;
		height: 100%;
		.toJumpAppBtn {
			position: absolute;
			bottom: 80upx;
			left: 159upx;
			z-index: 99;
			width: 442upx;
			height: 88upx;
			background-image: linear-gradient(270deg, #2899FA 0%, #46D8FD 100%);
			border-radius: 4px;
			overflow: hidden;
			line-height: 88upx;
			text-align: center;
			font-size: 32upx;
			color: #fff;
		}
		.toJumpPage {
			display: flex;
			justify-content: flex-end;
			margin-bottom: 80upx;
			text {
				font-size: 28upx;
				color: $uni-text-color-grey;
			}
		}
		.interestedTitle {
			font-size: 40upx;
			color: $uni-text-color-black;
			margin-bottom: 15upx;
			text-align: center;
			font-weight: 800;
		}
		.interestedTxt {
			font-size: 28upx;
			color: $uni-text-color-grey;
			text-align: center;
			margin-bottom: 60upx;
		}
		.showContentBox {
			flex: 1;
			overflow: hidden;
			.scrollBox {
				width: 100%;
				height: 100%;
			}
		}
	}
	.interestedBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 60upx;
		.itemInterestedBox {
			width: 210upx;
			height: 210upx;
			border-radius: 10px;
			overflow: hidden;
			position: relative;
			margin-bottom: 20upx;
			.itemBoxImg {
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 1;
			}
			.itemBoxNameBox {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.4);
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: #fff;
			}
			.toSelectInterested {
				background-image: linear-gradient(270deg, #2899FA 0%, #46D8FD 100%);
				opacity: 0.8;
			}
		}
	}
	
</style>
