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
    filename: '[name].[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist/webpack4.x'), // 路径必须是一个绝对路径
    chunkFilename: '[name].min.js', // 分包名称
  },
  optimization: { // 优化项
    minimizer: [
      new TerserJSPlugin({}), // https://www.npmjs.com/package/mini-css-extract-plugin // 压缩js
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
      // style-loader 把css插入到head到标签中,可用MiniCssExtractPlugin.loader替换，打包成css文件，link引入
      // loader的特点 希望单一
      // loader的用法 字符串只用一个loader
      // 多个loader需要[]
      // loader的执行顺序 默认从左向右 从下向上
      // loader 还可以写成对象的方式
      {
        test: /\.css$/,
        use: [
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
      /** 
      minify: {
        collapseWhitespace: true, // 折叠文档树中文本节点的空白区域
        removeAttributeQuotes: true, // 删除引号
        removeComments: true, // 删除html里的注释
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
      */
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash:8].css',
    })
  ],
}