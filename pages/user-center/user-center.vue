<template>
	<view class="center">
		<view class="logo" @click="goBasicInfo()" :hover-class="!login ? 'logo-hover' : ''">
			<view @click.stop>
				<image class="logo-img" @click="viewImage" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			</view>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.name : '您尚未完善资料'}}</text>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item arrow margin-top" @click="goAccountInfo">
				<view class="content">
					<text class="cuIcon-lock list-icon"></text>
					<text class="text-grey">账户管理</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goBasicInfo">
				<view class="content">
					<text class="cuIcon-apps list-icon"></text>
					<text class="text-grey">基本资料</text>
				</view>
			</view>
			
			<view class="cu-item arrow margin-top" @click="goAppointHistory">
				<view class="content">
					<text class="cuIcon-time list-icon"></text>
					<text class="text-grey">预约历史</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goFeedback">
				<view class="content">
					<text class="cuIcon-post list-icon"></text>
					<text class="text-grey">帮助与反馈</text>
				</view>
			</view>
			
			<view class="cu-item arrow margin-top" @click="goSecret">
				<view class="content">
					<text class="cuIcon-mail list-icon"></text>
					<text class="text-grey">服务条款及隐私</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goAbout">
				<view class="content">
					<text class="cuIcon-info list-icon"></text>
					<text class="text-grey">关于应用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
        mapState
    } from 'vuex'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				login: false,
				avatarUrl: "../../static/uni-center/logo.png",
				uerInfo: {
					avatarUrl: "../../static/uni-center/logo.png",
					name: ''
				}
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					 uni.navigateTo({
						url: '../login/login',
					});
				}
			},
			goFeedback() {
				uni.navigateTo({
					url: '../user-info/user-feedback',
				});
			},
			goSecret() {
				uni.navigateTo({
					url: '../user-info/user-secret',
				});
			},
			goAbout() {
				uni.navigateTo({
					url: '../user-info/user-about',
				});
			},
			goAppointHistory() {
				uni.navigateTo({
					url: '../appointment/appointment-history',
				});
			},
			goBasicInfo() {
				uni.navigateTo({
					url: '../user-info/user-basic-info',
				});
			},
			goAccountInfo() {
				uni.navigateTo({
					url: '../user-info/user-account'
				});
			},
			viewImage() {
				uni.previewImage({
					urls: [this.uerInfo.avatarUrl],
					current: this.uerInfo.avatarUrl
				});
			},
			getUserInfo() {
				this.$requestWithToken({
					url: '/user/getUserInfo',
					succeed: (info) => {
						if(info.status === 'success') {
							if(info.data.name !== null) {
								this.login = true;
								this.uerInfo.name = info.data.name;
								if(info.data.headImageUrl !== null && info.data.headImageUrl.length !== 0){
									this.uerInfo.avatarUrl = this.$constants.IMAGE_PUBLIC_PATH + info.data.headImageUrl;
								}
							} else {
								uni.showToast({
									title: '请先填写基本资料',
									icon: 'none',
									duration: 1000
								});
								uni.navigateTo({
									url: '/pages/user-info/user-basic-info'
								});
							}
							uni.stopPullDownRefresh();
						} else {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}
					}
				});
			}
		},
		onLoad() {
			if(!this.login){
				this.getUserInfo();
			}
        },
		onPullDownRefresh() {
			console.log('refresh');
			this.getUserInfo();
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

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background: #8799a3;
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
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

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
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
		font-size: 40upx;
		color: #8799a3;
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