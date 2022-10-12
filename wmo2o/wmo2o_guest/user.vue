<template>
	<view>
		<view v-if="pageLoad" class="list" id="app">
			 
			<view v-for="(item,index) in pageData.list" :key="index" class="bg-white pd-10">
				 
				<view class="flex" v-if="item.author=='user'">
					<img :src="item.user_head+'.100x100.jpg'" class="wh-40 mgr-10" />
					
					<view class="flex-1">
						<view class="flex mgb-5">
							<view class="cl2 flex-1">{{item.nickname}}</view>
							<view class="cl3 f12">{{item.timeago}}</view>
						</view>
						<view class="cl3">{{item.content}}</view>
					</view>
				</view>
				<view class="flex" v-else>
				<view class="flex-1"></view>
				<view class="w200">
					
					<view class="cl2 mgb-5 flex">
						<view class="flex-1"></view>
						{{pageData.shop.shopname}}
					</view>
					<view class="cl3">{{item.content}}</view>
				</view>
			 
				<img :src="pageData.shop.imgurl+'.100x100.jpg'" class="wh-40 mgl-10" />
				</view>
			</view>
			 
		</view>
		<view class="footer-row"></view>
		<view style="position: fixed;bottom: 0;left: 0;right: 0;">
			<view class="input-flex">
				<input type="text" v-model="content"  class="input-flex-text" />
				<view class="input-flex-btn" @click="submit">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	var id=0;
	var shopid;
	export default({
		 
		data:function(){
			return {
				pageLoad:false,
				pageData:[],
				content:""
			}
		},
		onLoad:function(ops){
			this.shopid=ops.shopid;
			this.id=ops.id;
			this.getPage();
		},
		methods:{
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_guest&a=wmo2o&ajax=1",
					data:{
						shopid:shopid,
						id:id
					},
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data
						console.log(res.data);
					}
				})
			},
			submit:function(){
				var that=this;
				if(that.content==''){
					return false;
				}
				this.app.post({
					url:this.app.apiHost+"/module.php?m=wmo2o_guest&a=save&ajax=1",
					data:{
						content:that.content,
						shopid:shopid,
						id:id
					},
					success:function(res){
						if(res.error){
							uni.showToast({
								title:res.message
							})
							return false;
						}
						that.content="";
						that.getPage();
					}
				})
			}
		}
	})
</script>

<style>
</style>
