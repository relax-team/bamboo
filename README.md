## 基于VUE搭建的后台单页面应用系统
 
    1. 切换镜像为淘宝npm   
      npm config set registry https://registry.npm.taobao.org
      
    2. 清除npm依赖缓存
      npm cache clean
      
## 项目架构

```
.
├── LICENSE
├── README.md
├── app.js  // Koa入口文件
├── bundle-config.json        // 动态文件共享引入map
├── build                     // vue-cli 生成，用于webpack监听、构建
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                      // vue-cli 生成&自己加的一些配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── static // Vue build 后的文件夹
│   ├── index.html // 入口文件
├── index.html                  // vue-cli生成，用于容纳Vue组件的主html文件。
├── package.json                // npm的依赖、项目信息文件
├── server                      // Koa后端，用于提供Api
│   ├── config                 // 配置文件夹
│   ├── controllers            // controller-控制器
│   ├── models                 // model-模型
│   ├── routes                 // route-路由
│   └── utils                  // 全局公用方法
├── src                        // VUE源代码
│   ├── api                    // 所以请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── router                 // 路由
│   ├── store                  // 全局状态管理
│   ├── page                   // 业务页面
│   │   ├── ...                // 页面
│   ├── utils                  // 全局公用方法
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等

```

看起来好像很复杂的样子，其实很大一部分文件夹的结构是`vue-cli`这个工具帮我们生成的。

```bash
vue init webpack pos
```

而我们需要额外添加的主要是Koa的入口文件以及一个`server`文件夹用于Koa提供API。
这样的话，在获取数据的方面就可以走Koa所提供的API，而Vue只需关心怎么把这些数据渲染到页面上就好了。

## 项目构建

``` bash
# 安装依赖
npm install

# 开发环境 热加载 localhost:80 配置hosts
npm run web

# 测试环境
npm run build:dev

# 公共资源动态链接库 dll
npm run build:dll

# 生产环境构建
npm run build

```

参考文档 [webpack guide](http://vuejs-templates.github.io/webpack/) 和 [docs for vue-loader](http://vuejs.github.io/vue-loader).



### 使用pm2启动koa服务

```git
npm run pm2
```
> 也可使用run.sh文件进行启动.


#### pm2常用命令

+ pm2 start app.js
+ pm2 show list
+ pm2 stop -id/all
+ pm2 restart [id||name]
