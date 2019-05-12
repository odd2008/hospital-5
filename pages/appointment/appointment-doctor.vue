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
					<view class="text-black">【{{doctor.position}}】{{doctor.doctorName}}</view>
					<view class="flex">
						<view class="text-grey" style="width: 200upx;">
							【评分】{{doctor.rate}}
						</view>
						<view class="text-grey">
							【预约量】{{doctor.appointNums}}
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
				doctorInfos: [{
					doctorName: '张三',  // 医生姓名
					position: '专家',  // 职位
					rate: 9.3,
					appointNums: 2019,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '李四',  // 医生姓名
					position: '主任医师',  // 职位
					rate: 9.6,
					appointNums: 1098,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '王五',  // 医生姓名
					position: '副主任医师',  // 职位
					rate: 9.2,
					appointNums: 3909,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '赵六',  // 医生姓名
					position: '专家',  // 职位
					rate: 9.8,
					appointNums: 4098,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				},{
					doctorName: '刘能',  // 医生姓名
					position: '医师',  // 职位
					rate: 9.9,
					appointNums: 1896,
					skills: '擅长冠心病介入诊断与治疗，在疑难、危重心脏病的诊治方面具有丰富的临床经验。'
				}],
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
		},
		onReady() {
			
		},
		methods: {
			goDetail(doctor) {
				uni.navigateTo({
					url: `doctor-detail?doctorName=${doctor.doctorName}&position=${doctor.position}`
				});
			},
			goCommentDetail() {
				uni.navigateTo({
					url: 'comment-detail'
				});
			}
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
