// https://webpack.docschina.org/configuration/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
// const Webpack = require('webpack');

module.exports = {
  mode: 'development', // development production
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].min.js',
    // publicPath: './static',
  },
  // resolve: { // 解析
  //   externals: ['.js'],
  //   alias: {
  //     '@': './src',
  //   }
  // }, 
  // watch: true,
  optimization: { // 优化项
    minimizer: [
      new TerserJSPlugin({
        // sourceMap: true,
      }),
      new OptimizeCssAssetsWebpackPlugin({}),
    ]
  },
  // externals: { // 外部扩展 //配合cdn引入事操作 //不进行打包操作
  //   jquery: 'jquery',
  // },
  // https://webpack.docschina.org/configuration/devtool/#devtool
  // devtool: 'scurce-map', // 源码映射，产生新的map文件, 显示行列                                  打包速度：慢
  // devtool: 'eval-source-map', // 不会产生单独的文件，但可以显示行列                              打包速度：慢
  // devtool: 'cheap-module-eval-source-map', // 不会产生单独的文件，集成在打包文件中，不会显示列。    打包速度：中等
  // devtool: 'cheap-module-source-map', // 不会显示列，但是是一个单独的文件                        打包速度：中等
  module: { //模块
    rules: [ //规则
      { 
        test: /\.(js|vue)$/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter'),
              enforce: 'pre',
              useEslintrc: true,
            },
          }
        ],
      },
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
      // 处理css
      { 
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      },
      // 处理图片
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name][hash:4].[ext]',
            limit: 100 * 1024,
            // outputPath: '', // 导出路径
            // pubilcPath: '', 单独加路径
          },
        }
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
    ],
  },
  plugins: [ // 所有webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[hash:8].css',
    }),
    // new Webpack.ProvidePlugin({ // 所有模块中注入$
    //   $: 'jquery',
    // }),
  ],
}