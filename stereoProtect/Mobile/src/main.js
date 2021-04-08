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

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css';
// import './assets/css/font/iconfont.css';

// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

// import './assets/css/common.scss';

// import { Button } from 'ant-design-vue'
// Vue.component(Button.name, Button)

/*import echarts from 'echarts';
window.echarts = echarts;
Vue.prototype.$echarts = echarts;*/

Vue.use(MintUI)
Vue.use(Plugin)
Vue.use(VueRouter)
//Vue.use(HighchartsVue)
// const wxUrl = CONFIG.wxUrl;
// Vue.prototype.chooseImage = function(cb) {
//   var path = encodeURIComponent(location.href.split('#')[0]);
//   // alert(path);
//   this.$http.get(wxUrl + '/wechat/getJsAPISignByUrl' + "?url="+ path).then((resp) => {
//     //alert(JSON.stringify(resp));
//     console.log('选择图片-----------------------：');
//     console.log('返回的数据：',resp)
//     console.log('拼装的config：',{
//         debug: false,
//         appId: resp.appid,
//         nonceStr: resp.nonce,
//         signature: resp.sign,
//         timestamp: resp.timestamp,
//         jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'getLocalImgData']
//     });

//     wx.config({
//         debug: false,
//         appId: resp.appid,
//         nonceStr: resp.nonce,
//         signature: resp.sign,
//         timestamp: resp.timestamp,
//         jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseImage', 'getLocalImgData']
//     });
//     wx.ready(function() {
//       wx.chooseImage({
//         count: 1, // 默认9
//         // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         success: function (res) {
//           var localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//           wx.getLocalImgData({
//             localId: localId,
//             success: function (res) {
//               alert(JSON.stringify(res))
//               var localData = res.localData;
//               cb(localData);
//             }
//           });
//         }
//       });
//     });
//   }).catch((error) => {
//     console.log(error);
//   })
// }
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
