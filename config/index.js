
const prodEnv = require('./prod.env');
const devEnv = require('./dev.env');
const path = require('path');

module.exports = {
  dev: {
    proxy: {
      // 1)
      '/api': {
        target: 'http://localhost:3000', // 配置代理
        // pathRewrite: {'^/api' : ''}, //重写请求路径
      },
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
        secure: false,
        pathRewrite: {'^/ws' : ''}, //重写请求路径
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
    assetsSubDirectory: './',
    host: 'localhost',
    port: devEnv.PORT,
    autoOpenBrowser: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
  },
  build: {
    index: path.resolve(__dirname, `../dist/index.html`),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: `static`,
    assetsPublicPath: `/`,
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
}