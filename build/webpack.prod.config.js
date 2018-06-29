const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
// css压缩
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
// image压缩
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfigBase = require('./webpack.base.config.js');
const webpackConfigProd = {
  mode: 'production',
  devtool: 'cheap-souce-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].[chunkhash].min.js',
    publicPath: './'
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true, //开启控制台输出信息
      dry: false
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].min.css',
      allChunks: true
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].css",
    // }),
    new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      }
    }),
    new UglifyjsPlugin({
      uglifyOptions: {
        compress: {
          dead_code: true, //移除没被引用的代码
          warnings: false, //当删除没有用处的代码时，显示警告
          loops: true, //当do、while 、 for循环的判断条件可以确定是，对其进行优化
          drop_debugger: false,
          drop_console: true
        },
        except: ['$super', '$', 'exports', 'require']  //混淆,并排除关键字
      }
    })
  ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd)