<template>
	<view>
		<view style="height: 145px;"></view>
		<view class="sTopBox">
			<view class="header-fixtop">
				<view class="header-fixtop-icon pointer icon-search none"></view>
				<view :class="{'shop-fav-active':isFav}" class="header-fixtop-icon  shop-fav-toggle pointer icon-like" @click="favShopToggle"></view>
				<view @click="headerMoreShow()" class="header-fixtop-icon none  pointer icon-more_light"></view>
			</view>
			<view class="modal-group" :class="headerMoreClass">
				<view class="modal-mask" @click="headerMoreHide()"></view>
				<view class="header-fixtop-menu">
					<view class="row-item-text">
						<view class="row-item-icon icon-share"></view>分享店铺
					</view>
					<view gourl="/module.php?m=wmo2o_report&a=add&shopid={$shop.shopid}" class="row-item-text">
						<view class="row-item-icon icon-warn_light"></view>举报商家
					</view>
				</view>
			</view>

			<view class="wshop">
				<view class="wshop-logo">
					<image model="widthFix" class="wshop-logo-img" :src="shop.imgurl+'.100x100.jpg'"></image>
				</view>
				<view class="flex-1">
					<view class="wshop-shopname none">{{shop.shopname}}</view>
					<view class="flex flex-ai-center mgb-5">
						<view class="iconfont icon-time f12 cl-white mgr-2"></view>
						<view class="cl-white f12"> &nbsp;配送约60分钟</view>

					</view>
					<view class="wshop-welcome mgb-5">{{shop.gonggao}}</view>
					<view class="flex" style="display: none!important;">
						<view class="cl-white mgr-20">月销 {{shop.month_buy_num}}笔</view>
						<view class="cl-white">评价 {{shop.raty_grade}}分</view>
					</view>
					<view class="cpRow">
						<view class="cpbtn" v-for="(item,index) in couponList" :key="index">
							{{item.title}}
						</view>
					</view>
				</view>

			</view>

			<view class="tabs-border mgb-5">
				<view @click="setPage('product')" :class="{'tabs-border-active':page=='product'}" class="tabs-border-item ">产品分类</view>
				<view @click="setPage('raty')" :class="{'tabs-border-active':page=='raty'}" class="tabs-border-item">商家评价</view>
				<view @click="setPage('detail')" :class="{'tabs-border-active':page=='detail'}" class="tabs-border-item">商家信息</view>
			</view>
		</view>
		<view v-if="pageLoad">
			<view class="page" v-if="page=='product'" id="page-product">

				<view class="side">
					<view :class="{'side-menu-active':catid==0}" @click="setCat(0)" class="side-menu">全部</view>
					<view :class="{'side-menu-active':catid==item.catid}" @click="setCat(item.catid)" v-for="(item,index) in pageData.catList"
					 :key="index" class="side-menu">{{item.title}}</view>


				</view>
				<view class="side-main">
					<view v-for="(item,index) in pageData.list" :key="index" class="flexlist-item">
						<img @click="goProduct(item.id)" class="flexlist-img" :src="item.imgurl+'.100x100.jpg'">
						<view class="flex-1">
							<view @click="goProduct(item.id)" class="flexlist-title pointer">{{item.title}}</view>
							<view class="flex mgb-5">
								<view class="flex-1 cl3">库存 {{item.total_num}}</view>
								<view class="cl3">已售 {{item.buy_num}}</view>
							</view>
							<view class="flex">
								<view class="cl-money f16">￥{{item.price}}</view>
								<view class="flex-1"></view>
								<view v-if="item.isksid>0">
									<view @click="ksBox(item.id)" class="btn-mini  btn-outline-success">选规格</view>
								</view>
								<view class="pdb-5" v-else>

									<view v-if="item.incart" class="numbox prolist-numbox">
										<view @click="minusCart(item.id,item.cart_amount)" class="numbox-minus">-</view>
										<input type="text" name="amount" :value="item.cart_amount" class="numbox-num" />
										<view @click="plusCart(item.id,item.cart_amount)" class="numbox-plus">+</view>
									</view>
									<view @click="addCart(item.id)" class="btn-buy   iconfont icon-cart" v-else></view>
								</view>
							</view>
						</view>


					</view>
					<view v-if="ksShow">
						<view class="modal-mask" @click="ksHide"></view>
						<view class="modal">
							<view class="modal-header">
								<view class="modal-title">选择款式</view>
								<view class="modal-close icon-close" @click="ksHide"></view>
							</view>
							<view class="modal-body pdt-10">
								<view class="ksBox mgb-10">
									<view class="kslist mgb-10">
										<view class="kslist-label">{{ksproduct.ks_label_name}}</view>
										<view @click="ks1(item.id)" v-bind:class="{'kslist-active':item.id==ksid1}" class="kslist-item" v-for="(item,index) in ksList"
										 :key="index">{{item.title}}</view>
									</view>
									<view class="kslist">
										<view class="kslist-label">{{ksproduct.ks_label_size}}</view>
										<view class="kslist-item" @click="ks2(item.id)" v-bind:class="{'kslist-active':item.id==ksid}" v-for="(item,index) in ksList2"
										 :key="index">{{item.size}}</view>
									</view>
								</view>
								<view class="flex">
									<view class="cl2 mgr-10 mgl-10">价格</view>
									<view class="cl-money">￥{{ksproduct.price}}</view>
									<view class="flex-1"></view>
									<view v-if="ksproduct.incart" class="numbox prolist-numbox">
										<view @click="ksMinusCart(ksproduct.id,ksproduct.cart_amount)" class="numbox-minus">-</view>
										<input type="text" name="amount" :value="ksproduct.cart_amount" class="numbox-num" />
										<view @click="ksPlusCart(ksproduct.id,ksproduct.cart_amount)" class="numbox-plus">+</view>
									</view>
									<view @click="ksAddCart(ksproduct.id)" class="btn-buy iconfont icon-cart" v-else></view>
								</view>
							</view>
						</view>
					</view>
					<view class="footer-row"></view>
					<view class="footerBox pd-5">
						<view @click="goGuest" class=" w60 pointer flex-center mgr-5">
							<view class="iconfont icon-service cl-primary f18"></view>
							<view class="f12">客服</view>
						</view>
						<view v-if="pageData.cart_total_num==0" class="flex-1 flex">
							<view class="cl2">暂无商品，快去选购吧</view>
						</view>
						<view class="flex-1" v-if="pageData.cart_total_num>0">
							<view class="cl-money">￥{{pageData.cart_total_money}}</view>
							<view>运费金额 ￥{{pageData.express_money}}</view>
						</view>
						<view v-if="pageData.cart_total_num>0" class="btn" @click="goOrder">去结算</view>
					</view>
				</view>
			</view>
			<view class="page" id="page-raty" v-if="page=='raty'">
				<view v-if="ratyPage.ratyList.length==0" class="emptyData">暂无评价</view>
				<view v-else>
					<view class="flexlist-item flex-ai-center">
						<img class="flexlist-img" :src="ratyPage.shop.imgurl+'.100x100.jpg'" />
						<view class="flex-1">

							<sky-raty len="10" groupclass="mgb-5" label="综合" readonly="1" :grade="ratyPage.shop.raty_grade"></sky-raty>
							<sky-raty len="10" groupclass="mgb-5" label="产品" readonly="1" :grade="ratyPage.shop.raty_grade_product"></sky-raty>
							<sky-raty len="10" groupclass="mgb-5" label="物流" readonly="1" :grade="ratyPage.shop.raty_grade_express"></sky-raty>
						</view>
					</view>
					<view v-for="(item,index) in ratyPage.ratyList" :key="index" class="bg-white pd-10 flex mgb-5">
						<img class="wh-60 mgr-10" :src="item.user_head+'.100x100.jpg'">
						<view class="flex-1">
							<view class="flex mgb-5">
								<view class="flex-1">{{item.nickname}}</view>
								<view class="cl3"> {{item.timeago}}</view>
							</view>
							<sky-raty len="10" readonly="1" label="评价" :grade="item.raty_service"></sky-raty>
							<view class="cl2">{{item.content}}</view>
						</view>
					</view>
				</view>

			</view>
			<view class="page" id="page-raty" v-if="page=='detail'">
				<view class="row-box">
					<view class="row-item-text ">
						<view class="row-item-icon icon-location_light"></view>
						<view class="flex-1">{{detailPage.shop.address}}</view>
					</view>
					<view class="row-item-text ">
						<view class="row-item-icon icon-time"></view>
						<view class="flex-1">{{detailPage.shop.yystart}}-{{detailPage.shop.yyend}}</view>
					</view>
					<view class="row-item-text ">
						<view class="row-item-icon icon-selection"></view>
						<view class="flex-1">
							<view class="cl1">证件信息</view>

						</view>
					</view>
					<view class="sglist-imglist mgb-10">
						<img v-for="(item,index) in detailPage.zzimgsdata" :key="index" class="sglist-imglist-img" :src="item+'.100x100.jpg'">

					</view>
					<view class="row-item-text ">
						<view class="row-item-icon icon-read"></view>
						<view class="flex-1">公司简介</view>
					</view>
					<view class="pdl-10 pdr-10">
						{{detailPage.shop.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import skyRaty from "../../components/skyraty.vue";
	var shopid = 0;
	export default ({
		components: {
			skyRaty
		},
		data: function() {
			return {
				shop: {},
				pageData: {},
				couponList: {},
				pageLoad: true,
				catid: 0,
				page: "product",
				ratyPage: {},
				detailPage: {},
				ksShow: false,
				isFav: false,
				ksproduct: [],
				ksList: [],
				ksList2: [],
				ksid: 0,
				ksid1: 0,
				ksid2: 0,
				headerMoreClass: ""
			}
		},
		onLoad: function(ops) {
			shopid = ops.shopid;
			this.getPage();
			this.getProduct();
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#333333',
				animation: {
					duration: 400,
					timingFunc: 'easeIn'
				}
			})
		},
		methods: {
			favShopToggle: function() {
				var that = this;
				that.app.get({
					url: that.app.apiHost + "?fromapp=wxapp&m=fav&a=toggle&ajax=1",
					data: {
						objectid: shopid,
						tablename: "mod_wmo2o_shop"
					},
					success: function(res) {
						if (res.data == 'delete') {
							that.isFav = false;
						} else {
							that.isFav = true;
						}

					}
				})

			},
			headerMoreShow: function() {
				this.headerMoreClass = 'flex-col';
			},
			headerMoreHide: function() {
				this.headerMoreClass = '';
			},
			goOrder: function() {
				uni.navigateTo({
					url: "../wmo2o_order/confirm?shopid=" + shopid
				})
			},
			goGuest: function() {
				uni.navigateTo({
					url: "../wmo2o_guest/user?shopid=" + shopid
				})

			},
			goProduct: function(id) {
				uni.navigateTo({
					url: "../wmo2o_product/show?id=" + id + "&shopid=" + shopid
				})

			},
			getPage: function() {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_shop&shopid=" + shopid,
					success: function(res) {
						uni.setNavigationBarTitle({
							title: res.data.shop.shopname
						})
						that.couponList = res.data.couponList;
						that.shop = res.data.shop;
						
						that.isFav = res.data.isfav;
						that.pageLoad = true;
					}
				});
			},
			getProduct: function() {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_product&ajax=1&shopid=" + shopid,
					data: {
						catid: that.catid
					},
					dataType: "json",
					success: function(res) {
						that.pageData = res.data;
						that.pageLoad = true;
					}
				})
			},
			updateCartStat: function() {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_product&ajax=1&shopid=" + shopid,
					data: {
						catid: that.catid
					},
					dataType: "json",
					success: function(res) {
						that.pageData.cart_total_num = res.data.cart_total_num;
						that.pageData.cart_total_money = res.data.cart_total_money;

					}
				})
			},
			getRaty: function() {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_shop&a=raty&ajax=1&shopid=" + shopid,
					dataType: "json",
					success: function(res) {
						that.ratyPage = res.data;
						that.pageLoad = true;
					}
				})
			},
			getDetail: function() {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_shop&a=detail&ajax=1&shopid=" + shopid,
					dataType: "json",
					success: function(res) {
						that.detailPage = res.data;
						that.pageLoad = true;
					}
				})
			},
			setCat: function(catid) {
				this.catid = catid;
				this.getProduct();
			},
			setPage: function(page) {
				this.page = page;
				this.pageLoad = false;
				console.log(page)
				switch (page) {
					case "raty":
						this.getRaty();
						break;
					case "detail":
						this.getDetail();
						break;
					default:
						this.getProduct();
						break;
				}
			},
			addCart: function(id, ksid) {
				var that = this;
				var id = id;
				var ksid = ksid == undefined ? 0 : ksid;
				var amount = 1;
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						shopid: shopid,
						ksid: ksid
					},
					method: 'GET',
					dataType: "json",
					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {
								if (res.data.amount > 0) {
									list[i].incart = 1;
								}
								list[i].cart_amount = res.data.amount;
								break;
							}
						}
						that.pageData.list = that.parseList(list);
					}
				})
			},
			plusCart: function(id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount++;
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						shopid: shopid,
						amount: amount,
						ksid: ksid
					},
					method: 'GET',
					dataType: "json",

					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {

								list[i].cart_amount = res.data.amount;
								break;
							}
						}

						that.pageData.list = that.parseList(list);
					}
				})
			},
			minusCart: function(id, amount, ksid) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = ksid == undefined ? 0 : ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						shopid: shopid,
						ksid: ksid,
						isdelete: isdelete
					},
					method: 'GET',
					dataType: "json",

					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						var list = that.pageData.list;
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == id) {
								if (res.data.amount == 0) {
									list[i].incart = 0;
								}
								list[i].cart_amount = res.data.amount;
								break;
							}
						}

						that.pageData.list = that.parseList(list);
					}
				})
			},
			parseList: function(list) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].cart_num > 0) {
						list[i].cart_num_class = "prolist-item-row-cart-active";
					} else {
						list[i].cart_num_class = "";
					}
				}
				return list;
			},
			//规格操作
			ksBox: function(id) {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_product_ks&ajax=1&productid=" + id,
					dataType: "json",
					success: function(res) {
						that.ksShow = true;
						that.ksproduct = res.data.product;
						that.ksList = res.data.ksList;
						that.ksList2 = res.data.ksList2;
						that.ksid1 = res.data.ksid;
						that.ksid = res.data.ksid;
					}
				})
			},
			ksHide: function() {
				this.ksid = 0;
				this.ksShow = false;
			},
			ks1: function(id) {
				var that = this;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_product_ks&a=sizeList&ajax=1&id=" + id,
					dataType: "json",
					success: function(res) {
						that.ksid1 = res.data.ksid;
						that.ksid = res.data.ksid;
						that.ksproduct = res.data.product;
						that.ksList2 = res.data.ksList2;
					}
				})
			},
			ks2: function(id) {
				var that = this;
				that.ksid = id;
				this.app.get({
					url: this.app.apiHost + "/module.php?m=wmo2o_product_ks&a=get&ajax=1&id=" + id,
					dataType: "json",
					success: function(res) {

						that.ksproduct = res.data.product;

					}
				})
			},
			ksAddCart: function(id) {
				var that = this;
				var id = id;
				var ksid = that.ksid;
				var amount = 1;
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						shopid: shopid,
						amount: amount,
						ksid: ksid
					},
					method: 'GET',
					dataType: "json",
					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						that.ksproduct.incart = 1;
						that.ksproduct.cart_amount = res.data.amount;
					}
				})
			},
			ksPlusCart: function(id, amount) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = that.ksid;
				amount++;
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						shopid: shopid,
						amount: amount,
						ksid: ksid
					},
					method: 'GET',
					dataType: "json",

					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						that.ksproduct.cart_amount = res.data.amount;
					}
				})
			},
			ksMinusCart: function(id, amount) {
				var that = this;
				var id = id;
				var amount = amount;
				var ksid = that.ksid;
				amount--;
				var isdelete = 0;
				if (amount == 0) {
					isdelete = 1
				}
				this.app.get({
					url: this.app.apiHost + '/module.php?m=wmo2o_cart&a=add&ajax=1',
					data: {
						productid: id,
						amount: amount,
						shopid: shopid,
						ksid: ksid,
						isdelete: isdelete
					},
					method: 'GET',
					dataType: "json",

					success: function(res) {
						if (res.error) {
							uni.showToast({
								title: res.message
							})
							return false;
						}
						that.updateCartStat();
						if (res.data.amount == 0) {
							that.ksproduct.cart_amount = 0;
							that.ksproduct.incart = 0;
						} else {
							that.ksproduct.cart_amount = res.data.amount;
						}

					}
				})
			}
		}
	})
