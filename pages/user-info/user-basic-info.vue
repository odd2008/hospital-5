<template>
	<form>		
		<view>
			<view class="cu-form-group margin-top" @click="chooseImage">
				<view class="title">头像</view>
				<view @click.stop>
					<view class="cu-avatar round" @click="viewImage" :data-url="headPhoto" :style='"background-image:url(" + headPhoto + ")"'></view>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input v-model="basicInfo.name" name="input" placeholder="请输入姓名"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="genderChanged" :value="basicInfo.gender" :range="genders">
					<view class="picker">
						{{basicInfo.gender}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">出生日期</view>
				<picker mode="date" :value="basicInfo.birthday" :start="dateRange.start" :end="dateRange.end" @change="DateChange">
					<view class="picker">
						{{basicInfo.birthday}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">身高(cm)</view>
				<input v-model="basicInfo.height" name="input" type="digit" placeholder="请输入身高"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">体重(kg)</view>
				<input v-model="basicInfo.weight" name="input" type="digit" placeholder="请输入体重"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">职业</view>
				<input v-model="basicInfo.job" name="input" placeholder="请输入职业"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联系人</view>
				<input v-model="basicInfo.emergencyName" name="input" placeholder="请输入紧急联系人"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">紧急联系电话</view>
				<input v-model="basicInfo.emergencyLink" name="input" type="digit" placeholder="请输入紧急联系电话"></input>
			</view>
			<view class="cu-form-group align-start margin-top">
				<view class="title">家庭住址</view>
				<textarea maxlength="-1" :disabled="modalName!=null" :value="basicInfo.address" @input="addressInput" placeholder="请输入家庭住址"></textarea>
			</view>
			<view class="cu-form-group align-start margin-bottom">
				<view class="title">户籍所在地</view>
				<textarea maxlength="-1" :disabled="modalName!=null" :value="basicInfo.hometown" @input="hometownInput" placeholder="请输入户籍所在地"></textarea>
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
					name: '',
					gender: '请选择',
					birthday: '1996-12-01',
					height: 175,
					weight: 65,
					job: '',
					link: '',
					address: '',
					hometown: '',
					emergencyName: '',
					emergencyLink: ''
				},
				genders: ['男', '女'],
				dateRange: {
					start: '1900-01-01',
					end:  ''
				},
				CustomBar: this.CustomBar,
				loadProgress: 0,
				modalName: null,
				headPhoto: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
			}
		},
		onLoad() {
			this.LoadProgress();
			let currentDate = new Date();
			this.dateRange.end = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
			this.getUserInfo();
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
				this.basicInfo.gender = this.genders[e.detail.value];
				console.log(this.basicInfo.gender);
			},
			DateChange(e) {
				this.basicInfo.birthday = e.detail.value
				console.log(this.basicInfo.birthday);
			},
			addressInput(e) {
				this.basicInfo.address = e.detail.value
			},
			hometownInput(e) {
				this.basicInfo.hometown = e.detail.value
			},
			getUserInfo() {
				this.$requestWithToken({
					url: '/user/getUserInfo',
					succeed: (info) => {
						if(info.status === 'success') {
							console.log(JSON.stringify(info));
							if(info.data.name !== null) {
								this.login = true;
								this.basicInfo = info.data;
								if(info.data.headImageUrl !== null && info.data.headImageUrl.length !== 0){
									this.headPhoto = this.$constants.IMAGE_PUBLIC_PATH + info.data.headImageUrl;
								}
							} else {
								console.log('无信息');
							}
						} else {
							
						}
					}
				});
			},
			// 头像图片处理
			chooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.headPhoto = res.tempFilePaths[0];
						console.log(this.headPhoto);
						// 上传图片
						this.$uploadWithoutToken({
							url: '/user/uploadHeadImage',
							filePath: this.headPhoto,
							succeed: (info) => {
								console.log(JSON.stringify(info));
								console.log(this.$constants.IMAGE_PUBLIC_PATH + info.data);
							}
						});
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: [this.headPhoto],
					current: e.currentTarget.dataset.url
				});
			}
		},
		onNavigationBarButtonTap() {
			if(this.basicInfo.name.length === 0){
				uni.showToast({
					title: '姓名不可为空',
					icon: 'none',
					duration: 1000
				});
				return;
			}
			if(this.basicInfo.gender === '请选择'){
				uni.showToast({
					title: '性别未选择',
					icon: 'none',
					duration: 1000
				});
				return;
			}
			this.$requestWithToken({
				url: '/user/saveUserInfo',
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
