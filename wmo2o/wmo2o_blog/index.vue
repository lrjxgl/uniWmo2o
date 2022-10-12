<template>
	<view>
		<view class="main-body" id="app">
			<view class="tabs-border mgb-5">
				<view @click="setType('')" :class="{'tabs-border-active':type==''}" class="tabs-border-item">推荐</view>
				<view @click="setType('hot')" :class="{'tabs-border-active':type=='hot'}" class="tabs-border-item">最热</view>
				<view @click="setType('new')" :class="{'tabs-border-active':type=='new'}" class="tabs-border-item">最新</view>
				
			</view>
			<view style="display: none;" :class="'flex-col'" class="sglist">
				 
				<view v-for="(item,index) in pageData.list" :key="index" @click="goBlog(item.id)" class="sglist-item">
					
					<view class="sglist-title">{{item.content}}</view>
					<view class="sglist-imglist">
						 
						<img v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img+'.100x100.jpg'" class="sglist-imglist-img" />
						
					</view>
					<view class="sglist-ft">
						<view class="sglist-ft-love">{{item.love_num}}</view>
						<view class="sglist-ft-cm">{{item.comment_num}}</view>
						<view class="sglist-ft-view">{{item.view_num}}</view>
					</view> 
				</view>
				
			</view>
			
		</view>
		<wmo2o-footer tab="blog"></wmo2o-footer>
		<navigator url="../wmo2o_blog/add" class="fixedAdd">发布</navigator>
	</view>
</template>

<script>
	import wmo2oFooter from "../../components/wmo2ofooter.vue";
	export default({
		components:{
			wmo2oFooter 
		},
		
		data:function(){
			return {
				pageData:{},
				pageLoad:false,
				type:""
			}
		},
		onLoad:function(){
			this.getPage();
		},
		methods:{
			setType:function(type){
				this.type=type;
				this.getPage();
			},
			goBlog:function(id){
				uni.navigateTo({
					url:"../wmo2o_blog/show?id="+id
				})
			},
			getPage:function(){
				var that=this;
				that.app.get({
					url:that.app.apiHost+"/module.php?m=wmo2o_blog&a=list&ajax=1",
					data:{
						type:that.type
					},
					dataType:"json",
					success:function(res){
						that.pageLoad=true;
						that.pageData=res.data;
					}
				})
			}
		}
	})
</script>

<style>
</style>
