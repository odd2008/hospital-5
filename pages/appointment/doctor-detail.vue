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
				<view class="uer-name" style="font-size: 25upx; line-height: 30upx; margin-top: 20upx;">
					简介：擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。
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
					</view>
				</view>
				<view class="action">
					<view class="cu-tag radius bg-cyan">预约</view>
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
		<!-- 更多列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-discoverfill text-grey"></text> 推荐医师
			</view>
		</view>
		
		<view class="cu-list menu-avatar" style="margin-bottom: 50upx;">
			<view class="cu-item" style="height: 200upx; border-bottom: 1upx solid #eee;"  v-for="(info,index) in recommendInfo" :key="index">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-black">
						<text style="width: 100upx;">{{info.name}}</text>
						<text class="cu-tag round sm bg-orange">{{info.position}}</text>
					</view>
					<view class="flex">
						<view class="text-grey text-sm" style="width: 200upx;color: #fbbd08;">
							评分：{{info.rate}}
						</view>
						<view class="text-grey text-sm">
							预约量：{{info.appointNum}}
						</view>
					</view>
					<view class="text-gray text-sm flex">
						<text class="text-cut">
							{{info.skills}}
						</text> 
					</view>
				</view>
				<view class="action">
					<text class="text-gray text-sm">{{info.department}}</text>
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
					id: 0
				},
				recommendInfo: [],
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
					url: 'comment-detail'
				});
			},
			loadData(id) {
				// 取医生的数据
				this.$requestWithToken({
					url: '/appointment/getDoctorDetail',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						id: id
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.doctorInfo = info.data;
							if(this.doctorInfo.headImageUrl === null || this.doctorInfo.headImageUrl.length === 0) {
								this.doctorInfo.headImageUrl = '../../static/uni-center/logo.png';
							}
							this.getAppointData(info.data.id);
						} else {
							
						}
					}
				});
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
									remainDate: remainDate
								});
							}
							
						} else {
							
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
