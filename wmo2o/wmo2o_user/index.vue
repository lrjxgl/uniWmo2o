<template>
	<view class="body">
		<view v-if="pageLoad">

			<view class="main-body">
				<view class="uhead">

					<image @click="gourl('../../pages/user/user_head')" class="uhead-img" :src="user.user_head+'.100x100.jpg'"></image>

					<view class="uhead-box">
						<view class="uhead-nick mgb-5">{{user.nickname}}</view>
						<view class="flex">
							<view class="f14 mgr-5">余额</view>
							<view class="f14 cl-money">{{user.money}}</view>
						</view>


					</view>
					<navigator url="../../pages/user/set" class="flex-center btn-small btn-link iconfont icon-settings"></navigator>
				</view>
				<view class="order-box">
					<view class="order-box-hd">
						我的订单
						<view class="flex-1"></view>
						<view @click="gourl('../../wmo2o/wmo2o_order/my')" class="fr cor2 flex flex-center">全部订单
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="order-box-status flex">
						<view @click="gourl('../../wmo2o/wmo2o_order/my?type=unpay')" class="order-box-item">
							<text class="iconfont icon-moneybag cl-u"></text> 待付款</view>

						<view @click="gourl('../../wmo2o/wmo2o_order/my?type=unreceive')" class="order-box-item">
							<text class="iconfont icon-deliver cl-u"></text> 待收货</view>
						<view @click="gourl('../../wmo2o/wmo2o_order/my?type=unraty')" class="order-box-item">
							<text class="iconfont icon-comment cl-u"></text> 待评价</view>
					</view>
				</view>
				<view class="row-box">
					<view @click="gourl('../../pages/redpacket/index')" class="row-item none">
						<view class="row-item-icon cl-u icon-moneybag"></view>
						<view class="row-item-title">我的红包</view>
					</view>
					<view @click="gourl('../../wmo2o/wmo2o_coupon_user/index')" class="row-item">
						<view class="row-item-icon cl-u icon-ticket"></view>
						<view class="row-item-title">我的优惠券</view>
					</view>
					<view @click="gourl('../../pages/user_address/my')" class="row-item">
						<view class="row-item-icon cl-u icon-location_light"></view>
						<view class="row-item-title">收货地址</view>
					</view>
					<view @click="gourl('../../wmo2o/wmo2o_fav/index')" class="row-item">
						<view class="row-item-icon cl-u icon-favor_light"></view>
						<view class="row-item-title">我的收藏</view>
					</view>

					<view @click="gourl('../../pages/invite/my')" class="row-item">
						<view class="row-item-icon cl-u icon-present"></view>
						<view class="row-item-title">邀请有奖</view>
					</view>
					<view @click="gourl('../../pages/kefu/index')" class="row-item">
						<view class="row-item-icon cl-u icon-service_light"></view>
						<view class="row-item-title">客服中心</view>
					</view>
					<view @click="gourl('../../pages/html/aboutus')" class="row-item">
						<view class="row-item-icon cl-u icon-ask"></view>
						<view class="row-item-title">关于我们</view>
					</view>



				</view>
			</view>
		</view>
		<view v-else class="bg-fff pd-10">
			<view class="flex flex-center mgb-10 cl2">您还未登录,请先登录</view>
			<view class="flex flex-center">
				<navigator class="btn-small" url="../../pages/login/index">前往登录</navigator>
			</view>

		</view>
		<wmo2o-footer tab="user"></wmo2o-footer>
	</view>
</template>

<script>
	import wmo2oFooter from "../../components/wmo2ofooter.vue";
	var cacheKey="wmo2o_user/index";
	export default {
		components: {
			wmo2oFooter
		},
		data: function() {
			return {
				pageLoad: false,
				pageHide: false,
				pageData: {},
				user:{}
			}
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: "个人中心",
			})
			this.getCache();
			this.getPage();
		},
		onShow: function() {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function() {
			this.pageHide = true;
		},
		methods: {
			setCache:function(){
				var d={
					pageLoad:this.pageLoad,
					pageHide:this.pageHide,
					user:this.user,
					expire:Date.parse(new Date())/1000
				}
				uni.setStorageSync(cacheKey,d);
			},
			getCache:function(){
				var $cache=uni.getStorageSync(cacheKey);
				if($cache && Date.parse(new Date())/1000-$cache.expire<3600){
					this.user=$cache.user;
					this.pageLoad=$cache.pageLoad;
					this.pageHide=$cache.pageHide;
				}
			},
			goWeb: function(url) {
				uni.navigateTo({
					url: "../../pages/web/index?url=" + encodeURI(url)
				})
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url,
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_user&ajax=1",
					unLogin:true,
					success: function(res) {
						if (res.error == 1000) {
							/*
							uni.navigateTo({
								url: "../login/index",
							})
							*/
						} else {
							that.pageLoad = true;
							that.user=res.data.data;
							 
						}

						that.setCache();
					}
				})
			},
			loginOut: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index.php?m=login&a=logout&ajax=1",
					success: function(res) {
						that.app.loginOut();
						uni.showToast({
							title:"退出登录中..."
						})
						setTimeout(function(){
							that.app.goHome();	
						},1000)
					}
				})
			}
		},
	}
</script>

<style>
	.body {
		background-color: #e3e3e3;
	}

	.uhead {
		display: flex;
		flex-direction: row;
		padding: 22rpx;
		background-color: #fff;
		margin-bottom: 1px;
	}

	.uhead-img {
		width: 172rpx;
		height: 172rpx;
		margin-right: 22rpx;
		display: block;
		border-radius: 50%;
	}

	.uhead-box {
		flex: 1;
	}

	.uhead-nick {
		margin-bottom: 10rpx;
		font-size: 34rpx;
	}

	.uhead-rnum {
		color: #999;
		margin-bottom: 32rpx;
		line-height: 29rpx;
		display: flex;
		font-size: 29rpx;
	}

	.order-box {
		background-color: #fff;
		padding: 22rpx;
		margin-bottom: 22rpx;
	}

	.order-box-hd {
		display: flex;
		flex-direction: row;
		line-height: 79rpx;
		border-bottom: 1px solid #ddd;
		margin-bottom: 22rpx;
		font-size: 16px;
	}

	.order-box-status {
		display: flex;
		flex-direction: row;
	}

	.order-box-item {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #666;
	}

	.order-box-iconfont {
		font-family: iconfont;
		display: block;
		color: #666;
		font-size: 24px;
	}

	.cl-u,
	.cl-u:before {
		color: #ed6d53;
	}
</style>
