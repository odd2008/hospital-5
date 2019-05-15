<template>
	<view>
		<!-- 评论列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-sort text-grey"></text> 全部评价
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top">
			<view class="cu-item" v-for="(info,index) in commentInfo" :key="index">
				<view class="cu-avatar round" :style='"background-image:url(" + publicPath + info.user.headImageUrl + ");"'></view>
				<view class="content">
					<view class="text-grey">{{info.user.name}}</view>
					<view class="text-gray text-content text-df">
						{{info.comment.content}}
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{info.comment.publishDate}}</view>
						<view class="text-yellow text-df">{{info.comment.rate}}.0</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论列表 -->
		
	</view>
</template>
<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		data() {
			return {
				commentInfo: [],
				publicPath: this.$constants.IMAGE_PUBLIC_PATH,
				targetId: 0,
				targetType: 0
			}
		},
		onLoad(option) {
			this.targetId = option.targetId;
			this.targetType = option.targetType;
			this.getCommentInfo(this.targetId, this.targetType);
		},
		onReady() {

		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getCommentInfo(this.targetId, this.targetType);
		},
		methods: {
			getCommentInfo(targetId, targetType) {
				// 评论信息
				this.$requestWithToken({
					url: '/appointment/getComment',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						targetId: targetId,
						targetType: targetType
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.commentInfo = info.data;
						} else {
							uni.showToast({
								title: '网络错误，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	
	page {
		background-color: #f8f8f8;
	}
	
	.center {
		flex-direction: column;
	}
	
	.logo {
		width: 750upx;
		height: 300upx;
		padding: 20upx;
		padding-left: 40upx;
		padding-top: 60upx;
		box-sizing: border-box;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		flex-direction: row;
		display: flex;
	}
	
	.logo-hover {
		opacity: 0.8;
	}
	
	.logo-img {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}
	.logo-title { 
		height: 60upx;
		display: block;
		margin-left: 30upx;
	}
	
	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
	
	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
	
	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4DCFE0;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}
	
	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}
	
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
