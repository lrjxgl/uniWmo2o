<template>
	<view v-if="pageLoad">
		 
		<view class="main-body pd-5 bg-fff">
			<d-userbox :user="pageData.author" :timeago="pageData.data.timeago"></d-userbox>
			<view class="d-title">{{pageData.data.title}}</view>
			 
			<view class="d-content">
				<image class="wmax mgb-5" mode="widthFix" v-for="(item,key) in pageData.imgslist" :key="key" :src="item"></image> 
			</view>
			<rich-text class="d-content mgb-10" :nodes="pageData.data.content">
				 
			</rich-text>

			<view class="flex flex-center mgb-10">
				<view class="btn-love  mgr-10" @click="loveToggle(pageData.data.id)" v-bind:class="pageData.islove?'btn-love-active':''">
					喜欢
				</view>
				 
				<view class="btn-fav mgr-10" @click="favToggle(pageData.data.id)" v-bind:class="pageData.isfav?'btn-fav-active':''">收藏</view>

			</view>
		</view>
		<view class="comment-hd">跟帖列表</view>
		<!--评论-->
		
		<cmform tablename="mod_wmo2o_blog" :objectid="pageData.data.id"></cmform>
		<navigator url="../wmo2o_blog/add" class="fixedAdd">发布</navigator>
	</view>
</template>

<script>
	import dUserbox from "../../components/d-userbox.vue";
	import cmform from "../../components/cmform.vue";
	 
	var id;
	export default {
		components: {
			dUserbox,
			cmform
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},
		onLoad: function (option) {
			id = option.id;
			this.getPage();
			this.addClick();
			
		},
		onShareAppMessage:function(){
			
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		methods: {
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
			addClick:function(){
				this.app.get({
					url: this.app.apiHost + "/module.php?fromapp=wxapp&m=wmo2o_blog&ajax=1&a=addclick&id=" + id,
					success: function (res) {
					}
				})
			},
			getPage: function () {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?fromapp=wxapp&m=wmo2o_blog&ajax=1&a=show&id=" + id,
		 
					success: function (res) {
						
						that.pageLoad = true;
						that.pageData = res.data;

					}
				})
			},
			favToggle:function(id){
				var that=this;
				this.app.get({
					url:that.app.apiHost+"/index.php?m=fav&a=toggle&ajax=1",
					data:{
						objectid:id,
						tablename:"mod_wmo2o_blog"  
					},
					success:function(res){
						if(res.error==1000){
							that.app.goLogin();
							return false;
						}
						if(res.data=='delete'){
							that.pageData.isfav=false;
						}else{
							that.pageData.isfav=true;
						}
						 
					}
				})
			},
			loveToggle:function(id){
				var that=this;
				this.app.get({
					url:that.app.apiHost+"?m=love&a=toggle&ajax=1",
					data:{
						objectid:id,
						tablename:"mod_wmo2o_blog"
					},
					success:function(res){
						if(res.error==1000){
							that.app.goLogin();
							return false;
						}
						if(res.data=='delete'){
							that.pageData.islove=false;
						}else{
							that.pageData.islove=true;
						}
						
					}
				})
			}
			
		},
	}
</script>

 
