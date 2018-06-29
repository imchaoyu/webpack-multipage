const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

// 去除冗余css
const PruifyCssWebpack = require('purifycss-webpack');
// html模版
const HtmlWebpackPlugin = require('html-webpack-plugin');
// copy静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 获取自配置的moudle.rules
const RuleConfig = require('./webpack.rule.config.js');
/**
 * html-webpack-plugin 获取多文件方法
 * @param {*} name 文件名称
 * @param {*} chunks chunk
 */
var getHtmlConfig = function (name, chunks) {
  return {
    template: `./src/pages/${name}/${name}.html`,
    filename: `${name}.html`,
    inject: true,
    // hash: true,
    chunks: chunks,
    minify: process.env.NODE_ENV === 'development' ? false : {
      removeComments: true, // 移除html注释
      collapseWhitespace: true, //删除空白符与换行
      removeAttrributeQuotes: true //去除属性引号
    }
  }
}

module.exports = {
  entry: {
    // 将所有css和js打包成一个文件，可使用单一入口
    //main: './src/js/index.js'
    index: './src/pages/index/index.js',
    vipcard: './src/pages/vipcard/vipcard.js',
    quesitions: './src/pages/quesitions/quesitions.js',
    adviser: './src/pages/adviser/adviser.js'
  },
  resolve: {
    extensions: ['.js', '.css', '.json'],
    alias: {
      '@': path.join(__dirname, '..', 'src')
    }
  },
  module: {
    rules: [...RuleConfig]
  },
  // 防止jQuery被打包
  // externals: {
  //   jquery:'window.jQuery'
  // },
  plugins: [
    // 
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // copy静态资源
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../src/temp"),
      to: './temp',
      ignore: ['.*']
    }]),
    // 清除冗余css
    new PruifyCssWebpack({
      paths: glob.sync(path.join(__dirname, './src/pages/**/*.html'))
    })
  ],
  // 提取js， vendor名字可改
  optimization: {
    removeEmptyChunks: false, //移除空chunks 
    splitChunks: {
      cacheGroups: {
        // 提取所有公共部分代码，命名为vendor
        vendor: {
          //test: /\.js$/,
          // test: path.resolve(__dirname, '../node_modules'),
          chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
          name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
          minChunks: 3,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
}

//配置页面
const htmlArray = [{
    template: 'index',
    title: '首页',
    chunks: ['vendor','index']
  },
  {
    template: 'vipcard',
    title: 'vip',
    chunks: ['vendor','vipcard']
  },
  {
    template: 'quesitions',
    title: '问卷调查',
    chunks: ['vendor','quesitions']
  },
  {
    template: 'adviser',
    title: '置业顾问',
    chunks: ['vendor','adviser']
  }
];

//自动生成html模板
htmlArray.forEach((element) => {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element.template, element.chunks)));
})