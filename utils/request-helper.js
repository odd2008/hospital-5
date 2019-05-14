import constants from './constants.js';

const AUTHORIZATION_KEY = constants.AUTHORIZATION_KEY;

let requestWithToken = (config) => {
	let method = 'POST';
	if(config.method) {
		method = config.method;
	}
	let data = {};
	if(config.data) {
		data = config.data;
	}
	let header = {};
	if(config.header) {
		header = config.header;
	}
	uni.getStorage({
		key: AUTHORIZATION_KEY,
		success: (res) => {
			header[AUTHORIZATION_KEY] = res.data;
			// console.log(JSON.stringify(header));
			// console.log(JSON.stringify(data));
			uni.request({
				url: constants.REMOTE_URL + config.url,
				method: method,
				header: header,
				dataType: 'json',
				data: data,
				success: (resultInfo) => {
					// console.log(JSON.stringify(resultInfo));
					if (resultInfo.statusCode === 200) {
						config.succeed(resultInfo.data);
					}
					if (resultInfo.statusCode === 401) {
						console.log('未登录');
						//需要登录，跳转到登录页
						uni.redirectTo({
							url: '/pages/login/login'
						});
					}
				},
				fail: (err) => {
					console.log(JSON.stringify(err));
					console.log('网络错误，请重试！');
				}
			});
		},
		fail: function(err) {
			console.log('授权码已清除，需要登录');
			//需要登录，跳转到登录页
			uni.redirectTo({
				url: '/pages/login/login'
			});
		}
	});
}

let requestWithoutToken = (config) => {
	let method = 'POST';
	if(config.method) {
		method = config.method;
	}
	let data = {};
	if(config.data) {
		data = config.data;
	}
	let header = {};
	if(config.header) {
		header = config.header;
	}
	console.log(method);
	console.log(constants.REMOTE_URL + config.url);
	uni.request({
		url: constants.REMOTE_URL + config.url,
		method: method,
		header: header,
		dataType: 'json',
		data: data,
		success: (resultInfo) => {
			console.log(JSON.stringify(resultInfo));
			if (resultInfo.statusCode === 200) {
				config.succeed(resultInfo.data);
			} else if (resultInfo.statusCode === 401) {
				console.log('未登录');
				//需要登录，跳转到登录页
				uni.redirectTo({
					url: '/pages/login/login'
				});
			} else {
				uni.showToast({
					title: resultInfo.error,
					icon: 'none',
					duration: 1000
				});
			}

		},
		fail: (err) => {
			console.log(JSON.stringify(err));
			uni.showToast({
				title: '网络错误，请重试！',
				icon: 'none',
				duration: 1000
			});
			console.log('网络错误，请重试！');
		}
	});
}

let uploadWithoutToken = (config) => {
	let data = {};
	if(config.data) {
		data = config.data;
	}
	let header = {};
	if(config.header) {
		header = config.header;
	}
	uni.getStorage({
		key: AUTHORIZATION_KEY,
		success: (res) => {
			header[AUTHORIZATION_KEY] = res.data;
			uni.uploadFile({
				url: constants.REMOTE_URL + config.url,
				filePath: config.filePath,
				header: header,
				name: 'file',
				formData: data,
				success: (resultInfo) => {
					console.log(JSON.stringify(resultInfo));
					if (resultInfo.statusCode === 200) {
						config.succeed(resultInfo.data);
					} else if (resultInfo.statusCode === 401) {
						console.log('未登录');
						//需要登录，跳转到登录页
						uni.redirectTo({
							url: '/pages/login/login'
						});
					} else {
						uni.showToast({
							title: '请求出错',
							icon: 'none',
							duration: 1000
						});
					}
				
				},
				fail: (err) => {
					console.log(JSON.stringify(err));
					uni.showToast({
						title: '网络错误，请重试！',
						icon: 'none',
						duration: 1000
					});
					console.log('网络错误，请重试！');
				}
			});
		},
		fail: function(err) {
			console.log('授权码已清除，需要登录');
			//需要登录，跳转到登录页
			uni.redirectTo({
				url: '/pages/login/login'
			});
		}
	});
}

module.exports = { requestWithToken, requestWithoutToken, uploadWithoutToken}
