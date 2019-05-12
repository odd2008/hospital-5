<template>
	<form>		
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="basicInfo.name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="genderChanged" :value="index" :range="genders">
					<view class="picker">
						{{index>-1?genders[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">出生日期</view>
				<picker mode="date" :value="date" :start="dateRange.start" :end="dateRange.end" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">身高(cm)</view>
				<input v-model="basicInfo.height" name="input" type="digit"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">体重(kg)</view>
				<input v-model="basicInfo.weight" name="input" type="digit"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">职业</view>
				<input v-model="basicInfo.job" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联系人</view>
				<input v-model="basicInfo.emergencyName" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联系电话</view>
				<input v-model="basicInfo.emergencyLink" name="input" type="digit"></input>
			</view>
			<view class="cu-form-group align-start margin-top">
				<view class="title">家庭住址</view>
				<textarea maxlength="-1" :disabled="modalName!=null" :value="basicInfo.address" @input="addressInput" placeholder="请输入备注信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-bottom">
				<view class="title">户籍所在地</view>
				<textarea maxlength="-1" :disabled="modalName!=null" :value="basicInfo.hometown" @input="hometownInput" placeholder="请输入备注信息"></textarea>
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
				basicInfo: {
					name: '张三',
					gender: '男',
					age: 20,
					height: 183,
					weight: 63,
					job: '软件工程师',
					link: '15624359864',
					address: '江苏省常州市武进区湖塘镇滆湖路一号',
					hometown: '江苏省常州市武进区湖塘镇滆湖路一号',
					emergencyName: '李梅',
					emergencyLink: '18623459647'
				},
				index: 0,
				genders: ['男', '女'],
				date: '1996-12-01',
				dateRange: {
					start: '1900-01-01',
					end:  ''
				},
				CustomBar: this.CustomBar,
				loadProgress: 0,
				sickInfo: [
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					},
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					},
					{
						date: '2019-01-12',
						imageUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						content: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。',
						contentCut: true
					}
				],
				imgList: [],
				showAddSick: false,
				modalName: null
			}
		},
		onLoad() {
			this.LoadProgress();
			let currentDate = new Date();
			this.dateRange.end = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
		},
		methods: {
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
			genderChanged(e) {
				this.index = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			changeCut(index) {
				this.sickInfo[index].contentCut = !this.sickInfo[index].contentCut;
			},
			addHealthInfo() {
				this.showAddSick = true;
			},
			saveSickInfo(){
				let currentDate = new Date();
				let currentDateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
				this.sickInfo.push({
					date: currentDateStr,
					imageUrl: this.imgList[0],
					content: this.remark,
					contentCut: true
				});
				this.imgList = this.imgList.concat(this.imgList)
				uni.showToast({
					title: '保存成功',
					duration: 1000
				});
				this.showAddSick = false;
				this.imgList = [];
				console.log(this.remark);
				this.remark = '';
			},
			addressInput(e) {
				this.basicInfo.address = e.detail.value
			},
			hometownInput(e) {
				this.basicInfo.hometown = e.detail.value
			}
		},
		onNavigationBarButtonTap() {
			console.log("保存");
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 80upx);
		color: #8799a3;
	}
	@import "../../colorui/animation.css";
	
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}
	
	.picker {
		width: 500upx;
	}
</style>
