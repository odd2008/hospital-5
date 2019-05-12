<template>
	<view>
		<view class="cu-timeline" v-for="(info, index1) of appointInfos" :key="index1">
			<view class="cu-time">{{info.currentDate}}</view>
			
			<view class="cu-item cur" v-for="(data, index2) of info.data" :key="index2" :class="[bgColors[data.status], 'text-'+colors[data.status]]">
				<view class="content">
					<view class="radius">
						<view class="cu-tag shadow-blur" :class="'bg-'+colors[data.status]">{{statusInfo[data.status]}}</view>
						
						<view class="" style="float: right; font-size: 40upx;" @click="goComment">
							<text class="cuIcon-comment text-grey"></text>
						</view>
					</view>
					<view class="margin-top">
						<view>
							【姓名】{{data.doctorName}}
						</view>
						<view>
							【科室】{{data.department}}
						</view>
						<view>
							【职位】{{data.position}}
						</view>
						<view>
							【挂号时间】{{data.appointDate}}
						</view>
						<view>
							【预约诊治时间】{{data.appointTreatDate}}
						</view>
						<view>
							【诊治时间】{{data.treatDate === null ? '-' : data.treatDate}}
						</view>
						<view>
							【医生建议】{{data.advice === null ? '-' : data.advice}}
						</view>
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
				// months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
				statusInfo: ['等待就诊', '已就诊', '挂号取消'],
				bgColors: ['cuIcon-noticefill','cuIcon-roundcheck', 'cuIcon-roundclose'],
				colors: ['red', 'cyan', 'grey'],
				appointInfos: [
					{
						currentDate: '2019-04',
						data: [{
							status: 1, // 0 等待就诊， 1 已就诊 2 挂号取消
							doctorName: '张三',  // 医生姓名
							department: '神经内科', // 科室
							position: '专家',  // 职位
							appointDate: '2019-04-10', // 挂号时间
							appointTreatDate: '2019-04-12',  //预约诊治时间
							treatDate: '2019-04-12', //诊治时间
							advice: '患者应该多运动，避免久坐'
						},{
							status: 0,  
							doctorName: '李四',
							department: '五官科',
							position: '专家',  // 职位
							appointDate: '2019-04-20',
							appointTreatDate: '2019-04-21',
							treatDate: null,
							advice: null
						},{
							status: 2, 
							doctorName: '王五',
							department: '耳鼻喉科',
							position: '专家',  // 职位
							appointDate: '2019-04-15',
							appointTreatDate: '2019-04-15',
							treatDate: null,
							advice: null
						}]
					},
					{
						currentDate: '2019-03',
						data: [{
							status: 1, // 0 等待就诊， 1 已就诊 2 挂号取消
							doctorName: '张三',  // 医生姓名
							department: '神经内科', // 科室
							position: '专家',  // 职位
							appointDate: '2019-03-10', // 挂号时间
							appointTreatDate: '2019-03-12',  //预约诊治时间
							treatDate: '2019-03-12', //诊治时间
							advice: '患者应该多运动，避免久坐'
						},{
							status: 0,  
							doctorName: '李四',
							department: '五官科',
							position: '专家',  // 职位
							appointDate: '2019-03-20',
							appointTreatDate: '2019-03-21',
							treatDate: null,
							advice: null
						},{
							status: 2, 
							doctorName: '王五',
							department: '耳鼻喉科',
							position: '专家',  // 职位
							appointDate: '2019-03-15',
							appointTreatDate: '2019-03-15',
							treatDate: null,
							advice: null
						}]
					}
				]
			};
		},
		methods:{
			goComment() {
				uni.navigateTo({
					url: 'comment'
				});
			}
		}
	}
</script>

<style>
	
</style>
