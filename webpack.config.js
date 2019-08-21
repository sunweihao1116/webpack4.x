// webpack 是node写出来的 node写法
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'buildle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), // 路径必须是一个绝对路径
  },
  optimization: { // 优化项
    minimizer: [
      // new UglifyJsPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      // }),
      new TerserJSPlugin({}), // https://www.npmjs.com/package/mini-css-extract-plugin
      new OptimizeCssAssetsWebpackPlugin({}), // 压缩css
    ]
  },
  // devServer: {
  //   port: 3000,
  //   progress: true, //进度条
  //   contentBase: './build',
  //   // compress: true,
  // },
  module: { //模块
    rules: [ //规则
      // css-loader 解析@import这种语法
      // style-loader 把css插入到head到标签中
      // loader的特点 希望单一
      // loader的用法 字符串只用一个loader
      // 多个loader需要[]
      // loader的执行顺序 默认从左向右 从下向上
      // loader 还可以写成对象的方式
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          // },
          MiniCssExtractPlugin.loader, // 将css打包成文件，link引入
          'css-loader',
          'postcss-loader',
        ]
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 将css打包成文件，link引入
          // {
          //   loader: 'style-loader',
          // },
          'css-loader',
          'postcss-loader',
          'less-loader', // 从下向上执行
        ]
      }
    ],
  },
  plugins: [ // 所有webpack插件
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // minify: {
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true,
      // },
      // hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash:8].css',
    })
  ],
}