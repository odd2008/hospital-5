<template>
	<view>
		<view class="cu-timeline">
			<view class="cu-time"><text class="cuIcon-we text-yellow"></text></view>
			
			<view class="cu-item cur" v-for="(info, index) of appointInfos" :key="index" :class="[bgColors[info.status], 'text-'+colors[info.status]]">
				<view class="content bg-white" :class="['border-'+colors[info.status]]" style="border-radius: 20upx;">
					<view class="radius">
						<view class="cu-tag shadow-blur" :class="'bg-'+colors[info.status]">{{statusInfo[info.status]}}</view>
						
						<view class="" style="float: right; font-size: 40upx;" v-if="info.status === 1" @click="goComment">
							<text class="cuIcon-comment text-grey"></text>
						</view>
						<view class="" style="float: right; font-size: 40upx;" v-else-if="info.status === 0" @click="cancleAppoint(info.id, info.appointTime.id)">
							<text class="cuIcon-delete text-red"></text>
						</view>
					</view>
					<view class="margin-top text-grey">
						<view>
							【就诊医院】常州市第二人民医院阳湖院区
						</view>
						<view>
							【科室医生】{{info.doctorDTO.department}}-{{info.doctorDTO.position}}-{{info.doctorDTO.name}}
						</view>
						<view>
							【初/复诊】{{info.treatType}}
						</view>
						<view>
							【疾病信息】{{info.sickInfo}}
						</view>
						<view>
							【挂号时间】{{info.createTime}}
						</view>
						<view>
							【预约诊治时间】{{info.appointTime.appointDate}}({{info.appointTime.timeSpan}})
						</view>
						<view>
							【诊治时间】{{info.treatTime === null ? '-' : info.treatTime}}
						</view>
						<view>
							【诊治结果】{{info.treatResult === null ? '-' : info.treatResult}}
						</view>
					</view>
				</view>
			</view>
			<view class="cu-time"><text class="cuIcon-we text-yellow"></text></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
				statusInfo: ['等待就诊', '已就诊', '挂号取消'],
				bgColors: ['cuIcon-noticefill','cuIcon-roundcheck', 'cuIcon-roundclose'],
				colors: ['red', 'cyan', 'grey'],
				appointInfos: []
			};
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			goComment() {
				uni.navigateTo({
					url: 'comment'
				});
			},
			cancleAppoint(orderId, timeId) {
				uni.showModal({
					title: '取消预约',
					content: '确定要预约挂号吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.$requestWithToken({
								url: '/appointment/cancleAppoint',
								header:{
									'Content-Type':'application/x-www-form-urlencoded'
								},
								data: {
									orderId: orderId,
									timeId: timeId
								},
								succeed: (info) => {
									if(info.status === 'success') {
										uni.showToast({
											title: '取消成功',
											icon: 'none',
											duration: 2000
										});
										this.loadData();
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
				});
				
			},
			loadData() {
				this.$requestWithToken({
					url: '/appointment/getAppointHistory',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.appointInfos = info.data;
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
			this.loadData();
		}
	}
</script>

<style scoped="">
	.border-red {
		border: 1upx solid #e54d42;
	}
	.border-cyan {
		border: 1upx solid #1cbbb4;
	}
	.border-grey {
		border: 1upx solid #8799a3;
	}
</style>
