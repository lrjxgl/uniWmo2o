<template>
	<view>
		<view class="main-body" >
			<view style="height: 44px;"></view>
			<wmo2o-sortbox  pfixed="true" pstyle="" @call-parent="sortParent"></wmo2o-sortbox>
			<shop-item :shoplist="shopList"></shop-item>
		</view>
	</view>
</template>

<script>
	import shopItem from "../../components/shop-item.vue";
	import wmo2oSortbox from "../../components/wmo2o-sortbox.vue";
	import {mapState,mapMutations} from 'vuex'
	export default({
		components:{
			wmo2oSortbox, 
			shopItem
		},
		data:function(){
			return {
				pageLoad:false,
				pageData:{},
				catid:0,
				shopList: {},
				isFirst:true,
				per_page:0,
				discount:"",
				price:"",
				choice:"",
				orderby:"",
			}
		},
		onLoad:function(ops){
			this.catid=ops.catid;
			this.getPage();
			
		},
		onPageScroll: function(e) {
			var that = this;
			this.$store.commit("setScrollTop",e.scrollTop);
		},
		methods:{
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
			goShop: function(shopid) {
				uni.navigateTo({
					url: "../../wmo2o/wmo2o_shop/index?shopid=" + shopid
				})
			},
			
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			getPage:function(){
				var that=this;
				var latlng=this.app.getGps();
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_shoplist&a=list&ajax=1",
					data:{
						catid:that.catid,
						lat:latlng.lat,
						lng:latlng.lng
					},
					dataType:"json",
					success:function(res){
						if(res.data.cat){
							uni.setNavigationBarTitle({
								title:res.data.cat.title
							}) 
						}
						
						that.shopList=res.data.shopList;
						that.pageData=res.data;
						that.pageLoad=true;
						
					}
				})
			},
			
			getList:function(){
				var that=this;
				if(that.per_page==0 && !that.isFirst){
					return false;
				}
				var latlng=this.app.getGps();
				
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_shoplist&a=list&ajax=1",
					data:{
						catid:that.catid,
						lat:latlng.lat,
						lng:latlng.lng,
						discount:that.discount,
						price:that.price,
						choice:that.choice,
						orderby:that.orderby,
					},
					dataType:"json",
					success:function(res){
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
	});
</script>

<style>
	@import url("../../common/shoplist.css");
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
