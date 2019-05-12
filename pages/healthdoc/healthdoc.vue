<template>
	<view style="margin-bottom: 50upx;">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 基本信息
			</view>
		</view>
		
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="basicInfo.name" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<input v-model="basicInfo.gender" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">年龄</view>
				<input v-model="basicInfo.age" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">身高(cm)</view>
				<input v-model="basicInfo.height" name="input" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">体重(kg)</view>
				<input v-model="basicInfo.weight" name="input" disabled="true"></input>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 病史信息
			</view>
		</view>
		
		<view>
			<view class="cu-card case" v-for="(info, index) in sickInfo" :key="index" :id="'sick-'+index">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="info.imageUrl"
						 mode="widthFix" @click="previewImage(info.imageUrl)"></image>
						<view class="cu-tag bg-yellow text-white">{{info.date}}</view>
						<view class="cu-bar bg-shadeBottom">
							<text :class="{'text-cut': info.contentCut}" @click="changeCut(index)">{{info.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				basicInfo: {
					name: '张三',
					gender: '男',
					age: 20,
					height: 183,
					weight: 63					
				},
				sickInfo: [
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					},
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					},
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					}
				]
			}
		},
		methods: {
			changeCut(index) {
				this.sickInfo[index].contentCut = !this.sickInfo[index].contentCut;
			},
			previewImage:function(currentUrl){
				//console.log(currentUrl);
				uni.previewImage({
					urls: [currentUrl],
					current: currentUrl,
					indicator: 'none',
					loop: false,
					fail: function(){
						//提示用户
						uni.showToast({
							title: '预览失败，请重试！',
							duration: 1000
						});
					}
				});
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: 'healthdoc-edit'
			});
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 80upx);
		color: #8799a3;
	}
	@import "../../colorui/animation.css";
	
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}
</style>
