<template>
	<view style="margin-bottom: 50upx;">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 基本信息
			</view>
		</view>
		
		<view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">住院史</view>
				<textarea maxlength="-1" style="height: 250upx; color: #333333;" disabled="true" :value="basicInfo.hospital" placeholder="请输入住院史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">手术史</view>
				<textarea maxlength="-1" style="height: 250upx; color: #333333;" disabled="true" :value="basicInfo.operation" placeholder="请输入手术史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">家族史</view>
				<textarea maxlength="-1" style="height: 250upx; color: #333333;" disabled="true" :value="basicInfo.family" placeholder="请输入家族史信息"></textarea>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 病史/报告
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
					hospital: '住院信息',
					operation: '双眼皮手术',
					family: '色盲'
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
