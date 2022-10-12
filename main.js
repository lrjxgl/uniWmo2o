import Vue from 'vue'
import App from './App'
import $app from "./common/common.js";
import pageLoading from "./components/pageloading.vue";
Vue.component("page-loading",pageLoading);
Vue.prototype.app=$app;
Vue.config.productionTip = false
import store from './store/'
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
