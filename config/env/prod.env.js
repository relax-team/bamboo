'use strict';
module.exports = {
  DEBUG: false,
  NODE_ENV: 'production',
  PORT: 3002,
  protocol: 'http',
  proxy: false,  // 是否开启node api 代理
  api: {
    root: 'http://rap2api.taobao.org/app/mock/86011',
    node: 'http://192.168.10.12:9002/proxy'
  }
};
