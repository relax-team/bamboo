import layout from '../../components/u-layout/index';

export default [
  {
    path: '/QQ',
    component: layout,
    meta: {title: '腾讯菜单', class: 'el-icon-date'},
    children: [
      {
        path: '',
        name: 'QQMenu1',
        meta: {title: '子菜单一'},
        component: r => require.ensure([], () => r(require('../../page/platform/QQ/index')), 'QQ')
      }
    ]
  }
]
