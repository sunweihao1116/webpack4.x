// https://webpack.docschina.org/configuration/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const config = require('./config');
const env = require('./config/prod.env');

// 1) CopyWebpackPlugin // 复制文件到打包目录中
// 2) BannerPlugin 内置 // 在打包文件中添加声明
// 3) DefinePlugin 内置

const assetsPath = (_path) => {
  const assetsSubDirectory = config.build.assetsSubDirectory;
  return path.join(assetsSubDirectory, _path);
}

module.exports = {
  mode: 'development', // development production
  entry: './src/index.js',
  output: {
    filename: assetsPath('[name].[hash:6].js'),
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: assetsPath('[name].min.js'),
    // publicPath: './static',
  },
  resolve: { // 解析
    extensions: ['.js', '.css', '.vue'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      '@': './src',
    }
  }, 
  devServer: {
    proxy: config.dev.proxy,
    port: config.dev.prot,
    host: config.dev.host,
    open: config.dev.autoOpenBrowser,
  },
  // watch: true,
  module: { //模块
    rules: [ //规则
       //es6转es5
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader', //es6转es5 https://babeljs.io/
            // options: .babelrc
          }
        ],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [ // 所有webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html', //dev
      // filename: config.build.index, // pro
    }),
    new Webpack.DefinePlugin({
      'process.env': env,
    }),
    new Webpack.BannerPlugin('webpack bannerPlugin'),
  ],
}