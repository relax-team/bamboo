const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const staticCache  = require('koa-static-cache');
const compress = require('koa-compress');
const cacheControl = require('koa-cache-control');
const historyFallback = require('koa2-history-api-fallback');

//Global
global.cfg = require('./config/env');

const app = new Koa();

app.use(bodyParser());

//处理日志配置
app.use(koaLogger());   //koa log
global.logger = require('./server/utils/logger')();

//x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//- vue historyApiFallback 配置
app.use(historyFallback());

// 设置静态服务器资源
app.use(staticCache(__dirname + '/static', {
  gzip: true,
  usePrecompiledGzip: /text|application/i
}));

// 文件压缩
app.use(compress({
  filter: (contentType) => {
    return /text|application/i.test(contentType)
  }
}));

// 缓存
app.use(cacheControl({
  public: true,
  //maxAge: 600
}));

// 错误异常处理
app.on('error', (err, ctx) => {
  err && console.error(err);
  ctx.status = err.status || 500;
  ctx.body = err.message;
});


//创建服务
const port = cfg.PORT || 3000;
app.listen(port, () => {
  logger.info('[当前环境 process.env.NODE_ENV]: ' + cfg.NODE_ENV);
  logger.info('Koa is listening in ' + port);
  logger.info('是否启用node代理  ' + cfg.proxy);
  logger.info('API请求地址 ' + cfg.api.root);
  logger.error('错误测试日志');
});
