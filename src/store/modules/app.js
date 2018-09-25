'use strict';

export default {
  namespaced: true,
  state: {
    showLoading: false
  },
  mutations: {
    showLoading: (state, data) => {
      state.showLoading = data;
    },
  },
  actions: {
    // 登录
    showLoading({commit}, data) {
      commit('showLoading', data);
    }
  }
}
