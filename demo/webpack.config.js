const path = require('path');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = env => {
  let config = {
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname,'./dist'),
      filename: 'index_bundle.js'
    },
    devServer: {
      host: "0.0.0.0",
      proxy: {
        '/tabit':{
          target: "http://tabit-epd.cm.es/api/1.0/sap/tabit/",
          pathRewrite: {"^/tabit" : ""}
        },
        '/api': {
          target: "http://iob.ms.epd.bankia.int:41180",
        },
        '/tas':{
          target: "http://tasap-epd.ms.bankia.int:8080/",
          pathRewrite: {"^/tas" : ""}
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader:'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg)(\?[\s\S]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }]
        }
      ]
    },
    plugins: [
      new DuplicatePackageCheckerPlugin({ emitError: true }),
      HtmlWebpackPluginConfig
    ]
  };
  return config;
};