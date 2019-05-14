<template>
	<view>
		<view class="solids-top margin-top">
			<view class="doctor-wrap">
				<view class="cu-avatar round" :style='"background-image:url(" + info.userLogoUrl + ");"'></view>
				<view class="title">
					<view class="doctor-depart">{{info.department}}</view>
					<view class="doctor-name">{{info.doctorName}}</view>
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
						{{info.department}} - {{info.doctorName}}
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						门诊时间
					</view>
					<view class="info-right">
						2019-05-27 周一 上午
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						门诊类型
					</view>
					<view class="info-right">
						专家
					</view>
				</view>
				<view class="row">
					<view class="info-left">
						费用
					</view>
					<view class="info-right">
						50.0元 （挂号费）
					</view>
				</view>
			</view>
			
			<view class="detail-wrap margin-top">
				<view class="detail-row">
					<view class="detail-left">
						就诊人
					</view>
					<view class="detail-right">
						张三
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
						<input name="input" class="sickInput" placeholder-style="color: #8799a3;" placeholder="请填写疾病信息"></input>
					</view>
				</view>
				<view class="detail-row">
					<view class="detail-left">
						健康档案
					</view>
					<view class="detail-right">
						50.0元 （挂号费）
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
				info: {
					userLogoUrl: '../../static/uni-center/logo.png',
					doctorName: '王强',
					department: '消化科'
					
				},
				types: ['初诊', '复诊'],
				type: '初诊'
			};
		},
		onLoad() {
			
		},
		onReady() {
			
		},
		methods: {
			typeChanged(e) {
				this.type = this.types[e.detail.value];
			}
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
