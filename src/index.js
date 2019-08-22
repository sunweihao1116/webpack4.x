// const str = () => import(/* webpackChunkName: "a" */ './assets/js/a') /* webpackPrefetch: true */ // 预加载
// eslint-disable-next-line no-undef
const str = require('./assets/js/a');
require('./assets/css/index.css'); // import会分文件打包
require('./assets/css/index.less')

console.log(`hello ${str}`);

const fn = () => {
  console.log('fn()');
}
fn();

class A {
  constructor() {
    this.x = 'aaa';
  }
}
const a = new A();

console.log(a.x);