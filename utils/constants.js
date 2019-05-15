const remoteUrls = {
	PRODUCT_BASE_URL: 'http://111.230.253.60:8080/healthcare',
	DEVELOP_BASE_URL: 'http://192.168.43.135:8089'
};
const currentBaseUrl = remoteUrls.DEVELOP_BASE_URL;
const constants = {
	AUTHORIZATION_KEY: 'HOSPITAL_AUTHORIZATION',
	REMOTE_URL: currentBaseUrl,
	IMAGE_PUBLIC_PATH: `${currentBaseUrl}/static`  // 图片公共路径
};

module.exports = constants