</script>
<style>
	.sTopBox {
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		z-index: 998;
	}

	/*  #ifdef  H5  */
	.sTopBox {
		top: 43px;
	}

	/* #endif */
	.top-row {
		height: 10px;
		background-color: #333;
	}

	.header-back-fixed {
		color: #fff;
		width: 30px;
		height: 30px;
		line-height: 30px;
	}

	.shop-fav-toggle:before {
		color: #aaa;
		font-size: 24px;
	}

	.shop-fav-active:before {
		color: #f00;
		font-size: 28px;
	}

	/* #ifdef H5 */
	.header-fixtop {
		top: 40px;
	}

	/* #endif */

	.header-fixtop-menu {
		position: absolute;
		top: 40px;
		border-radius: 10px;
		right: 5px;
		width: 100px;
		z-index: 999;
		background-color: #fff;
	}

	.wshop {
		display: flex;
		flex-direction: row;
		padding-left: 10px;
		height: 100px;
		background-color: #333;
		padding-top: 10px;
	}

	.wshop-logo {
		position: relative;
		width: 80px;
		height: 80px;
		margin-right: 15px;
	}

	.wshop-logo-img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.wshop-shopname {
		color: #fff;
		margin-bottom: 5px;
		position: relative;
		font-size: 16px;
	}

	.wshop-welcome {
		color: #fff;
		font-size: 12px;
	}

	.cpRow {
		display: flex;
		flex-direction: row;
		overflow: hidden;
	}

	.cpbtn {
		font-size: 12px;
		color: #fff;
		margin-right: 5px;
		padding: 2px 4px;
		border-radius: 3px;
		background-color: #f25c53;
		transform: scale(0.8);
	}

	.side {
		position: fixed;
		top: 189px;
		left: 0px;
		width: 80px;
		bottom: 50px;
		background-color: #fff;
	}

	/* #ifndef H5 */
	.side {
		top: 145px;
	}

	/* #endif */
	.side-menu {
		cursor: pointer;
		padding: 10px 5px;
		border-bottom: 1px solid #eee;
		color: #646464;
		font-size: 14px;
	}

	.side-menu-active {
		color: #f60;
	}

	.side-main {
		margin-left: 82px;
	}

	.numbox {
		width: auto;
	}

	.numbox-minus,
	.numbox-plus {
		display: block;
		width: 24px;
		line-height: 24px;
		height: 24px;
		font-size: 14px;
		cursor: pointer;
		text-align: center;
	}

	.numbox-num {
		width: 32px;
		height: 24px;
		font-size: 12px;
	}
</style>
