/*
* 使用时需要安装:
  npm i webpack-dev-server -D
* */
'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils');
const baseConfig = require('./webpack.base.conf');
const env = require('../config/env/dev.env');
const bundleConfig = require("../static/vue/dll/bundle-config.json");

const webpackConfig = merge(baseConfig, {
  module: {
    rules: [
      ...utils.styleLoaders({ sourceMap: true, usePostCSS: true }),
      { test: /\.pug$/, use: ['html-loader', 'pug-html-loader'] }
    ]
  },
  // 开发环境中cheap-module-eval-source-map更快
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    historyApiFallback: true, // 所有的路径都执行index.html
    compress: true,
    host: 'localhost',
    port: 80,
    open: false,
    overlay: true,
    publicPath: '/',
    proxy: {},
    watchOptions: {
      poll: false,
    },
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      dllPathJs: '/static/vue/dll/' + bundleConfig.vendor.js
    })
  ]
});


module.exports = webpackConfig;

