const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'vue/dist/vue.esm.js', 'lodash', 'vuex', 'axios', 'vue-router']
  },
  output: {
    path: resolve('static/vue/dll'),
    filename: '[name].dll.[chunkhash].js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new CleanWebpackPlugin(
    ['vue'],  // 需要删除的目录或文件
    {
      root: resolve('static'),  // 根目录
      verbose:  true,  // 开启在控制台输出信息
      dry: false    // 启用删除文件
    }),
    new webpack.DllPlugin({
      context: __dirname,
      path: resolve('static/vue/dll/[name]-manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // 把带hash的dll插入到html中
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: resolve('static/vue/dll')
    })
  ]
};
