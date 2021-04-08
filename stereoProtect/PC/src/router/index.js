// 联盟首页
import Index from '../pages/index/index'
// 官网首页
import Home from '../pages/home/home'

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
		component: Home,
		meta:{
			name: '首页',
			permission: [1],  //1是超级管理员,0街道
		},
	},
]

export {
	routes
}
