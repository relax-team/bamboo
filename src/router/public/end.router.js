/*
* 公共路由，不需要权限控制
* 注：require.ensure(dependencies: String[], callback: function(require), chunkName: String) 用于webpack打包拆分代码
* 路由规则：
* meta中hidden表示在侧边栏菜单不显示， name和meta同级必须同时存在
* */
import layout from '../../components/u-layout';

export default [
  {
    path: '/user',
    component: layout,
    meta: {title: '用户管理', class: 'el-icon-phone'},
    children: [
      {
        path: 'list',
        name: 'userList',
        meta: {title: '用户列表'},
        component: r => require.ensure([], () => r(require('../../page/user/index')), 'PUBLIC')
      }
    ]
  },
  {
    path: '/setting',
    component: layout,
    meta: {title: '系统设置', class: 'el-icon-setting'},
    children: [
      {
        path: 'user/changePassword',
        name: 'changePassword',
        meta: {title: '修改密码'},
        component: r => require.ensure([], () => r(require('../../page/setting/changePassword')), 'PUBLIC')
      }
    ]
  },
  {
    path: '/help',
    component: layout,
    children: [
      {
        path: '',
        name: 'help',
        meta: {title: '帮助文档', class: 'el-icon-question'},
        component: r => require.ensure([], () => r(require('../../page/help/index')), 'PUBLIC')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]
