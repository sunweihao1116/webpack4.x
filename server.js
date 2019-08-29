// 创建express服务

const express = require('express'); // webpack内带，免安装
const app = express();
// 服务端启动webpack
// const webpack = require('webpack');
// const middle = require('webpack-dev-middleware');
// const config = require('./webpack.config.js');
// const compiler = webpack(config);

// app.use(middle(compiler))
app.get('/api/user', (req, res) => { // api 接口
  res.json({ name: 'lalala' });
});

app.listen(3000);