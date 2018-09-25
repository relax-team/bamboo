'use strict';
import cookie from 'js-cookie'

export default {
  namespaced: true,
  state: {
    userInfo: null
  },
  mutations: {
    userInfo: (state, data) => {
      state.userInfo = data;
    },
  },
  actions: {
    // 登录
    async login({commit}, data) {
      const {Base64} = require('js-base64');
      cookie.set('Authorization', Base64.encode(JSON.stringify(data)));
      commit('userInfo', data);
    },
    //退出登录
    logout({commit}){
      //清除cookie和localStorage
      cookie.remove('Authorization');
      commit('userInfo', null);
    }
  }
}
