## webpack 安装
- 安装本地的webpack
- webpack webpack-cli -D

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
