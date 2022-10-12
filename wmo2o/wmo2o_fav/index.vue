<template>
	<view v-if="pageLoad">
		<view class="tabs-border">
			<view @click="setTable('mod_wmo2o_shop')" :class="tablename=='mod_wmo2o_shop'?' tabs-border-active':''" class="tabs-border-item">店铺</view>
			<view @click="setTable('mod_wmo2o_product')" :class="tablename=='mod_wmo2o_product'?' tabs-border-active':''"  class="tabs-border-item">产品</view>
			 
		</view>
		<view v-if="list.length==0">
			<view class="emptyData">暂无收藏</view>
		</view>
		<view v-else>
			<view v-for="(item,key) in list" :key="key">
				<view v-if="tablename=='mod_wmo2o_product'">
					<view @click="goProduct(item.id,item.shopid)" class="row-item bg-fff">
						<view class="flex-1">
						<view class="cl1 f18">{{item.title}}</view> 
						<view class="cl2">{{item.description}}</view>
						</view>
					</view> 
				</view>	
				 
				<view v-else-if="tablename=='mod_wmo2o_shop'">
					<view @click="goShop(item.shopid)" class="row-item bg-fff">
						<view class="flex-1">
						<view class="cl1 f18">{{item.shopname}}</view> 
						 
						</view>
					</view>
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
				list: [],
				isFirst:true,
				per_page:0,
				tablename: "mod_wmo2o_shop"
			}
		},
		onLoad: function(option) {

			uni.setNavigationBarTitle({
				title: '我的收藏'
			});
			this.getPage();
		},
		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.refresh();
		},
		methods: {
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/index.php?m=fav&a=mylist&ajax=1",
					data: {
						tablename: that.tablename
					},
					success: function(res) {
						that.isFirst = false;
						that.per_page=res.data.per_page;
						that.list =res.data.list;
						that.pageLoad = true;
					}
				})
			},

			getList: function() {
				var that = this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				that.app.get({
					url: that.app.apiHost + "/index.php?m=fav&a=mylist&ajax=1",
					data: {
						tablename: that.tablename,
						per_page:that.per_page
					},
					success: function(res) {						
						that.per_page=res.data.per_page;
						if(that.isFirst){
							that.isFirst = false;
							that.list =res.data.list;
						}else{
							for(var i in res.data.list){
								that.list.push(res.data.list[i])
							}
						}						
						that.pageLoad = true;
					}
				})
			},
			 
			goProduct: function(id,shopid) {
				uni.navigateTo({
					url: "../wmo2o_product/show?id=" + id+"&shopid="+shopid
				})
			},
			goShop: function(shopid) {
				uni.navigateTo({
					url: "../wmo2o_shop/index?shopid=" + shopid
				})
			},
			refresh: function() {
				this.getPage();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function() {
				this.getList();
			},
			setTable:function(tablename){
				var that=this;
				this.tablename=tablename;
				that.isFirst=true;
				that.per_page=0;
				this.getList();
			}
		},
	}
</script>

<style>


</style>
