<template>
	<view>
		<view class="footer-row"></view>
		<view class="footer">
			<view @click="goHome()" :class="{'footer-active':tab=='home'}" class="footer-item icon-home">
				首页
			</view>
			<view @click="goBlog()" :class="{'footer-active':tab=='blog'}" class="footer-item icon-news">美食圈</view>
			<view @click="goOrder()" :class="{'footer-active':tab=='order'}" class="footer-item icon-order">订单</view>
			<view @click="goUser()" :class="{'footer-active':tab=='user'}" class="footer-item icon-my_light">我的</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tab:''
		},
		data:function(){
			return {
				list:""
			}
		}, 
		methods:{
			goHome:function(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			goOrder:function(){
				uni.reLaunch({
					url:"/wmo2o/wmo2o_order/my"
				})
			},
			goBlog:function(){
				uni.reLaunch({
					url:"/wmo2o/wmo2o_blog/index"
				})
			},
			goUser:function(){
				uni.reLaunch({
					url:"/wmo2o/wmo2o_user/index"
				})
			},
		}
	}
</script>

<style>
</style>
