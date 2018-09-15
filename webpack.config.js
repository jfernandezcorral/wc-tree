const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
module.exports = (env, argv) => {
  let config = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: 'index.min.js',
      libraryTarget: "umd",
      library: 'tree',
      umdNamedDefine: true,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js','.css', '.scss'],
        alias: {
          'servicios': argv.mock? path.resolve(__dirname,'./src/components/servicios-mock.js') : path.resolve(__dirname,'./src/components/servicios.js'),
          //cmp: path.resolve(__dirname,'./client/componentes'),
          //cl: path.resolve(__dirname,'./client')
        }
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {loader: "babel-loader"}
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
                loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
            test: /\.(png|gif|svg)$/,
            use: [
                {
                  loader: 'url-loader'
                }
              ]
          }
      ]
    },
    plugins: [
      new DuplicatePackageCheckerPlugin({ emitError: true }),
      //new webpack.BannerPlugin(package.name+' '+package.version),
      new CleanWebpackPlugin(['lib'])
    ]
  };
  if (argv.mode === 'development') {
    //console.log(JSON.stringify(argv, null, 4))
    //console.log(JSON.stringify(env, null, 4))
    config.devtool = 'none';
    config.output.filename = 'index.js';
  }
  return config;
};
