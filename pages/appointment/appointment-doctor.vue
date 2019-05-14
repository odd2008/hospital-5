<template>
	<view style="padding-bottom: 50upx;">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-sort text-grey"></text> 医师列表
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(doctor, index) in doctorInfos" :key="index" :id="'doctor-'+index" style="height: 200upx; border-bottom: 1upx solid #eee;" @click="goDetail(doctor)">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
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
					<view class="cu-tag radius bg-cyan">预约</view>
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
	export default {
		data() {
			return {
				doctorInfos: [],
				departId: 0,
				commentInfo: [{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '科室仪器十分先进，检查见过很靠谱，医务人员尽心尽责，十分满意，感谢',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '科室仪器十分先进，检查见过很靠谱，医务人员尽心尽责，十分满意，感谢',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '科室仪器十分先进，检查见过很靠谱，医务人员尽心尽责，十分满意，感谢',
					publishDate: '2018年12月4日',
					rate: 9.1
				},{
					userLogoUrl: '../../static/uni-center/logo.png',
					userName: '蒋云芬',
					content: '科室仪器十分先进，检查见过很靠谱，医务人员尽心尽责，十分满意，感谢',
					publishDate: '2018年12月4日',
					rate: 9.1
				}]
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
					url: 'comment-detail'
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
							
						}
						uni.stopPullDownRefresh();
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
