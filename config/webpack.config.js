const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlArray = require('./page.config.js');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  // devtool: 'eval-source-map',
  entry: {
    // main: './src/index.js'
    index: './src/pages/index/index.js',
    vipcard: './src/pages/vipcard/vipcard.js',
    quesitions: './src/pages/quesitions/quesitions.js',
    adviser: './src/pages/adviser/adviser.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:6].js',
    clean: true,
  },
  resolve: {
    extensions: ['js', 'json', 'css'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname,'src/'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              // 编译 CSS 的 `@import` 
              // 如果需要在每个 CSS 的 `@import` 上运行 `sass-loader` 和 `postcss-loader`，请将其设置为 `2`
              importLoaders: 1,
            },
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|gif|jpe?g)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:4][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset',
        generator: {
          filename: 'font/[name].[contenthash:4][ext]'
        }
      },
      // {
      //   test: /\.html$/,
      //   type: "asset",
      //   generator: {
      //     filename: "pages/[name][ext]",
      //   },
      // },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: true,
        },
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: './css/[name][contenthash:4].css'
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
  },
  devServer: {
    static: path.join(__dirname, '../src'),
    hot: true,
    compress: true,
    port: 8888,
  }
}

//自动生成html模板
htmlArray.forEach((ele) => {
  const cfg = {
    template: `./src/pages/${ele.template}/${ele.template}.html`,
    filename: `${ele.template}.html`,
    title: ele.title,
    inject: true,
    chunks: ele.chunks
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(cfg));
})
