<template>
	<view class="center">
		<view class="logo">
			<view class="logo-top">
				<image class="logo-img" :src="doctorInfo.headImageUrl"></image>
				<view class="logo-title">
					<view style="height: 70upx;padding-top: 10upx;box-sizing: border-box;">
						<view class="uer-name flex">
							<view style="width: 120upx; font-size: 35upx;">{{doctorInfo.name}}</view>
							<view class="cu-tag round line-white sm" style="margin-top: 13upx;">{{doctorInfo.department}}</view>
							<view class="cu-tag round line-white sm" style="margin-top: 13upx;">{{doctorInfo.position}}</view>
						</view>
					</view>
					<!-- <text class="go-login navigat-arrow">&#xe65e;</text> -->
					<view style="height: 50upx;">
						<view class="uer-name flex" style="font-size: 25upx;">
							<view style="width: 200upx;">预约量：{{doctorInfo.appointNum}}</view>
							<view style="">评分：{{doctorInfo.rate}}</view>
						</view>
					</view>
				</view>
			</view>
			<view >
				<view class="uer-name" style="font-size: 25upx; line-height: 30upx; margin-top: 30upx;">
					简介：{{doctorInfo.skills}}
				</view>
			</view>
		</view>
		<!-- 预约时间列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-timefill text-grey"></text> 本月
			</view>
		</view>
		
		<view class="cu-list menu-avatar">
			<view class="cu-item" style="height: 200upx; border-bottom: 1upx solid #eee;" v-for="(info,index) in appointTimes" :key="index">
				<view class="content" style="left: 60upx;">
					<view class="text-black flex">
						<view style="width: 160upx;">{{info.appointDate}}</view>
						<view style="width: 70upx;">{{info.weekDay}}</view>
						<view style="width: 70upx;">{{info.timeSpan}}</view>
						<view class="cu-tag round line-cyan sm">{{info.remainDate}}天后</view>
					</view>
					<view class="text-gray text-sm flex">
						<view style="">{{doctorInfo.position}}</view>
						<view style="color: #e54d42; margin-left: 20upx;">{{info.price}}元</view>
						<view style="color: #fbbd08; margin-left: 30upx;">剩余：{{info.totalNum - info.appointNum}}</view>
					</view>
				</view>
				<view class="action">
					<view class="cu-tag radius bg-grey" v-if="info.totalNum === info.appointNum" @click="appointFull">约满</view>
					<view class="cu-tag radius bg-cyan" v-else @click="goOrder(info)">预约</view>
				</view>
			</view>
		</view>
		<!-- 预约时间列表 -->
		
		<!-- 评论列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-commentfill text-grey"></text> 医师评价
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
		<!-- 更多列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-discoverfill text-grey"></text> 推荐医师
			</view>
		</view>
		
		<view class="cu-list menu-avatar" style="margin-bottom: 50upx;">
			<view class="cu-item" style="height: 200upx; border-bottom: 1upx solid #eee;"  v-for="(info,index) in recommendInfo" :key="index" @click="goDetail(info)">
				<view class="cu-avatar round lg" :style='"background-image:url("+info.headImageUrl+");"'></view>
				<view class="content">
					<view class="text-black">
						<text>{{info.name}}</text>
						<text class="cu-tag round sm bg-orange" style="margin-left: 30upx;">{{info.position}}</text>
					</view>
					<view class="flex">
						<view class="text-grey text-sm" style="color: #fbbd08;">
							评分：{{info.rate}}
						</view>
						<view class="text-grey text-sm" style="margin-left: 30upx;">
							预约量：{{info.appointNum}}
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut" style="">
							{{info.skills}}
						</text> 
					</view>
				</view>
				<view class="action text-gray text-cut" style="width: 150upx; text-align: right;box-sizing: border-box;padding-right: 10upx;">
					<text class="text-sm">{{info.department}}</text>
				</view>
			</view>
		</view>
		<!-- 更多列表 -->
	</view>
