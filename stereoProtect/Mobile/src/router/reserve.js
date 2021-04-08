// home
const Home = () => import(/* webpackChunkName: "group-main" */ '../pages/home')
// 概况
const reserveGeneral = () => import(/* webpackChunkName: "group-main" */ '../pages/general/reserveGeneral')
const Content = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/content')
// 列表
const techList = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/reserve/list')
// 详情
const nationalTechDetail = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/reserve/detail')
// 国高
const nationalTech = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/reserve/nationalTech')
// 其它项目
const otherTech = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/reserve/otherTech')
// 知识产权概况页
const IPGeneral = () => import(/* webpackChunkName: "group-nationalTech" */ '../pages/reserve/IPGeneral')

// 国高、省科、市科路由配置生成
import projectLists from 'utils/projectLists'
const sortList = [11, 2, 1, 13]; // id对应项目可参看接口文档
const otherProjectArr = sortList.map((item) => {
	let it = projectLists[item-1];
	let path = it.path;
	return {
    path,
    meta:{
      name: it.name,
      icon: it.icon || 'icon-tongjijuicon_guogao',
      permission: it.permission || [0, 1],
      standard: it.standard2
    },
    component: Content,
    redirect: `/reserve/${path}/${path}`,
    children: [
      {path, name: path, component: otherTech, meta:{id: item}},
      {path: 'list', name: path + 'List', component: techList}, // 同国家高新
      {path: 'detail', name: path + 'Detail', component: nationalTechDetail}, // 同国家高新
    ]
  }
})

export default {
  path: '/reserve',
  component: Home,
  redirect: '/reserve/general',
  meta:{
    name: '科技型企业库',
    permission: [0, 1],  //1是超级管理员,0街道
  },
  children: [
    {
      path: 'general',
      component: reserveGeneral,
      meta:{
        name: '概况',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      }
    },
    {
      path: 'IPGeneral',
      hidden: true,
      meta:{
        name: '知识产权概况',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      },
      component: Content,
      redirect: '/reserve/IPGeneral/IPGeneral',
      children: [
        {path: 'IPGeneral', name: 'IPGeneral', component: IPGeneral},
      ]
    },
    {
      path: 'list',
      hidden: true,
      meta:{
        name: '储备库通用列表页',
        icon: 'icon-tongjijuicon_gaikuang',
        permission: [0, 1],  //1是超级管理员,0街道
      },
      component: Content,
      redirect: '/reserve/list/list',
      children: [
        {path: 'list', name: 'generalList', component: techList},
        {path: 'detail', name: 'generalDetail', component: nationalTechDetail},
      ]
    },
    ...otherProjectArr,
    /*{
      path: 'competitionProject',
      meta:{
        name: '竞争性项目',
        icon: 'icon-tongjijuicon_hangzhoushis1',
        permission: [0, 1]
      },
      component: Content,
      redirect: '/reserve/competitionProject/competitionProject',
      children: [
        {path: 'competitionProject', name: 'competitionProject', component: otherTech},
        {path: 'list', name: 'competitionProjectList', component: techList}, // 同国家高新
        {path: 'detail', name: 'competitionProjectDetail', component: nationalTechDetail}, // 同国家高新
      ]
    }*/
  ]
}
