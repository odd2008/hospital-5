<template>
	<form>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 医师评价
			</view>
		</view>
		
		<view>
			<view class="cu-form-group align-start" style="height: 400upx;">
				<view class="title">评价</view>
				<textarea maxlength="-1" style="height: 350upx;" :disabled="modalName!=null" :value="commentDoctor" @input="commentDoctorInput" placeholder="请输入评论"></textarea>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 科室评价
			</view>
		</view>
		
		<view>
			<view class="cu-form-group align-start" style="height: 400upx;">
				<view class="title">评价</view>
				<textarea maxlength="-1" adjust-position="true" style="height: 350upx;" :disabled="modalName!=null" :value="commentDepart" @input="commentDepartInput" placeholder="请输入评论"></textarea>
			</view>
		</view>
		
		<view class="load-progress" :class="loadProgress!=0?'show':'hide'" :style="[{top:CustomBar+'px'}]">
			<view class="load-progress-bar bg-orange" :style="[{transform: 'translate3d(-' + (100-loadProgress) + '%, 0px, 0px)'}]"></view>
		</view>
	</form>
</template>
<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				loadProgress: 0,
				modalName: null,
				commentDoctor: '',
				commentDepart: ''
			}
		},
		onLoad(option) {
			
		},
		onReady() {
			this.LoadProgress();
		},
		methods: {
			commentDoctorInput(e) {
				this.commentDoctor = e.detail.value
			},
			commentDepartInput(e) {
				this.commentDepart = e.detail.value
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
			}
		},
		onNavigationBarButtonTap() {
			console.log("提交")
		}
	}
</script>

<style scoped>
	
</style>
