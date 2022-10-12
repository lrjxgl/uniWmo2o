<template>
	<view>
		<view class="main-body" v-if="pageLoad">
			<view class="row-box mgb-5">
				<input class="none" type="hidden" name="shopid" :value="pageData.shop.shopid" />
				<view @click="goShop(pageData.shop.shopid)" class="flex pointer  flex-ai-center">
					<img :src="pageData.shop.imgurl+'.100x100.jpg'" class="wh-40 bd-radius-50 mgr-5" />
					<view class="flex-1 f16">{{pageData.shop.shopname}}</view>
					 
				</view>
			</view>
			<view class="flex bg-fff pd-10 mgb-5">
				<view class="flex-1 cl2">单号：{{pageData.order.orderno}}</view>
				<view class="cl-primary">{{pageData.order.status_name}}</view>
			</view>
			<view class="flexlist">

				<view v-for="(item,index) in pageData.prolist" :key="index" class="flexlist-item mgb-0">

					<view class="flexlist-imgbox">
						<image :src="item.imgurl+'.100x100.jpg'" class="flexlist-img"></image>
					</view>

					<view class="flex-1">
						<view class="flexlist-title">{{item.title}}</view>
						<view class="flex">
							<view class="cl2 mgr-10">{{item.ks_title}}</view>
							<view class="cl-num mgr-10">￥{{item.price}} </view>
							<view class="flex-1"></view>
							<view class="cl2">x {{item.amount}}</view>
						</view>
					</view>
				</view>


			</view>
			<view class="row-box mgb-5">
				<view class="flex mgb-5">
					<span class="cl3 f12">共</span>
					<view class="cl-num f12">{{pageData.order.total_num}}</view> 
					<span class="cl3 f12">件商品， 合计</span>
					<view class="cl-num f12">￥{{pageData.order.goods_money}}</view>
				</view>
				<view class="flex mgb-5">					
					<span class="cl3 f12">配送费</span>					
					<view class="cl-num f12">￥{{pageData.order.express_money}}</view>
					<div class="flex-1"></div>
					 
					<span class="cl3 f12">优惠金额</span>
					<view class="cl-num f12">-￥{{pageData.order.coupon_money}}元</view>
				</view>
				
				<view class="flex mgb-10">
					<span class="cl3 f12">实际支付金额</span>
					<view class="cl-num f12">￥{{pageData.order.money}}元</view>
				</view>
				
				<view class="f14 mgb-5">备注</view>
				<view class="bg-light pd-10 cl3 bd-radius-10">
					{{pageData.order.comment}}
				</view>
			</view>

			<view class="row-box pdt-0 mgb-5">

				<view class="flex-table">
					<view class="flex-table-label">联系人：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.truename}}
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">手机：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.telephone}}
					</view>
				</view>
				<view class="flex-table">
					<view class="flex-table-label">收货地址：</view>
					<view class="flex-table-box text-right">
						{{pageData.addr.address}}
					</view>
				</view>
			</view>

			

			<view class="row-box pdt-0" v-if="pageData.order.status==0">
				<view class="row-box flex flex-center">
					<view @click="goGuest(pageData.order.shopid)" class="btn btn-outline-primary ">联系客服</view>
					<view class="btn btn-outline-dark mgl-20" @click="cancel">取消订单</view>

					<view v-if="pageData.order.ispay==0" @click="pay" class="btn-small btn-outline-success mgl-20">去支付</view>

				</view>
			</view>

			<view class="row-box pdt-0" v-if="pageData.order.status==1">
				<view class="row-box flex flex-center">
					<view @click="goGuest(pageData.order.shopid)" class="btn btn-outline-primary ">联系客服</view>
				</view>
			</view>

			<view class="row-box pdt-0" v-if="pageData.order.status==2">
				<view class="row-box flex flex-center">
					<view @click="goGuest(pageData.order.shopid)" class="btn btn-outline-primary mgr-5">联系客服</view>
					<view class="btn btn-outline-primary mgr-5">查看物流</view>
					<view class="btn btn-outline-primary " @click="receive">确认收货</view>
				</view>
			</view>

			<view class="row-box pdt-0" v-if="pageData.order.status==3">
				<view class="row-box flex flex-center">
					<view @click="goGuest(pageData.order.shopid)" class="btn btn-outline-primary mgr-5">联系客服</view>

					<view class="btn btn-outline-primary " @click="goRaty()" v-if="pageData.order.israty==0">去评价</view>

				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data: function() {
			return {
				pageLoad: false,
				pageData: {},
				orderid: 0,
			}
		},
		onLoad: function(ops) {
			uni.setNavigationBarTitle({
				title: "订单详情"
			})
			this.orderid = ops.orderid;
			this.getPage();
		},
		methods: {
			goShop:function(shopid){
				uni.navigateTo({
					url:"../wmo2o_shop/index?shopid="+shopid
				})
			},
			goGuest: function(shopid) {
				uni.navigateTo({
					url: "../wmo2o_guest/user?shopid=" + shopid
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_order&a=show&ajax=1&orderid=" + this.orderid,
				 
					success: function(res) {

						that.pageData = res.data;
						that.pageLoad = true;
					}
				})
			},
			cancel: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_order&a=cancel&ajax=1&orderid=" + this.orderid,

					success: function(rs) {
						that.getPage();
					}
				})
			},
			receive: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_order&a=receive&ajax=1&orderid=" + this.orderid,
	
					success: function(rs) {
						that.getPage();
					}
				})
			},
			goRaty: function() {
				uni.navigateTo({
					url: "../wmo2o_order/raty?orderid=" + this.orderid
				})
			},
			pay: function() {
				uni.navigateTo({
					url: "../wmo2o_order/pay?orderid=" + this.orderid
				})
			}
		}
	}
</script>

<style>
</style>
