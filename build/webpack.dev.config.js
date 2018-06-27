const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config.js');
const webpackConfigDev = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].bundle.js'
  },
  module: {
    rules: []
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    publicPath: '/',
    host: '127.0.0.1',
    port: '8081',
    overlay: true, // 浏览器页面上显示错误
    open: true, //打开页面
    hot: true //开启热更新
  }
}
module.exports = merge(webpackConfigBase, webpackConfigDev);
