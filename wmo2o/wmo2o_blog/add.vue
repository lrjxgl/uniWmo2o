<template>
	<view>
		<view v-if="pageLoad">
			<view class="main-body">
				<form  @submit="formSubmit"  >
					 
					 
					<view class="textarea-flex">
					 
						<textarea name="content" class="h100 textarea-flex-text"></textarea>
					</view>
					<view class="none">
						<input name="imgsdata"  type="text" v-model="imgsdata" />
					</view>
					<upimg-box @call-parent="setImgsData"></upimg-box>
					<button formType="submit" class="btn-row-submit">提交</button>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import pickergroup from "../../components/pickergroup.vue";
	import upimgBox from "../../components/upimgbox.vue";
	var app = require("../../common/common.js");
	var id;
	export default {
		components:{
			pickergroup,
			upimgBox
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
				imgsdata:""
			}
			
		},
		onLoad: function (option) {
			id = option.id;
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "发布微贴",
			})
		},
		methods: {
			
			getPage: function () {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?fromapp=wxapp&m=wmo2o_blog&ajax=1&a=add",
					success: function (res) {
						if(res.error==1000){
							that.app.goLogin();
							return false;
						}
						that.pageLoad = true;
						that.pageData = res.data;

					}
				})
			},
			setImgsData:function(e){
				this.imgsdata=e;
			},
			formSubmit:function(e){
				this.app.post({
					url:this.app.apiHost+"/module.php?fromapp=wxapp&m=wmo2o_blog&a=save&ajax=1",
					data:e.detail.value,
					success:function(res){
						uni.showToast({
							title: res.message,
							duration: 2000
						});
						if(!res.error){
							uni.navigateBack({
								delta: 2
							});
						}
					}
				})
			}
		},
	}
</script>

<style>

</style>
