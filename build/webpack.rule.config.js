const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = [{
    test: /\.(css|scss|sass)$/,
    // 区别开发环境和生产环境
    use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader', 'postcss-loader'],
      // css基础路径
      publicPath: '../'
    })
  }, {
    test: /\.js$/,
    use: ['babel-loader'],
    exclude: '/node_modules/',
    include: path.resolve(__dirname,'src/')
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      outputPath: 'images'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  },
  {
    test: /\.html$/,
    use: ['html-withimg-loader']
  }
]
module.exports = rules;