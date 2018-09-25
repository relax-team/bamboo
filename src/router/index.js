import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Store from '../store/index'

Vue.use(Router);

NProgress.configure({showSpinner: false});

// 路由表
import routerFront from './public/front.router';
import routerEnd from './public/end.router';

const router = new Router({
  mode: 'history',
  routes: routerFront
});

// 路由跳转前验证
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();
  if (checkLogin()) {
    // 已获取到登录状态
    if (to.path === '/login') {
      // 从登录而跳转到首页
      NProgress.done();
      return next({path: '/'});
    } else {
      if (!Store.getters.addRouters[0]) {
        //根据平台、用户权限分配路由
        let routerMap = await Store.dispatch('router/generator');
        router.addRoutes(routerMap); // 动态添加路由表
        return next({...to, replace: true})
      }
      return next();   // 已分配路由
    }
  }

  const whiteList = ['/login', '/404', '/500', '/502'];
  if (new RegExp('^' + whiteList.join('|')).test(to.path)) {
    return next();  //在免登录白名单，直接进入
  }

  return next('/login');  //否则全部重定向到登录页
});


// 路由跳转后
router.afterEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 结束Progress
  NProgress.done();
});

/*
* 获取token, 判断用户是否已登录
* */
function checkLogin() {
  //获取cookie存储的token等信息
  let res, Authorization = cookie.get('Authorization');
  if (Authorization) {
    const {Base64} = require('js-base64');
    res = JSON.parse(Base64.decode(Authorization)).username;
  }
  return !!res;
}


export default router
