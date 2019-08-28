
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Webpack = require('webpack');

module.exports = {
  mode: 'development', // development production
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].min.js',
    // publicPath: './static',
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        // sourceMap: true,
      }),
      new OptimizeCssAssetsWebpackPlugin({}),
    ]
  },
  // externals: { //配合cdn引入事操作 //不进行打包操作
  //   jquery: 'jquery',
  // },
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
            loader: 'babel-loader', //es6转es5
            options: {
              // presets: [
              //   '@babel/preset-env', //es6转es5
              // ],
              // plugins: [
              //   '@babel/plugin-proposal-class-properties', // 识别class语法
              //   '@babel/plugin-transform-runtime',
              // ],
            },
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
    new htmlWebpackPlugin({
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