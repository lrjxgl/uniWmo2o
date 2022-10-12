<template>
	<view >
		 
		<view>
			
		</view>
		<view @click="captureImage()">拍照</view> 
	</view>
</template>

<script>
	var num=0;
	export default{
		data:function(){
			return {
				title:"我是标题",
				content:"我是内容",
				nickname:"这是昵称",
				list:[],
				cls:"cl-red",
				style:"font-size:36px;color:f30;",
				num:2
			}
		},
		onLoad:function(ops){
			this.getPage();
		},
		onReachBottom:function(){
			this.getList();
		},
		onPullDownRefresh:function(){
			this.getPage();
			uni.stopPullDownRefresh();
		},	
		methods:{
			captureImage:function(){
				var cmr = plus.camera.getCamera();
				var res = cmr.supportedImageResolutions[0];
				var fmt = cmr.supportedImageFormats[0];
				console.log("Resolution: "+res+", Format: "+fmt);
				cmr.captureImage( function( path ){
						alert( "Capture image success: " + path );  
					},
					function( error ) {
						alert( "Capture image failed: " + error.message );
					},
					{
						resolution:res,
						format:fmt,
						popover:{top:"10px",left:"10px",width:"100px",height:"100px"}
					}
				);
			},
			clickMe:function(msg){
				 
				if(typeof(msg)=="string"){
					alert(msg)
				}else{
					
					alert("我被击中了");
				}
				
			},
			getPage:function(){
				console.log("加载了");
				var list=[];
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
				uni.setNavigationBarTitle({
					title:"这是老雷uniApp的hello world"
				})
			},
			getList:function(){
				var list=this.list;
				for(var i=0;i<50;i++){
					num++;
					list.push('这是第'+num+'条新闻');
				}
				this.list=list;
			}
		}
	}
</script>

<style>
</style>
