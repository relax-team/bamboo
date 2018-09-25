'use strict';
module.exports = {
  DEBUG: true,
  NODE_ENV: 'development',
  PORT: 3001,
  protocol: 'http',
  proxy: false,  // 是否开启node api 代理
  api: {
    root: 'http://rap2api.taobao.org/app/mock/86011',
    node: 'http://localhost:9001/proxy'
  }
};
