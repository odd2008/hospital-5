const PRODUCT_BASE_URL = 'http://111.230.253.60:8080/healthcare';
const DEVELOP_BASE_URL = 'http://192.168.43.135:8089';
const AUTHORIZATION_KEY = 'HOSPITAL_AUTHORIZATION';

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
	console.log(method);
	uni.getStorage({
		key: AUTHORIZATION_KEY,
		success: (res) => {
			header.Authorization = res.data;
			console.log(JSON.stringify(header));
			console.log(JSON.stringify(data));
			uni.request({
				url: PRODUCT_BASE_URL + config.url,
				method: method,
				header: header,
				dataType: 'json',
				data: data,
				success: (resultInfo) => {
					console.log(JSON.stringify(resultInfo));
					if (resultInfo.statusCode === 200) {
						config.succeed(resultInfo.data);
					}
					if (resultInfo.statusCode === 401) {
						console.log('未登录');
						//需要登录，跳转到登录页
						uni.redirectTo({
							url: '../pages/login/login'
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
				url: 'login'
			});
		}
	});
}

module.exports = requestWithToken
