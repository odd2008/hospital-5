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
				<view class="cu-avatar round" :style='"background-image:url(" + info.userLogoUrl + ");"'></view>
				<view class="content">
					<view class="text-grey">{{info.userName}}</view>
					<view class="text-gray text-content text-df">
						{{info.content}}
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray text-df">{{info.publishDate}}</view>
						<view class="text-yellow text-df">{{info.rate}}</view>
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
				commentInfo: [{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '主任问的问题都能详细解答，挺有耐心，配了药，药效很好，感谢主任',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '主任问的问题都能详细解答，挺有耐心，配了药，药效很好，感谢主任',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '主任问的问题都能详细解答，挺有耐心，配了药，药效很好，感谢主任',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '主任问的问题都能详细解答，挺有耐心，配了药，药效很好，感谢主任',
					publishDate: '2018年12月4日',
					rate: 9.1
				}]
			}
		},
		onLoad(option) {
			
		},
		onReady() {

		},
		methods: {
			
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
