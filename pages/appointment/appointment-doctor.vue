<template>
	<view style="padding-bottom: 50upx;">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-sort text-grey"></text> 医师列表
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(doctor, index) in doctorInfos" :key="index" :id="'doctor-'+index" style="height: 200upx; border-bottom: 1upx solid #eee;" @click="goDetail(doctor)">
				<view class="cu-avatar round lg" style="background-image:url(https://kano.guahao.cn/WGA2611380_image140.jpg);"></view>
				<view class="content">
					<view class="text-black flex">
						<view style="width: 120upx;">{{doctor.name}}</view>
						<view>【{{doctor.position}}】</view>
					</view>
					<view class="flex">
						<view class="text-grey" style="width: 200upx;">
							【评分】{{doctor.rate}}
						</view>
						<view class="text-grey">
							【预约量】{{doctor.appointNum}}
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							{{doctor.skills}}
						</text> 
					</view>
				</view>
				<view class="action">
					<view class="cu-tag round bg-red sm" v-if="doctor.count < 10 && doctor.count !== 0" >{{doctor.count}}</view>
					<view class="cu-tag round bg-grey sm" v-else >{{doctor.count}}</view>
				</view>
			</view>
		</view>
		<!-- 评论列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-commentfill text-grey"></text> 科室评价
			</view>
			<view class="action" @click="goCommentDetail()">
				<text class="cuIcon-right text-grey"></text>
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
	export default {
		data() {
			return {
				doctorInfos: [],
				departId: 0,
				publicPath: this.$constants.IMAGE_PUBLIC_PATH,
				commentInfo: []
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.type
			});
			this.departId = option.id;
			this.loadData(option.id);
		},
		onReady() {
			
		},
		methods: {
			goDetail(doctor) {
				uni.navigateTo({
					url: `doctor-detail?name=${doctor.name}&position=${doctor.position}&id=${doctor.id}`
				});
			},
			goCommentDetail() {
				uni.navigateTo({
					url: `comment-detail?targetId=${this.departId}&targetType=2`
				});
			},
			loadData(departId) {
				// 取医生的数据
				this.$requestWithToken({
					url: '/appointment/getDoctorInfo',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						departId: departId
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.doctorInfos = info.data;
						} else {
							uni.showToast({
								title: '网络错误，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
				
				// 取评论的数据
				this.$requestWithToken({
					url: '/appointment/getComment',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						targetId: departId,
						targetType: 2
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.commentInfo = info.data.slice(0, 4);
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
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.loadData(this.departId);
		}
	}
</script>

<style scoped>
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
	
	.switch-sex::after {
		content: "\e716";
	}
	
	.switch-sex::before {
		content: "\e7a9";
	}
	
	.switch-music::after {
		content: "\e66a";
	}
	
	.switch-music::before {
		content: "\e6db";
	}
</style>
