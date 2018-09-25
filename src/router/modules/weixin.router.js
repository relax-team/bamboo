import layout from '../../components/u-layout/index';
export default [
  {
    path: '/weChat',
    component: layout,
    children: [{
      path: '',
      name: 'weChat',
      meta: {title: '微信菜单', class: 'el-icon-date'},
      component: r => require.ensure([], () => r(require('../../page/platform/weChat/index')), 'weChat')
    }]
  },
]
