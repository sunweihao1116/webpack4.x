// https://webpack.docschina.org/configuration/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

// 1) CopyWebpackPlugin // 复制文件到打包目录中
// 2) BannerPlugin 内置 // 在打包文件中添加声明
// 3) DefinePlugin 内置

module.exports = {
  mode: 'development', // development production
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:6].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].min.js',
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
    // 1)
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 配置代理
        // pathRewrite: {'^/api' : ''}, //重写请求路径
      },
    },
    // 2) 单纯模仿数据
    // before(app) {
    //   app.get('/user', (req, res) => { // api 接口
    //     res.json({ name: 's0130132' });
    //   });
    // },
    // 3） 服务端启动webpack middle = require('webpack-dev-middleware')中间件
    // compiler = webpack(config);
    // app.use(middle(compiler))
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
      filename: 'index.html',
    }),
    new Webpack.DefinePlugin({
      'process.env': '"sss"',
    }),
    new Webpack.BannerPlugin('webpack bannerPlugin'),
  ],
}