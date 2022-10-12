<template>
	<view>
		<form v-if="pageLoad" id="orderForm" @submit="formSubmit">
			<view class="none">
				<input type="text" name="shopid" :value="shopid" />
			</view>
		<view class="row-box mgb-5">
			<view class="row-box-hd mgb-10">
				<view class="flex-1 f16">收货地址</view>
				<navigator class="row-box-more" url="../../pages/user_address/add">新增地址</navigator>
			</view>
			<input type="text" class="none" name="user_address_id" :value="pageData.user_address_id"  />
			<radio-group @change="changeAddr"> 
			<view class="bd-mp-10" v-for="(item,index) in pageData.addrList" :key="index">
				<div class="mgb-5 flex">
				<radio  :checked="item.id==pageData.user_address_id" :value="item.id+''"  ></radio>	 
				{{item.truename}} {{item.telephone}}
				</div>
				<div class="cl2">
					{{item.pct_address}}
				</div>
				
			</view>
			</radio-group> 
		</view>
		<view class="row-box mgb-5">
			<input class="none" type="hidden" name="shopid" :value="pageData.shop.shopid" />
			<view @click="goShop(pageData.shop.shopid)" class="flex  flex-ai-center">
				<img :src="pageData.shop.imgurl+'.100x100.jpg'" class="wh-40  bd-radius-50  mgr-5" />
				<view class="flex-1 f16">{{pageData.shop.shopname}}</view>
				<view>
				<navigator :url="'../wmo2o_guest/user?shopid='+pageData.shop.shopid" class="btn-round wh-40  btn-icon icon-service"></navigator>
				</view>
			</view>
		</view>
		<view class="row-box mgb-5">
			<view class="row-box-hd">
				产品列表
			</view>
			 
			<view class="flexlist-item" v-for="(item,index) in pageData.cartList" :key="index">
				<input type="text" class="none" :name="'cartid['+index+']'" :value="item.id" />
				<img :src="item.imgurl+'.100x100.jpg'" class="flexlist-img" />
				<view class="flex-1">
					<view class="flexlist-title">{{item.title}}</view>
					<view class="mgb-5 cl2">{{item.ks_title}}</view>
					<view class="flex">
						<view class="flex-1 cl-money">￥{{item.price}}</view>
						<view class="">* {{item.amount}}</view>
					</view>
				</view>
			</view>
			 
		</view>
		<view class="row-box mgb-5">
			<view class="flex flex-wrap flex-ai-center">
				<view>共{{pageData.total_num}}件商品，货价：￥ {{pageData.goods_money}}元 
				配送费：￥ {{pageData.express_money}} 元 </view>
				
			</view>
		</view>
		<view class="row-box mgb-5">
			<view class="row-box-hd mgb-5">优惠券</view>
			<view class="radioList-group">
				<input type="text" class="radioList-value none" name="coupon_id" :value="coupon_id" />
				<block v-for="(item,index) in pageData.couponList" :key="index">
				<view :class="{'radioList-item-active':coupon_id==item.id}" class="radioList-item" @click="setCoupon(item)" >{{item.title}}</view>
				</block>	
				 
			</view>
			
		</view>
		<!-- #ifdef H5 -->
		<view class="row-box mgb-5">
			<view class="row-box-hd mgb-10">支付方式</view>		
			<view class="paylist">
				<input type="text" class="none" name="paytype" id="paytype" :value="pageData.paytype">
				<view @click="changePaytype(index)" class="paylist-item" v-bind:class="{'paylist-item-active':index==paytype}" v-for="(item,index) in pageData.paytypeList" :key="index" >{{item}}</view>
				 	
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view class="row-box mgb-5">
			<view class="row-box-hd mgb-10">支付方式</view>		
		
			<view class="paylist flex-center">
				<view @click="changePaytype('alipay')" class="paylist-item" :class="{'paylist-item-active':paytype=='alipay'}">支付宝</view>
				<view @click="changePaytype('wxpay')"  class="paylist-item" :class="{'paylist-item-active':paytype=='wxpay'}">微信</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<input type="text" class="none" name="paytype" id="paytype" value="wxapp_pay">
		<!-- #endif -->
		
		<view class="row-box">
			<div class="flex mgb-5 ">
				<textarea name="comment" class="textarea-flex-text flex-1 h60" placeholder="请输入订单备注"></textarea>
			</div>
			
			<view class="flex flex-center">
				<div class="market-price">总价：￥{{total_money}}</div>
				<div class="flex-1"></div>
				<div class=" cl-money">支付金额：￥{{payMoney}}</div>
			</view>
			<button form-type="submit" class="btn-row-submit" >确认购买</button>
		</view>
		</form>
	</view>
</template>

<script>
	import dtPay from "../../common/dtpay.js";
	 
	export default{
		data:function(){
			return {
				pageLoad:false,
				pageData:[],
				user_address_id:0,
				coupon_id:0,
				shopid:0,
				cartid:0,
				pageHide:false,
				paytype:"alipay",
				payMoney:0,
				total_money:0
			}			
		},
		onLoad:function(ops){
			console.log(ops);
			this.cartid=ops.cartid;
			this.shopid=ops.shopid;
			this.getPage();
			
		},
		onHide:function(){
			this.pageHide=true;
		},
		onShow:function(){
			if(this.pageHide){
				this.pageHide=false;
				this.getPage();
			}
			 
		},
		methods:{
			goShop:function(shopid){
				uni.navigateTo({
					url:"../wmo2o_shop/index?shopid="+shopid
				})
			},
			changeAddr:function(e){				
				this.pageData.user_address_id=e.detail.value;
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_order&a=confirm&ajax=1",
					data:{						
						shopid:that.shopid,
						user_address_id:this.pageData.user_address_id
					},
					success:function(res){						 
						that.pageData=res.data;
					}
				}) 
			},
			changePaytype:function(paytype){
				this.paytype=paytype;
			},
			setCoupon:function(item){
				this.coupon_id=item.id;
				this.payMoney=this.total_money-item.money;
				console.log(this.payMoney)
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_order&a=confirm&ajax=1",
					data:{
						shopid:this.shopid, 
						cartid:that.cartid
					},
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message
							})
							uni.navigateBack();
							return false;
						}else{
							that.paytype=res.data.paytype;
							that.pageLoad=true;
							that.total_money=res.data.total_money;
							that.payMoney=res.data.total_money;
							that.pageData=res.data;
						}
						
					}
				})
			},
			formSubmit:function(e){
 				
				var that=this;
				e.detail.value.backurl=that.app.appRoot+"#/pages/wmo2o_order/success";
				that.app.post({
					url:that.app.apiHost+"/module.php?m=wmo2o_order&a=order&ajax=1",
					data:e.detail.value,
					 
					success:function(res){
					 
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						
						if(res.data.action=='pay'){
							dtPay.paytype=that.paytype;
							dtPay.urlFail="../wmo2o_order/fail";
							dtPay.urlSuccess="../wmo2o_order/success";
							dtPay.pay({
								payurl:res.data.payurl,
								orderno:res.data.orderno
							});						
						}
					}	
				})
			}
		}
	}
</script>

<style>
</style>
