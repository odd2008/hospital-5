<template>
	<view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 0upx)">
				<view class="cu-item" :class="index==tabCur?'text-cyan':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 0upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-apps text-grey"></text> {{item.name}}
						</view>
					</view>
					<view class="cu-list menu-avatar" >
						<view class="cu-item" style="border-bottom:1upx solid #eee;" v-for="(type,index1) in item.types" :key="index1" :id="'type-'+index1"  @click="goDoctor(type)">
							<view class="content" style="left: 50upx; width: 350upx;">
								<view class="text-grey">{{type.name}}</view>
							</view>
							<!-- <view class="action">
								<text class="cu-tag round bg-cyan sm" style="padding-top: 10upx;">10</text>
							</view> -->
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		
	</view>
</template>

<script>
	const DEPART_KEY = 'DEPART_HOSPITAL';
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			uni.getStorage({
				key: DEPART_KEY,
				success: (res) => {
					this.list = res.data;
					this.listCur = this.list[0];
				},
				fail: () => {
					this.loadData();
				}
			});
		},
		onReady() {
			uni.hideLoading();
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			},
			goDoctor(type){
				uni.navigateTo({
					url: `appointment-doctor?type=${type.name}&id=${type.id}`
				});
			},
			loadData() {
				this.$requestWithToken({
					url: '/appointment/getDepartInfo',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					succeed: (info) => {
						if(info.status === 'success') {
							let list = info.data;
							this.list = list;
							this.listCur = list[0];
							uni.setStorage({
								key: DEPART_KEY,
								data: info.data,
								success: function () {
									console.log('缓存成功');
								}
							});
						} else {
							
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	@import "../../colorui/animation.css";
	
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}
	
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 260upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 80px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
