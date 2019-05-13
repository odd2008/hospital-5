<template>
    <view class="page">
		<view class="cu-list menu">
			<view class="cu-item arrow margin-top" @click="goUpdatePwd">
				<view class="content">
					<text class="cuIcon-edit text-grey"></text>
					<text class="text-grey">修改密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="exitAccount">
				<view class="content">
					<text class="cuIcon-list text-grey"></text>
					<text class="text-grey">登录记录</text>
				</view>
			</view>
			<view class="cu-item margin-top">
				<view class="content">
					<text class="cuIcon-lock text-grey"></text>
					<text class="text-grey">账户锁定</text>
					<view class="" style="float: right;">
						<switch class='red switch-sex' style="transform: scale(2);" @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</view>
			</view>
			<view class="cu-item arrow text-red" @click="exitAccount">
				<view class="content">
					<text class="cuIcon-exit text-red"></text>
					<text class="text-red">退出登录</text>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                switchA: false,
            }
        },
        onLoad() {
            
        },
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			goUpdatePwd() {
				uni.navigateTo({
					url: '/pages/login/forget'
				});
			},
			exitAccount() {
				uni.removeStorage({
					key: this.$constants.AUTHORIZATION_KEY,
					success: function (res) {
						console.log('已清除授权token');
						//跳转到登录页
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				});
			}
		}
    }
</script>

<style>
    @font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
    }
	.page {
		width: 100%;
	}
    view{
        font-size: 28upx;
    }
</style>
