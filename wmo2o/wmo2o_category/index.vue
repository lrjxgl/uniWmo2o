<template>
	<view>
		<view class="main-body bg-white mh100" >
			<view class="list-side" :style="{'top':sideTop+'px'}">

				<view @click="setCat(item.catid)" v-for="(item,index) in pageData.catList"  :key="index" class="list-side-item" v-bind:class="{'list-side-item-active':catid==item.catid}">{{item.title}}</view>

			</view>
			<view class="list-main" v-bind:style="{'min-height':height+'upx'}">

				<view v-for="(item,index) in pageData.catList" :key="index" class="list-cat-item">
					<view v-if="item.catid==catid">
						<view @click="goList(item.catid)">
							<image class="list-cat-img" mode="widthFix" :src="item.imgurl+'.middle.jpg'"></image>
						</view>
						<view class="list-cat-hd">{{item.title}}</view>
						<view class="list-child">

							<view v-for="(cc,ccIndex) in item.child" :key="ccIndex" @click="goList(cc.catid)" class="list-child-item">
								<image class="list-child-img" mode="widthFix" :src="cc.imgurl+'.middle.jpg'"></image>
								<view class="list-child-title">{{cc.title}}</view>
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>
		<wmo2o-footer tab="category"></wmo2o-footer>
	</view>	
</template>

<script>
	import wmo2oFooter from "../../components/wmo2ofooter.vue";
	export default {
		components:{
			wmo2oFooter
		},
		data: function() {
			return {
			 
				pageLoad: false,
				pageData: {},
				catid:0,
				height:440,
				sideTop:44
			}
		},
		onLoad: function(ops) {
			var win=uni.getSystemInfoSync();
			this.height=win.windowHeight-50;
			// #ifndef H5
			this.sideTop=0;
			// #endif
			this.getPage();
			
		},
		methods: {
			setCat:function(catid){
				this.catid=catid;
			},
			goList:function(catid){
				uni.navigateTo({
					url:"../wmo2o_product/list?catid="+catid
				})
			},
			getPage: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "/module.php?m=wmo2o_category&ajax=1",
					success: function(res) {
						that.pageData = res.data;
						for(var i in res.data.catList){
							that.catid=res.data.catList[i].catid;
							break;
						}
						
						that.pageLoad = true;
					}
				})
			}
		}
	}
</script>

<style>
 
.list-side {
	position: fixed;
	left: 0upx;
	top: 110upx;
	bottom: 130upx;
	width: 170upx;
	border-right: 2upx solid #eee;
	text-align: center;
	background-color: #fff;
}

.list-side-item {
	color: #707070;
	padding: 22upx 11upx;
	font-size: 14px;
	display: block;
	cursor: pointer;
}

.list-side-item-active {
	color: #ff842b;
	border-left: 7upx solid #ff842b;
}

.list-main {
	margin-left: 180upx;
	padding-top: 11upx;
}

.list-cat-img {
	max-width: 100%;
	padding-right: 11upx;
}

.list-cat-hd {
	text-align: center;
	padding: 22upx 0;
	color: #666;
	font-size: 14px;
	position: relative;
}

.list-cat-hd:before {
	display: block;
	width: 44upx;
	height: 2upx;
	background-color: #e0e0e0;
	position: absolute;
	right: 60%;
	top: 50%;
	content: "-";
	overflow: hidden;
	color: #666;
}

.list-cat-hd:after {
	display: block;
	width: 44upx;
	height: 2upx;
	background-color: #e0e0e0;
	position: absolute;
	left: 60%;
	top: 50%;
	content: "-";
	overflow: hidden;
	color: #666;
}

.list-child {
	margin-bottom: 22upx;
	flex-direction: row;
	flex-wrap: wrap;
}

.list-child-item {
	float: left;
	display: block;
	width: 33.333%;
	margin-bottom: 22upx;
	padding: 0 22upx;
	box-sizing: border-box;
	font-size: 14px;
	color: #666;
	text-align: center;
}

.list-child-img {
	width: 100%;
	height: 60upx;
	display: block;
	margin-bottom: 11upx;
}

.list-child-title {
	height: 66upx;
	line-height: 66upx;
	overflow: hidden;
}

 
</style>
