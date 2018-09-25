import Vue from 'vue';
import router from './router/index';
import store from './store/index'

//async computed
import asyncComputed from 'vue-async-computed';
Vue.use(asyncComputed);

//注入全局方法
import mixins from './utils/mixins';
Vue.mixin(mixins);

//注入全局组件
const cpts = require.context('./components', true, /index.vue$/);
cpts.keys().forEach(k => {
  const config = cpts(k), name = config.default.name;
  Vue.component(name, config.default)
});

//引入element-ui
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, {size: 'small'});

// 引入全局CSS
import '@/assets/less/theme-default.less'

// 是否开启F12
Vue.config.productionTip = true;

import App from './App.vue';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
