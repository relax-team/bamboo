/*
* 公共路由，不需要权限控制
* 注：require.ensure(dependencies: String[], callback: function(require), chunkName: String) 用于webpack打包拆分代码
* 路由规则：
* meta中hidden表示在侧边栏菜单不显示， name和meta同级必须同时存在
* */
import layout from '../../components/u-layout';

export default [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {title: '首页', class: 'el-icon-menu'},
        component: r => require.ensure([], () => r(require('../../page/index')), 'PUBLIC')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录', hidden: true},
    component: r => require.ensure([], () => r(require('../../page/login/index')), 'PUBLIC')
  },
  {
    path: '/404',
    name: '404',
    meta: {title: '404', hidden: true},
    component: r => require.ensure([], () => r(require('../../page/error/404')), 'PUBLIC'),
  },
]
