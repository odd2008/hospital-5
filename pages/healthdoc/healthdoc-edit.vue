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
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.hospitalHistory" @input="hospitalInput" placeholder="请输入住院史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">手术史</view>
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.operationHistory" @input="operationInput" placeholder="请输入手术史信息"></textarea>
			</view>
			<view class="cu-form-group align-start margin-top" style="height: 300upx;">
				<view class="title">家族史</view>
				<textarea maxlength="-1" style="height: 250upx;" :disabled="modalName!=null" :value="basicInfo.familyHistory" @input="familyInput" placeholder="请输入家族史信息"></textarea>
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
							<button class="cu-btn line-red margin-tb-sm lg" @tap.stop="deleteImage" :data-index="index">删除</button>
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
					hospitalHistory: '',
					operationHistory: '',
					familyHistory: ''
				},
				CustomBar: this.CustomBar,
				loadProgress: 0,
				sickInfo: [],
				imgList: [],
				showAddSick: false,
				modalName: null,
				remark: ''
			}
		},
		onLoad() {
			this.LoadProgress();
			this.loadInfo();
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
				// 上传图片
				this.$uploadWithoutToken({
					url: '/healthDoc/uploadReportImage',
					filePath: this.imgList[0],
					header: {
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						content: this.remark,
						createDate: currentDateStr
					},
					succeed: (info) => {
						console.log(JSON.stringify(info));
						console.log(this.$constants.IMAGE_PUBLIC_PATH + info.data);
						this.sickInfo.push({
							date: currentDateStr,
							imageUrl: this.imgList[0],
							content: this.remark,
							contentCut: true
						});
						this.imgList = this.imgList.concat(this.imgList)
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 1000
						});
						this.showAddSick = false;
						this.imgList = [];
						this.remark = '';
					}
				});
				
			},
			deleteImage(e) {
				uni.showModal({
					title: '删除病史/报告',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							let currentIndex = e.currentTarget.dataset.index;
							this.$requestWithToken({
								url: '/healthDoc/deleteHealthImage',
								header:{
									'Content-Type':'application/x-www-form-urlencoded'
								},
								data: {
									id: this.sickInfo[currentIndex].id
								},
								succeed: (info) => {
									if(info.status === 'success') {
										this.sickInfo.splice(currentIndex, 1);
										console.log(JSON.stringify(info));
										uni.showToast({
											title: '删除成功',
											icon: 'none',
											duration: 1000
										});
									} else {
										
									}
								}
							});
						}
					}
				});
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
					title: '病史/报告',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				});
			},
			hospitalInput(e) {
				this.basicInfo.hospitalHistory = e.detail.value
			},
			operationInput(e) {
				this.basicInfo.operationHistory = e.detail.value
			},
			familyInput(e) {
				this.basicInfo.familyHistory = e.detail.value
			},
			remarkInput(e) {
				this.remark = e.detail.value;
			},
			loadInfo() {
				this.$requestWithToken({
					url: '/healthDoc/getHealthDoc',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					succeed: (info) => {
						if(info.status === 'success') {
							this.basicInfo = info.data;
						} else {
							
						}
					}
				});
				// 取图片
				this.$requestWithToken({
					url: '/healthDoc/getHealthImage',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					succeed: (info) => {
						if(info.status === 'success') {
							console.log(JSON.stringify(info.data));
						 	for(let image of info.data) {
								console.log(JSON.stringify(image));
								this.sickInfo.push({
									id: image.id,
									date: image.createDate,
									imageUrl: this.$constants.IMAGE_PUBLIC_PATH + image.imageUrl,
									content: image.content,
									contentCut: true
								});
							}
						} else {
							
						}
					}
				});
			}
		},
		onNavigationBarButtonTap() {
			this.$requestWithToken({
				url: '/healthDoc/saveHealthDoc',
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				data: this.basicInfo,
				succeed: (info) => {
					if(info.status === 'success') {
						console.log(JSON.stringify(info));
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 1000
						});
					} else {
						
					}
				}
			});
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
