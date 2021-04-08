// home
const Home = () => import(/* webpackChunkName: "group-main" */ '../pages/home')
// 概况
const General = () => import(/* webpackChunkName: "group-main" */ '../pages/general/general')
const Content = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/content')

export default {
  path: '/home',
  component: Home,
  redirect: '/home/general',
  meta:{
    name: '参加调研企业库',
    permission: [0, 1],  //1是超级管理员,0街道
  },
  children: [
    {
      path: 'general',
      component: General,
      meta:{
        name: '概况',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
    {
      path: 'list',
      hidden: true,
      meta:{
        name: '培育库通用列表页',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      },
      component: Content,
      redirect: '/home/list/list',
      children: [
        {path: 'list', name: 'generalHList', component: techList},
        {path: 'detail', name: 'generalHDetail', component: nationalTechDetail},
      ]
    },
    ...otherProjectArr,
  ]
}
