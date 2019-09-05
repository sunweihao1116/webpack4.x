## webpack 安装
- 安装本地的webpack
- webpack webpack-cli -D
- webpack-dev-server -D

## webpack可以进行0配置
- 打包工具 -> 输出后的结果 (js模块)
- 打包 （支持我们的js模块化）

## 手动配置webpack
- 默认配置文件夹名字webpack.config.js
- entry
- output
- mode - production ,development
- module.rules = []
- plugins
- devServer
- optimization

## 配置index.html模版（html-webpack-plugin）
```
  new htmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    minify: {}, // options
    hash: true,
  })
```

## 配置loader
- css-looader style-loader  less-loader
- postcss-loader autoprefixer 需创建postcss.config.js

## 配置css压缩plugins
- MiniCssExtractPlugin
- OptimizeCssAssetsWebpackPlugin
- TerserJSPlugin
```
optimization: { // 优化项
    minimizer: [
      new TerserJSPlugin({}), // https://www.npmjs.com/package/mini-css-extract-plugin
      new OptimizeCssAssetsWebpackPlugin({}), // 压缩css
    ]
  },
```

## 配置babel-loader
- 安装babel-loader， @babel/core， @babel/preset-env， es6转es5
- 识别不同高级语法需要对应不同的plugin。

## 配置eslint
- 安装eslint, eslint-loader
- 创建.eslintrc.josn  .eslintignore

## 全局变量引入
- expose-loader(内联loader) ： import $ from 'expose-loader?$!jquery'; //会暴露到window对象上
- webpack配置rules 
  ```
  {
    test: require.reslove('jquery'),
    use: 'expose-loader?$',
  }
  ```
- pulgins配置 // 在所有模块中注入 $
  ```
    new Webpack.ProvidePlugin({
      $: 'jquery' // 需要npm install
    })
  ```
- cdn 引入 不进行打包操作
 ```
 externals: {
   jquery: 'jquery'
 }
 ```

 ## 图片文件处理
 - file-loader 
 - html-withimg-loader <img src='url' /> 路径引用
 - 现用url-loader options


 ## 多页面应用，多个HtmlWebpackPlugin
 - chunks

## devtool配置 此选项控制是否生成，以及如何生成 source map。
- source-map  增强调试过程
- https://webpack.docschina.org/configuration/devtool/#devtool

## watch 监听文件变化，当它们修改后会重新编译。
- 实时打包
- watchOptions 监控选项

## 常用小插件
- CopyWebpackPlugin ...
- DefinePlugin BannerPlugin webpack内置

## 跨越问题
- 1) devServer.porxy 配置代理
- 2）devServer.before(app) {} // 单纯模拟数据接口
- 3） webpack-dev-middleware中间件完成服务端启用前端webpack
  ```
    const express = require('express'); // webpack内带，免安装

    // 服务端启动webpack
    const webpack = require('webpack');
    const middle = require('webpack-dev-middleware');
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    const app = express();
    app.use(middle(compiler))
    app.get('/user', (req, res) => { // api 接口
      res.json({ name: 'lalala' });
    })

    app.listen(3000);
  ```

  ## resolve 解析
  - alias 创建 import 或 require 的别名 '@': './src';
  - extensions 自动解析确定的扩展 ['.css', '.js', '.vue', '.json', '*'];
  - modules: ['node_modules'] 告诉 webpack 解析模块时应该搜索的目录;
  - ...
