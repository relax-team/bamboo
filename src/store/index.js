import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

//遍历查找modules下的模块
const modules = {};
const fs = require.context('./modules', false, /\.js$/);
fs.keys().forEach((k) => {
  modules[k.replace(/(\.\/|\.js)/g, '')] = fs(k).default;
});

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
  getters,
  state: {},
  mutations: {},
  actions: {

  }
})
