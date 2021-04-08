// 首页
const Index = () => import(/* webpackChunkName: "group-main" */ '../pages/index/index')

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
]

export {
	routes
}
