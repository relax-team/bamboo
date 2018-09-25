'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const utils = require('./utils');
const baseConfig = require('./webpack.base.conf.js');
const env = require('../config/env/prod.env');

const bundleConfig = require("../static/vue/dll/bundle-config.json");
const publicPath = '/';  // 正式的时候配置CDN域名

const webpackConfig = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: publicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('style/[name].[contenthash].css'),
      allChunks: true,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          //drop_console: true  //no console
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      dllPathJs: publicPath + utils.assetsPath("dll/" + bundleConfig.vendor.js)
    })
  ]
});


module.exports = webpackConfig;


