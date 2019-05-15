<template>
	<view style="margin-bottom: 60upx;">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 医师评价
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class='feedback-title feedback-star-view' style="display: flex;">
				<view style="margin-left: 30upx; color: #333333;">评分</view>
				<view class="feedback-star-view">
				    <text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < doctorInfo.rate ? 'active' : ''" @tap="chooseDoctorStar(value)"></text>
				</view>
			</view>
		</view>
		
		<view>
			<view class="cu-form-group align-start" style="height: 400upx;">
				<view class="title">评价</view>
				<textarea maxlength="-1" style="height: 350upx;" :disabled="modalName!=null" :value="doctorInfo.content" @input="commentDoctorInput" placeholder="请输入评论"></textarea>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 科室评价
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class='feedback-title feedback-star-view' style="display: flex;">
				<view style="margin-left: 30upx; color: #333333;">评分</view>
				<view class="feedback-star-view">
				    <text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < departInfo.rate ? 'active' : ''" @tap="chooseDepartStar(value)"></text>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-form-group align-start" style="height: 400upx;">
				<view class="title">评价</view>
				<textarea maxlength="-1" adjust-position="true" style="height: 350upx;" :disabled="modalName!=null" :value="departInfo.content" @input="commentDepartInput" placeholder="请输入评论"></textarea>
			</view>
		</view>
		
		<view class="load-progress" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-orange" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				loadProgress: 0,
				modalName: null,
				stars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				doctorInfo: {
					rate: 0,
					content: ''
				},
				departInfo: {
				    rate: 0,
				    content: ''
				},
				doctorId: 0
			}
		},
		onLoad(option) {
			this.LoadProgress();
			this.doctorId = option.id;
			this.loadData();
		},
		onReady() {
			
		},
		methods: {
			commentDoctorInput(e) {
				this.doctorInfo.content = e.detail.value
			},
			commentDepartInput(e) {
				this.departInfo.content = e.detail.value
			},
			chooseDoctorStar(e) { //点击评星
			    this.doctorInfo.rate = e;
			},
			chooseDepartStar(e) { //点击评星
			    this.departInfo.rate = e;
			},
			LoadProgress() {
				this.loadProgress = this.loadProgress + 3;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 40)
				} else {
					this.loadProgress = 0;
				}
			},
			loadData() {
				this.$requestWithToken({
					url: '/appointment/getCurrentContent',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						doctorId: this.doctorId
					},
					succeed: (info) => {
						if(info.status === 'success') {
							console.log(JSON.stringify(info.data));
							this.doctorInfo.rate = info.data.doctor.rate;
							this.doctorInfo.content = info.data.doctor.content;
							this.departInfo.rate = info.data.depart.rate;
							this.departInfo.content = info.data.depart.content;
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
		onNavigationBarButtonTap() {
			if(this.doctorInfo.rate === 0 || this.departInfo.rate === 0) {
				uni.showToast({
					title: '请先评分',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if(this.doctorInfo.content.trim().length === 0 || this.departInfo.content.trim().length === 0) {
				uni.showToast({
					title: '请先评论',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let currentDate = new Date();
			let contents = [{
				content: this.doctorInfo.content,
				publishDate: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
				rate: this.doctorInfo.rate,
				targetType: 1, // 1 医生 2 科室
				targetId: this.doctorId
			}, {
				content: this.departInfo.content,
				publishDate: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
				rate: this.departInfo.rate,
				targetType: 2, // 1 医生 2 科室
				targetId: this.doctorId
			}];
			this.$requestWithToken({
				url: '/appointment/addContent',
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data: contents[0],
				succeed: (info) => {
					if(info.status === 'success') {
						// this.appointInfos = info.data;
					} else {
						uni.showToast({
							title: '网络错误，请重试',
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
			this.$requestWithToken({
				url: '/appointment/addContent',
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data: contents[1],
				succeed: (info) => {
					if(info.status === 'success') {
						uni.showToast({
							title: '评论成功',
							icon: 'none',
							duration: 1000
						});
						uni.navigateBack({
							delta: 1
						});
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
</script>

<style scoped>
	@font-face {
    	font-family: uniicons;
    	font-weight: normal;
    	font-style: normal;
    	src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
    }	
	.feedback-star-view.feedback-title {
		justify-content: flex-start;
		margin: 0;
	}
	.feedback-star {
		font-family: uniicons;
		font-size: 40upx;
		margin-left: 6upx;
	}
	.feedback-star-view {
		margin-left: 26upx;
	}
	.feedback-star:after {
		content: '\e408';
	}
	.feedback-star.active {
		color: #FFB400;
	}
	.feedback-star.active:after {
		content: '\e438';
	}
</style>
