// const str = () => import(/* webpackChunkName: "a" */ './assets/js/a') /* webpackPrefetch: true */ // 预加载
const str = require('./assets/js/a');
require('./assets/css/index.css'); // import会分文件打包
require('./assets/css/index.less')

console.log(`hello ${str}`);