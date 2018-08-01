'use strict'
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',

  entry: [
    './src/app.js'
  ],
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
            test: /\.mp3$/,
            loader: 'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            // other vue-loader options go here
            loaders: {
            },
            transformToRequire: {
                "audio": "src"
            }
        }
      },
      {
      test: /\.css?$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'stylus-loader'
      ]
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
}
