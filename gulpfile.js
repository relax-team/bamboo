/*
* gulp-oss静态资源上传管理
* */
var gulp = require("gulp");
var del = require("del");
var oss = require("gulp-oss");

const webpack = require('webpack');
const sequence = require('run-sequence');


const config = oss({
  "key": "",        //oss key
  "secret": "",     //oss secret
  "endpoint": ""    //oss endpoint
}, {
  headers: {
    Bucket: 'goods-item-images',
    CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
    ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
    ContentEncoding: 'gzip',          // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
    ServerSideEncryption: '',
    Expires: ''
  },
  uploadPath: ''  //上传目录
});

gulp.task('oss', () => gulp
  .src('./static')
  .pipe(config)
);


gulp.task('webpack', ()=>{
  return new Promise((resolve, reject)=>{
    let wpkCfg = require('./build/webpack.prod.conf');
    webpack(wpkCfg, (err, stats)=>{
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }));
      resolve();
    })
  })
});

gulp.task('clean:webpack', (cb)=>{
  del([
    'static/**',
    '!static/favicon.ico',
    '!static/.gitkeep',
  ]);
  cb();
});

gulp.task('default', cb=>{
  sequence('clean:webpack', 'webpack', 'watcher', cb);
});
