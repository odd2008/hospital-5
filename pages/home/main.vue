<template>
	<div class="container">
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 天气信息
			</view>
		</view>
		<view class="margin-top" style="background-color: #fff;margin-bottom: 20upx;">
			<weather :weather="weather" v-if="weather.status === 'ok'"></weather>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-titles text-orange"></text> 名人名言
			</view>
		</view>
		<view class="cu-card case">
			<view class="cu-item shadow">
				<view class="image bg-grey">
					<view class="content" style="padding-top: 20upx;">
					  <text>一个人的身体，决不是个人的，要把它看作是社会的宝贵财富。凡是有志为社会出力，为国家成大事的青年，一定要十分珍视自己的身体健康。</text>
					</view>
					<view class="content-author">
					  <text class="gray">徐特立</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 更多列表 -->
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-discoverfill text-orange"></text> 推荐医师
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
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import weather from './weather'
export default {
	onLoad() {
		this.checkLogin();
	},
	mounted() {
		this.initPage()
	},
	components: {
		weather
	},
	computed: {
		...mapState('home', ['data']),
		...mapState('weather', ['weather']),
		content() {
			return this.data.hp_content.split('by')[0]
		}
	},
	data(){
		return {
			cardCur: 0,
			swiperList: [{
				id: 0,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
			}, {
				id: 1,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
			}, {
				id: 2,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
			}, {
				id: 3,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
			}, {
				id: 4,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
			}, {
				id: 5,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
			}, {
				id: 6,
				type: 'image',
				url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
			}],
			dotStyle: false,
			towerStart: 0,
			direction: '',
			recommendInfo: []
		}
	},
  methods: {
    ...mapActions('home', ['getNewIds', 'getHomeData']),
    async initPage() {
      await this.getNewIds()
      await this.getHomeData()
    },
	checkLogin() {
		this.$requestWithToken({
			url: '/user/test',
			succeed: (info) => {
				if(info.status === 'success') {
					console.log(JSON.stringify(info));
				} else {
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			}
		});
	},
	loadData() {
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
	}
  },
  onLoad() {
  	this.loadData();
  },
  onPullDownRefresh() {
  	console.log('refresh');
  	this.loadData();
  }
}
</script>

<style scoped>
	.container {
		font-size: 26rpx;
		text-align: center;
	}
  .cover {
    width: 100%;
  }
  .cover-author {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    margin-bottom: 30rpx;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    line-height: 58rpx;
    text-align: left;
  }
  .content-author {
    height: 100rpx;
    line-height: 100rpx;
    
  }
</style>
