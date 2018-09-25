// 不需要权限的静态路由集合
import routerFront from '../../router/public/front.router';
import routerEnd from '../../router/public/end.router';

export default  {
  namespaced: true,
  state: {
    routers: routerFront,
    addRouters: []
  },
  mutations: {
    routers: (state, data) => {
      state.routers = [...routerFront, ...data]; // 所有router
      state.addRouters = data;  // 后添加的router
    }
  },
  actions: {
    async generator({commit}) {
      //遍历查找router下的路由文件，根据平台、用户分配路由权限
      let routerMap = [];
      const fs = require.context('../../router/modules', false, /\.router.js$/);
      fs.keys().forEach((k) => {
        routerMap = routerMap.concat(fs(k).default);
      });

      routerMap = routerMap.concat(routerEnd);

      commit('routers', routerMap);

      return routerMap;
    }
  }
}



