import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Plugin from '@/plugins'
import { routes } from '@/router'
//highcharts的引入
//import HighchartsVue from 'highcharts-vue'
import store from 'store/';
import './assets/css/reset.css';
import './assets/css/font/iconfont.css';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

import './assets/css/common.scss';

// import { Button } from 'ant-design-vue'
// Vue.component(Button.name, Button)

/*import echarts from 'echarts';
window.echarts = echarts;
Vue.prototype.$echarts = echarts;*/

Vue.use(Plugin)
Vue.use(VueRouter)
//Vue.use(HighchartsVue)

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   store.commit('SET_PERCENT', 0)
//   next();
// })

new Vue({
	router,
	store,
  render: h => h(App)
}).$mount('#app')
