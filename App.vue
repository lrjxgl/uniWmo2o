<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			/*
			// 锁定屏幕方向
			setTimeout(function(){
				plus.screen.lockOrientation('portrait-primary'); //锁定
				console.log(plus.runtime.version);
				// 检测升级
				uni.request({
					url: 'https://www.fd175.com/index.php?m=app&a=checkupdate', //检查更新的服务器地址
					data: {
						appid: plus.runtime.appid,
						version: plus.runtime.version,
						imei: plus.device.imei
					},
					success: (res) => {
						console.log('success', res);
						if (res.statusCode == 200 && res.data.isUpdate) {
							let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
							// 提醒用户更新
							uni.showModal({
								title: '更新提示',
								content: res.data.note ? res.data.note : '是否选择更新',
								success: (showResult) => {
									if (showResult.confirm) {
										plus.runtime.openURL(openUrl);
									}
								}
							})
						}
					}
				})
				//推送
				uni.getProvider({
				service: 'push',
				success: function (res) {
					uni.onPush({
						provider: 'igexin',
						success: function () {
							console.log('监听透传成功');
						},
						callback: function (data) {
							uni.showToast({
								title: "接收到透传数据：" + JSON.stringify(data)
							});
							 
						}
					});
				}
			});
			},300)
			*/
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		watch: {
			'$route'(to, from) {

				const toDepth = to.path.split('/').length
				const fromDepth = from.path.split('/').length


			}
		}
	}
</script>

<style>
	@import "./common/iconfont.css";
	@import "./common/dt-ui-uni.css";
	.header-search-icon{
		left: 10px;
	}
	.header-search{
		border-radius: 10px;
		background-color: #f0f1f2;
	} 

	.input-flex-btn {
		z-index: 2;
	}

	.header,
	.header-row {
		display: none;
	}
  

	.m-navPic-item {
		width: 20%;
		padding: 0px;
	}

	.m-navPic-img {
		width: 70%;
		height: auto;
		border-radius: 50%;
	}
	.m-navPic-title{
		font-size: 30rpx;
		font-family: "PingFangSC-Regular", Hiragino Sans GB, Arial, Helvetica, "\5B8B\4F53", sans-serif;
	}
	.fixedAdd {
		position: fixed;
		bottom: 200upx;
		right: 7upx;
		width: 92upx;
		height: 92upx;
		text-align: center;
		box-sizing: border-box;
		background-color: rgba(240, 85, 75, .82);
		color: #fff;
		font-family: iconfont;
		font-size: 32upx;
		padding-top: 11upx;
		border-radius: 22upx;

	}

	.fixedAdd:before {
		content: "\e7e8";
		display: block;
		font-size: 32upx;
	}
</style>
