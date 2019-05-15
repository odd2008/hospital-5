<template>
	<view>
		<view class="solids-top margin-top">
			<view class="doctor-wrap">
				<view class="cu-avatar round" :style='"background-image:url(" + doctorInfo.headImageUrl + ");"'></view>
				<view class="title">
					<view class="doctor-depart">{{doctorInfo.department}}</view>
					<view class="doctor-name">{{doctorInfo.name}}</view>
					<view class="doctor-tip">医生</view>
				</view>
			</view>
			<view class="info-wrap">
				<view class="row">
					<view class="info-left">
						就诊医院
					</view>
					<view class="info-right">
						常州市第二人民医院阳湖院区
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						科室医生
					</view>
					<view class="info-right">
						{{doctorInfo.department}} - {{doctorInfo.name}}
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						门诊时间
					</view>
					<view class="info-right">
						{{appointTimeInfo.time}}
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						门诊类型
					</view>
					<view class="info-right">
						{{doctorInfo.position}}
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						费用
					</view>
					<view class="info-right">
						{{appointTimeInfo.price}}
					</view>
				</view>
			</view>
			
			<view class="detail-wrap margin-top">
				<view class="detail-row">
					<view class="detail-left">
						就诊人
					</view>
					<view class="detail-right" @click="goBasicInfo">
						{{userInfo.name}}
						<text class="cuIcon-right" style="margin-left: 30upx;"></text>
					</view>
				</view>
				<view class="detail-row">
					<view class="detail-left">
						初/复诊
					</view>
					<view class="detail-right" style="display: flex;">
						<picker @change="typeChanged" style="width: 423upx;" :value="type" :range="types">
							<view class="picker">
								{{type}}
							</view>
						</picker>
						<view class="cuIcon-right" style="margin-left: 30upx;"></view>
					</view>
				</view>
				<view class="detail-row">
					<view class="detail-left">
						疾病信息
					</view>
					<view class="detail-right">
						<input name="input" class="sickInput" v-model="sickInfo" placeholder-style="color: #8799a3;" placeholder="请填写疾病信息"></input>
					</view>
				</view>
				<view class="detail-row">
					<view class="detail-left">
						健康信息
					</view>
					<view class="detail-right" @click="goHealthInfo">
						个人健康档案
						<text class="cuIcon-right" style="margin-left: 30upx;"></text>
					</view>
				</view>
				<view class="detail-row">
					<view class="detail-left">
						支付方式
					</view>
					<view class="detail-right">
						去医院支付
						<text class="cuIcon-right" style="margin-left: 30upx;"></text>
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
				sickInfo: '',
				userInfo: {
					name: '去完善信息'
				},
				doctorInfo: {
					headImageUrl: '../../static/uni-center/logo.png',
					name: '',
					department: '',
					position: '',
					appointNum: 0,
					rate: 0,
					id: 0
				},
				appointTimeInfo: {
					time: '',
					id: 0,
					price: 0
				},
				types: ['初诊', '复诊'],
				type: '初诊'
			};
		},
		onLoad(option) {
			this.appointTimeInfo.time = option.time;
			this.appointTimeInfo.id = option.appointTimeId;
			this.appointTimeInfo.price = option.price;
			this.doctorInfo.id = option.doctorId;
			this.loadData();
		},
		onReady() {
			
		},
		methods: {
			typeChanged(e) {
				this.type = this.types[e.detail.value];
			},
			goBasicInfo() {
				uni.navigateTo({
					url: '../user-info/user-basic-info'
				});
			},
			goHealthInfo() {
				uni.navigateTo({
					url: '../healthdoc/healthdoc-edit'
				});
			},
			loadData() {
				// 取医生的数据
				this.$requestWithToken({
					url: '/appointment/getDoctorDetail',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						id: this.doctorInfo.id
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.doctorInfo = info.data;
							if(this.doctorInfo.headImageUrl === null || this.doctorInfo.headImageUrl.length === 0) {
								this.doctorInfo.headImageUrl = '../../static/uni-center/logo.png';
							}
						} else {
							uni.showToast({
								title: '网络错误，请重试',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
				this.getUserInfo();
			},
			getUserInfo() {
				this.$requestWithToken({
					url: '/user/getUserInfo',
					succeed: (info) => {
						if(info.status === 'success') {
							if(info.data.name !== null) {
								this.userInfo.name = info.data.name;
								if(info.data.headImageUrl !== null && info.data.headImageUrl.length !== 0){
									this.userInfo.avatarUrl = this.$constants.IMAGE_PUBLIC_PATH + info.data.headImageUrl;
								}
							} else {
								uni.showToast({
									title: '请先填写基本资料',
									icon: 'none',
									duration: 2000
								});
								uni.navigateTo({
									url: '/pages/user-info/user-basic-info'
								});
							}
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
			if(this.sickInfo.trim().length === 0) {
				uni.showToast({
					title: '请填写疾病信息',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			if(this.userInfo.name === '去完善信息') {
				uni.showToast({
					title: '请先完善您的基本信息',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let currentDate = new Date();
			let formData = {
				doctorId: this.doctorInfo.id,
				appointTimeId: this.appointTimeInfo.id,
				treatType: this.type,
				sickInfo: this.sickInfo,
				createTime: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
			};
			this.$requestWithToken({
				url: '/appointment/addAppointOrder',
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data: formData,
				succeed: (info) => {
					if(info.status === 'success') {
						console.log(JSON.stringify(info));
						uni.showToast({
							title: '预约成功',
							icon: 'none',
							duration: 1000
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: info.errMsg,
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
	.doctor-wrap {
		display: flex;
		height: 160upx;
		padding: 40upx 30upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #EEEEEE;
	}
	.cu-avatar {
		width: 80upx;
		height: 80upx;
	}
	.title{
		height: 80upx;
		box-sizing: border-box;
		padding: 18upx 20upx;
		/* background-color: #007AFF; */
		display: flex;
		margin-left: 0upx;
	}
	.doctor-depart {
		font-weight: 600;
		font-size: 30upx;
		color: #333333;
	}
	.doctor-name {
		margin-left: 20upx;
		font-weight: 600;
		font-size: 30upx;
		color: #333333;
	}
	.doctor-tip {
		margin-left: 20upx;
		padding-top: 2upx;
		font-weight: 500;
		font-size: 26upx;
		color: #8799a3;
	}
	.info-wrap {
		padding: 20upx 30upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #EEEEEE;
	}
	.row {
		display: flex;
		height: 70upx;
		line-height: 70upx;
		/* background-color: #007AFF; */
	}
	.info-left {
		color: #8799a3;
		font-size: 24upx;
		width: 150upx;
	}
	.info-right {
		color: #8799a3;
		font-size: 26upx;
		text-align: right;
	}
	.detail-wrap {
		background-color: #FFFFFF;
		border-bottom: 1upx solid #EEEEEE;
		margin-bottom: 50upx;
		border-bottom: 1upx solid #EEEEEE;
		border-top: 1upx solid #EEEEEE;
	}
	.detail-row {
		padding-left: 30upx;
		box-sizing: border-box;
		display: flex;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid #EEEEEE;
	}
	.detail-left {
		color: #8799a3;
		font-size: 24upx;
		width: 30%;
	}
	.detail-right {
		color: #8799a3;
		width: 70%;
		font-size: 26upx;
		text-align: right;
		padding-right: 30upx;
		box-sizing: border-box;
	}
	.sickInput{
		margin-top: 15upx;
		height: 50upx;
	}
</style>
