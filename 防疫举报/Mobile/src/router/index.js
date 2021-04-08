// 联盟首页
import Index from '../pages/index/index'
// 官网首页
import Home from '../pages/home/home'
//线索举报首页
import Report from '../pages/index/report'
import Map from '../pages/index/map'
// 防疫举报
import Fangyijubao from '../pages/index/fyjb'
let routes = [
  {
		path: '/',
		redirect: '/index',
		hidden: true,
	},
	// {
	// 	path: '/index',
	// 	name: 'index',
	// 	component: Index,
	// 	meta:{
	// 		name: '首页',
	// 		permission: [1],  //1是超级管理员,0街道
	// 	},
	// },
	// {
	// 	path: '/home',
	// 	name: 'home',
	// 	component: Report,
	// 	meta:{
	// 		name: '线索举报',
	// 	},
	// },
	{
		path: '/index',
		name: 'fyjb',
		component: Fangyijubao,
		
		meta:{
			name: '防疫举报',
			keepalive: true,
		},
	},
	{
		path: '/map',
		name: 'map',
		component: Map,
		
		meta:{
			name: '位置选择',
			keepalive: false,
		},
	},
	// {
	// 	path: '/home',
	// 	name: 'home',
	// 	component: Home,
	// 	meta:{
	// 		name: '首页',
	// 		permission: [1],  //1是超级管理员,0街道
	// 	},
	// },
]

export {
	routes
}
