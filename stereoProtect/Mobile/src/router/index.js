// 联盟首页
import Index from '../pages/index/index'
// 官网首页
// import Home from '../pages/home/home'
//线索举报首页
import Report from '../pages/index/report'
import Map from '../pages/index/map'
// import first from '../pages/index/first'
// import second from '../pages/index/second'
// import three from '../pages/index/three'
// import xsjb from '../pages/index/fyjb'
let routes = [
  {
		path: '/',
		redirect: '/index',
		hidden: true,
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
		meta:{
			name: '首页',
			permission: [1],  //1是超级管理员,0街道
		},
	},
	{
		path: '/home',
		name: 'home',
		component: Report,
		meta:{
			name: '线索举报',
		},
	},
	// {
	// 	path: '/first',
	// 	name: 'first',
	// 	component: first,
	// 	meta:{
	// 		name: '线索举报',
	// 	},
	// },
	// {
	// 	path: '/second',
	// 	name: 'second',
	// 	component: second,
	// 	meta:{
	// 		name: '线索举报',
	// 	},
	// },
	// {
	// 	path: '/three',
	// 	name: 'three',
	// 	component: three,
	// 	meta:{
	// 		name: '线索举报',
	// 	},
	// },
	// {
	// 	path: '/xsjb',
	// 	name: 'xsjb',
	// 	component: xsjb,
	// 	meta:{
	// 		name: '线索举报',
	// 	},
	// },
	{
		path: '/map',
		name: 'map',
		component: Map,
		meta:{
			name: '位置选择',
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