</template>
<script>
	import {
	    mapState
	} from 'vuex'
	export default {
		data() {
			return {
				appointTimes: [],
				weekValues: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				doctorInfo: {
					headImageUrl: '../../static/uni-center/logo.png',
					name: '',
					department: '',
					position: '',
					appointNum: 0,
					rate: 0,
					id: 0,
					skills: ''
				},
				publicPath: this.$constants.IMAGE_PUBLIC_PATH,
				recommendInfo: [],
				commentInfo: []
			};
		},
		onLoad(option) {
			this.doctorInfo.name = option.name;
			this.doctorInfo.position = option.position;
			uni.setNavigationBarTitle({
				title: `${option.position} - ${option.name}`
			}); 
			this.loadData(option.id);
		},
		onReady() {

		},
		onPullDownRefresh() {
			console.log('refresh');
			this.loadData(this.doctorInfo.id);
		},
		methods: {
			goCommentDetail() {
				uni.navigateTo({
					url: `comment-detail?targetId=${this.doctorInfo.id}&targetType=1`
				});
			},
			goDetail(doctor) {
				uni.navigateTo({
					url: `/pages/appointment/doctor-detail?name=${doctor.name}&position=${doctor.position}&id=${doctor.id}`
				});
			},
			appointFull() {
				uni.showToast({
					title: '已约满，请选择其他时间',
					icon: 'none',
					duration: 2000
				});
			},
			goOrder(info) {
				let time = `${info.appointDate}(${info.weekDay})${info.timeSpan}`;
				uni.navigateTo({
					url: `appointment-order?doctorId=${this.doctorInfo.id}&appointTimeId=${info.id}&time=${time}&price=${info.price}`
				});
			},
			loadData(id) {
				console.log(id);
				this.getDoctorDetail(id);
				this.getAppointData(id);
				this.getCommentInfo(id);
				this.getRecommendDoctor();
			},
			getDoctorDetail(doctorId) {
				// 取医生的数据
				this.$requestWithToken({
					url: '/appointment/getDoctorDetail',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						id: doctorId
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.doctorInfo = info.data;
							if(this.doctorInfo.headImageUrl === null || this.doctorInfo.headImageUrl.length === 0) {
								this.doctorInfo.headImageUrl = '../../static/uni-center/logo.png';
							}
						} else {
							
						}
					}
				});
			},
			getRecommendDoctor() {
				// 推荐信息
				this.$requestWithToken({
					url: '/appointment/getRecommendDoctor',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.recommendInfo = info.data;
						} else {
							
						}
						uni.stopPullDownRefresh();
					}
				});
			},
			getAppointData(doctorId) {
				// 预约时间信息
				this.$requestWithToken({
					url: '/appointment/getAppointTime',
					header:{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						doctorId: doctorId
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.appointTimes = [];
							for(let timeInfo of info.data) {
								let tempDate = new Date();
								tempDate.setFullYear(timeInfo.appointDate.split("-")[0]);
								tempDate.setMonth(parseInt(timeInfo.appointDate.split("-")[1]) - 1);
								tempDate.setDate(timeInfo.appointDate.split("-")[2]);
								
								let currentDate = new Date();
								let remainDate = parseInt(parseInt(tempDate - currentDate) / 1000 /60 / 60 /24);
								
								this.appointTimes.push({
									appointDate: timeInfo.appointDate,
									timeSpan: timeInfo.timeSpan,
									price: timeInfo.price,
									id: timeInfo.id,
									totalNum: timeInfo.totalNum,
									appointNum: timeInfo.appointNum,
									weekDay: this.weekValues[tempDate.getDay() - 1],
									remainDate: remainDate,
									id: timeInfo.id
								});
							}
							
						} else {
							
						}
					}
				});
			},
			getCommentInfo(doctorId) {
				// 评论信息
				this.$requestWithToken({
					url: '/appointment/getComment',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						targetId: doctorId,
						targetType: 1
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
		height: 350upx;
		padding: 20upx;
		padding-left: 40upx;
		padding-top: 60upx;
		box-sizing: border-box;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
	}
	.logo-top {
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
