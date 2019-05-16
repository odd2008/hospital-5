<template>
	<view class="content">
		<view class="header">
			<image src="../../static/shilu-login/logo.png"></image>
		</view>
		
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/mail.png"></image>
				<input class="biaoti" v-model="mail" type="text" maxlength="30" placeholder="邮箱" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="biaoti" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin">
			<text>注册</text>
		</view>
		
		<view class="xieyi">
			<image @tap="xieyitong" :src="xieyi==true?'/static/shilu-login/ty1.png':'/static/shilu-login/ty0.png'"></image>
			<text @tap="xieyitong"> 同意</text>
			<navigator url="/pages/user-info/user-secret" open-type="navigate">《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	var tha,js;
	export default {
		onLoad(){
			tha = this;
			
		},
		onUnload(){
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phoneno:'',
				password:'',
				code: '',
				mail: '',
				xieyi: true,
				showPassword:false,
				second: 0,
				CustomBar: this.CustomBar,
				modalName: false,
				modalContent: ''
			};
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					if(this.second<10){
						return '重新获取0'+this.second;
					}else{
						return '重新获取'+this.second;
					}
				}
			}
		},
		methods: {
			display() {
			    this.showPassword = !this.showPassword
			},
			xieyitong(){
				this.xieyi = !this.xieyi;
			},
			getcode(){
				if(this.second>0){
					return;
				}
				console.log(this.mail);
				let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //正则表达式
				if(this.mail === "") { //输入不能为空
					uni.showToast({
						title: '邮箱不得为空',
						icon: 'none',
						duration: 1000
					});
				　　return;
				} else if (!reg.test(this.mail)) { //正则验证不通过，格式不对
					uni.showToast({
						title: '邮箱格式不正确',
						icon: 'none',
						duration: 1000
					});
				　　return;
				}
				this.second = 60;
				
				this.$requestWithoutToken({
					url: '/noToken/getMailCode',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						mail: this.mail,
						code_type: this.code_type
					},
					succeed: (info) => {
						console.log(JSON.stringify(info));
						if(info.status === 'success'){
							uni.showToast({
								title: info.data,
								icon:'none',
								duration: 2000
							});
							js = setInterval(function(){
								tha.second--;
								if(tha.second==0){
									clearInterval(js)
								}
							}, 1000)
						} else {
							uni.showToast({
								title: info.errMsg,
								icon:'none',
								duration: 2000
							});
						}
					}
				});
			},
		    bindLogin() {
				if (this.xieyi == false) {
				    uni.showToast({
				        icon: 'none',
				        title: '请先阅读《软件用户协议》'
				    });
				    return;
				}
				if (this.phoneno.length !=11) {
				    uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}
		        if (this.password.length < 6) {
		            uni.showToast({
		                icon: 'none',
		                title: '密码不正确'
		            });
		            return;
		        }
				let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //正则表达式
			　　if(this.mail === ""){ //输入不能为空
			　　　　 uni.showToast({
						title: '邮箱不得为空',
						icon: 'none',
						duration: 1000
					});
			　　　　return;
			　　 } else if (!reg.test(this.mail)) { //正则验证不通过，格式不对
					uni.showToast({
						title: '邮箱格式不正确',
						icon: 'none',
						duration: 1000
					});
			　　　　return;
			　　}
				if (this.code.length != 6) {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不正确'
				    });
				    return;
				}
				this.$requestWithoutToken({
					url: '/noToken/register',
					header:{
						'Content-Type':'application/x-www-form-urlencoded'
					},
					data: {
						telephone: this.phoneno,
						password: this.password,
						mail: this.mail,
						code:this.code,
						code_type: this.code_type
					},
					succeed: (info) => {
						console.log(JSON.stringify(info));
						if(info.status === 'success'){
							//登录成功
							uni.showToast({
								title: '注册成功！',
								duration: 1000
							});
							//跳转到主页
							uni.reLaunch({
								url: 'login'
							});
						} else {
							uni.showToast({
								title: info.errMsg,
								icon:'none',
								duration: 2000
							});
						}
					}
				});
				uni.request({
				    url: 'http://***/reg.html',
				    data: {
						phoneno:this.phoneno,
						password:this.password,
						code:this.code,
						invitation:this.invitation
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({title:res.data.msg});
							setTimeout(function(){
								uni.navigateBack();
							},1500) 
						}
				    }
				});
				
		    }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	.header {
		width:161upx;
		height:161upx;
		background:rgba(63,205,235,1);
		box-shadow:0upx 12upx 13upx 0upx rgba(63,205,235,0.47);
		border-radius:50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40upx;
		height: 40upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}
	.yzm {
		color: #FF7D13;
		font-size: 24upx;
		line-height: 64upx;
		padding-left: 10upx;
		padding-right: 10upx;
		width:auto;
		height:64upx;
		border:1upx solid #FFA800;
		border-radius: 50upx;
	}
	.yzms {
		color: #999999 !important;
		border:1upx solid #999999;
	}
	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width:470upx;
		height:100upx;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		border-radius:50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
	}
	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.xieyi image{
		width: 40upx;
		height: 40upx;
	}
</style>
