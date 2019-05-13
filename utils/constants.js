const remoteUrl = {
	PRODUCT_BASE_URL: 'http://111.230.253.60:8080/healthcare',
	DEVELOP_BASE_URL: 'http://192.168.43.135:8089'
};

const constants = {
	AUTHORIZATION_KEY: 'HOSPITAL_AUTHORIZATION',
	REMOTE_URL: remoteUrl.DEVELOP_BASE_URL,
	IMAGE_PUBLIC_PATH: `${remoteUrl.DEVELOP_BASE_URL}/static`  // 图片公共路径
};

module.exports = constants