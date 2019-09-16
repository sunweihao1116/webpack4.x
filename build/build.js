const webpack = require('webpack');
const ora = require('ora');
const chalk = require('chalk')
const webpackConfig = require('../webpack.config');

process.env.NODE_ENV = 'production';
const spinner = ora('building for production...');
spinner.start();
console.log('process.argv--------------', process.argv); //命令行数组

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err

  process.stdout.write(stats.toString({ // 待分析
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})