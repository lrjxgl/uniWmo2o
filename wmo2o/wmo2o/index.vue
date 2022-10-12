<template>
	<view>
		<view v-if="!pageLoad">
			<page-loading></page-loading>
		</view>
		<view v-else>
			
			<view @click="goAddr()" class="flex flex-ai-center bg-white pd-5">
				<view class="iconfont  icon-location_light flex flex-ai-center"></view>
				<view>{{localAddress}}</view>
				<view class="iconfont icon-right f12 flex flex-ai-center"></view>
			</view>
			
			<view class="pd-5 bg-white">
				<view class="header-search-box">
					<view class="header-search-icon icon-search"></view>
					<input v-model="keyword" @click="search()" placeholder="汉堡王 满100减30 " type="search" class="header-search" />

				</view>
			</view>
			
			<view v-if="pageData.navList.length>0" class="m-navPic">

				<navigator v-for="(item,index) in pageData.navList" :key="index" :url="item.link1" class="m-navPic-item">
					<img mode="widthFix" class="m-navPic-img" :src="item.imgurl" />
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator>
			</view>
			<view v-if="pageData.adList.length>0" class="adBox">
				<navigator v-for="(item,index) in pageData.adList" :key="index" :url="item.link1" class="adBox-item">
					<img :src="item.imgurl" class="adBox-img" />
				</navigator>
			</view>
			<view class="row-box">
				<view @click="gourl('../../wmo2o/wmo2o_shoplist/youxuan')" class="flex mgb-5">
					<view class="flex-1 f18">为你优选</view>
					<view class="row-box-more">更多</view>
				</view>
				<scroll-view  scroll-x="true">
					<view class="flex">
					<view @click="goShop(item.shopid)" class="scItem" v-for="(item,index) in pageData.recShop" :key="index">
						<image mode="top" class="scItem-img" :src="item.imgurl"></image>
						<view class="scItem-title">{{item.shopname}}</view>
						<view class="scItem-desc">根据您的点餐爱好</view>
					</view>
					</view>
				</scroll-view>
			</view>
			
			<swiper style="height: 230rpx; margin-bottom:10px"   :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item  v-for="(item,key) in pageData.flashList" :key="key">
					<view class="swiper-item pd-10">
						<image @click="gourl(item.link1)" :src="item.imgurl" class="imgBorder" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
			<div class="bg-white pd-5 none">
			<swiper   :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in pageData.recShop" :key="key">
					<view class="swiper-item pd-5">
						<image @click="goShop(item.shopid)" :src="item.imgurl" class="imgBorder" mode="widthFix"></image>
					</view>
				</swiper-item>
			
			</swiper>
			 </div>
			<view class="hd-near">附近商家</view>
			<wmo2o-sortbox v-if="pageLoad" pstyle=""  @call-parent="sortParent"></wmo2o-sortbox>
			<shop-item hotvip="1" v-if="Object.keys(shopList).length>0" :shoplist="shopList"></shop-item>
			<view class="emptyData" v-else>暂无商家</view>
			
		</view>
		<wmo2o-footer tab="home"></wmo2o-footer>
	</view>
</template>

<script>
	import wmo2oFooter from "../../components/wmo2ofooter.vue";
	 
	import shopItem from "../../components/shop-item.vue";
	import wmo2oSortbox from "../../components/wmo2o-sortbox.vue";
	import {mapState,mapMutations} from 'vuex'
	export default {
		components: {
			wmo2oFooter,
			wmo2oSortbox, 
			shopItem
		},
		data() {
			return {
				localAddress:"厦门瑞景商业广场",
				pageData: {},
				keyword: "",
				pageLoad: false,
				shopList: {},
				isFirst:true,
				per_page:0,
				discount:"",
				price:"",
				choice:"",
				orderby:""
			}
		},
		onLoad: function(ops) {
			this.localAddress=this.app.getLocalAddress();
			this.getPage();
			this.getList();
			this.$store.commit("setScrollTop",0);
		},
		onPageScroll: function(e) {
			var that = this;
			this.$store.commit("setScrollTop",e.scrollTop);
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},
		onReachBottom:function(){
			this.getList();
		},
		methods: {
			sortParent:function(ops){
				this.discount=ops.discount;
				this.price=ops.price;
				this.choice=ops.choice;
				this.orderby=ops.orderby;
				this.per_page=0;
				this.isFirst=true;
				console.log(ops)
				this.getList();
			},
			goAddr:function(){
				uni.navigateTo({
					url:"../../wmo2o/wmo2o_addr/index"
				})
			},
			search: function() { 
				uni.navigateTo({
					url: "../../wmo2o/wmo2o_search/index?keyword=" + encodeURI(this.keyword)
				})
			},
			goShop: function(shopid) {
				uni.navigateTo({
					url: "../../wmo2o/wmo2o_shop/index?hotvip=1&shopid=" + shopid
				})
			},
			goProduct: function(id) {
				uni.navigateTo({
					url: "../../wmo2o/wmo2o_product/show?id=" + id
				})
			},
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			getPage: function() {
				var latlng=this.app.getGps();
				var that = this;
				that.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o&ajax=1",
					data:{
						lat:latlng.lat,
						lng:latlng.lng
					},
					success: function(res) {						
						that.pageData = res.data;
						that.pageLoad = true;
						
					}
				})
			},
			
			getList: function() {
				var that = this;
				var latlng=this.app.getGps();
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_shoplist&a=list&ajax=1",
					data: {
						discount:that.discount,
						price:that.price,
						choice:that.choice,
						orderby:that.orderby,
						lat:latlng.lat,
						lng:latlng.lng
					},
					dataType: "json",
					success: function(res) {
						 
						
						that.per_page=res.data.per_page;
						if(that.isFirst){
							that.isFirst=false;
							that.shopList = res.data.shopList;
						}else{
							var list=that.shopList;
							for(var i in res.data.shopList){
								list.push(res.data.shopList[i]);
							}
							that.shopList=list;
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../../common/shoplist.css");

	.hd-near {
		font-size: 16px;
		padding: 10px;
		background-color: #fff;
		font-weight: bolder;
	}
	.imgBorder{
		width:100%;
		border-radius:10px;
	}
	swiper {
		height: 440upx;
	}

	.mtt10 {
		margin-top: -22upx;
	}
	.scItem{
		width: 240rpx; 
		margin-right: 10rpx;
		overflow: hidden;
	}
	.scItem-img{
		width: 240rpx;
		height:160rpx;
		border-radius: 20rpx;
		margin-bottom: 3px;
	}
	.scItem-title{
		font-size: 12px;
		color: #333;
		white-space:nowrap;
		text-overflow:ellipsis;
		overflow: hidden;
		margin-bottom: 5px;
	}
	.scItem-desc{
		font-size: 12px;
		color: #666;
	}
	.sortNav-active {
		font-weight:bolder;
	} 
</style>
