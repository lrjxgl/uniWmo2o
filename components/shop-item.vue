<template>
	<view >
		<view @click="goShop(item.shopid)" v-for="(item,index) in shoplist" :key="index" class="shopItem">
			<image :src="item.imgurl+'.100x100.jpg'" mode="widthFix" class="shopItem-img"></image>
			<view class="flex-1">
				<view class="shopItem-title">{{item.title}}</view>
				<view class="flex mgb-5">
					
					<view class="shopItem-ratybox"><sky-raty label="" class="scalem2" len="5" mod="2" readonly="1" :grade="item.raty_grade"></sky-raty></view>
					<view class="f12 cl2 mgr-5">月售</view>
					<div class="f12 cl2">{{item.month_buy_num}}</div>
					<view class="flex-1"></view>
					<view class="mgr-10 cl2 f12">{{item.distance}}</view>
					<view class="f12cl2 ">{{item.sendtime}}</view>
				</view>
				<view class="flex flex-ai-center mgb-5">
					<view class="f12 cl2 mgr-10">起送 ￥{{item.send_startprice}}</view>
					<view class="f12 cl2 mgr-10">配送￥{{item.express_money}}</view>
					<view class="f12 cl2">人均￥{{item.avg_price}}</view>
					<view class="flex-1"></view>
					<!--<view class="shopItem-zsbtn">专送</view>-->
				</view>
				
				<view v-if="item.coupons" class="flex mgb-5 flex-ai-center">
					<view v-for="(cc,cckey) in item.coupons" :key="cckey" class="shopItem-mbtn">{{cc.title}}</view>
					 
				</view>
				<div class="flex" >
					<image v-for="(p,pi) in item.prolist" :key="pi" mode="widthFix" :src="p.imgurl+'.100x100.jpg'" class="wh-60 mgb-5" ></image>
					 
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import skyRaty from "./skyraty.vue";
	export default{
		components:{
			skyRaty
		},
		props:{
			shoplist:{},
			hotvip:0
		},
		data:function(){
			return {
				list:{}
			}
		},
		created:function(){
			 
		},
		methods:{
			goShop:function(shopid){
				uni.navigateTo({
					url:"../../wmo2o/wmo2o_shop/index?hotvip="+this.hotvip+"&shopid="+shopid
				})
			}
		}
	}
</script>

<style>
	.mgr-3{
		margin-right: 3px;
	}
	.shopItem{
		display: flex;
		flex-direction: row;
		margin-bottom: 5px;
		background-color: #fff;
		padding: 10px;
	}
	.shopItem-img{
		width: 70px;
		height: 70px;
		margin-right: 10px;
		border-radius: 50%;
	}
	.shopItem-title{
		font-size: 32rpx;
		margin-bottom: 5px;
	}
	.shopItem-ratybox{
		width: 200rpx; 
		margin-bottom: -4px;
	}
	.shopItem-zsbtn{
		background-color: #fdd060;
		color: #666;
		font-size: 12px;
		padding: 3px 6px;
		border-radius: 5px;
	}
	.shopItem-mbtn{
		border:1px solid #fc9993;
		padding: 2px 3px;
		border-radius: 5px;
		font-size: 12px;
		transform: scale(0.8,0.8);
		transform-origin: 0 0px;
		box-sizing: border-box;
		margin-right: 5px;
		color: #fc9993;
	}
	.scalem2{
		transform: scale(0.7);
		transform-origin: 0 12px;
		position: relative;
		top: -4px;

	}
</style>
