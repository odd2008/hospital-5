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
							<view class="content" style="left: 50upx;">
								<view class="text-grey">{{type}}</view>
							</view>
							<view class="action">
								<text class="cu-tag round bg-cyan sm" style="padding-top: 10upx;">10</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		
	</view>
</template>

<script>
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
			let list = [{
					id: 0,
					name: '内科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 1,
					name: '外科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 2,
					name: '骨科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 3,
					name: '妇产科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 4,
					name: '儿科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 5,
					name: '皮肤科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 6,
					name: '眼科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 7,
					name: '耳鼻咽喉科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 8,
					name: '口腔科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 9,
					name: '肿瘤科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 10,
					name: '中医科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 11,
					name: '精神科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 12,
					name: '疼痛科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 13,
					name: '康复医学科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 14,
					name: '医学影像科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 15,
					name: '全科医疗科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 16,
					name: '病理科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 17,
					name: '护理门科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 18,
					name: '营养科',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				},{
					id: 19,
					name: '其他',
					types: [
						'呼吸内科',
						'心内科',
						'消化内科',
						'神经内科',
						'肾内科',
						'血液内科',
						'风湿科门诊',
						'内分泌科'
					]
				}];
			this.list = list;
			this.listCur = list[0];
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
					url: 'appointment-doctor?type=' + type
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
		width: 200upx;
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
