<template>
	<form>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 基本信息
			</view>
		</view>
		<view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">住院史</view>
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.hospital" @input="hospitalInput" placeholder="请输入住院史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">手术史</view>
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.operation" @input="operationInput" placeholder="请输入手术史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">家族史</view>
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.family" @input="familyInput" placeholder="请输入家族史信息"></textarea>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 病史/报告
			</view>
		</view>
		
		<view style="margin-bottom: 60upx;">
			<view class="cu-card case" v-for="(info, index) in sickInfo" :key="index" :id="'sick-'+index">
				<view class="cu-item shadow">
					<view class="image">
						<image :src="info.imageUrl"
						 mode="widthFix" @click="previewImage(info.imageUrl)"></image>
						<view class="cu-tag bg-yellow text-white">{{info.date}}</view>
						<view class="cu-bar bg-shadeBottom">
							<text :class="{'text-cut': info.contentCut}" @click="changeCut(index)">{{info.content}}</text>
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="padding flex flex-direction">
							<button class="cu-btn line-red margin-tb-sm lg">删除</button>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-card case" v-show="showAddSick">
				<view class="cu-item shadow">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-pic text-grey"></text> 病史图片
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{imgList.length}}/1
						</view>
					</view>
					<view class="cu-form-group" style="padding-bottom: 60upx;">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">备注</view>
						<textarea maxlength="-1" :disabled="modalName!=null" :value="remark" @input="remarkInput" placeholder="请输入备注信息"></textarea>
					</view>
					<view class="cu-list menu-avatar">
						<view class="padding flex flex-direction">
							<button class="cu-btn line-blue margin-tb-sm lg" @click="saveSickInfo">保存</button>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="padding" style="text-align: center;">
				<button class="cu-btn line-cyan lg" style="width: 300upx;" @click="addHealthInfo"> 添加 </button>
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
					hospital: '住院信息',
					operation: '双眼皮手术',
					family: '色盲'
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
				modalName: null,
				remark: ''
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
			previewImage(currentUrl){
				//console.log(currentUrl);
				uni.previewImage({
					urls: [currentUrl],
					current: currentUrl,
					indicator: 'none',
					loop: false,
					fail: function(){
						//提示用户
						uni.showToast({
							title: '预览失败，请重试！',
							duration: 1000
						});
					}
				});
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
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				});
			},
			hospitalInput(e) {
				this.basicInfo.hospital = e.detail.value
			},
			operationInput(e) {
				this.basicInfo.operation = e.detail.value
			},
			familyInput(e) {
				this.basicInfo.family = e.detail.value
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
