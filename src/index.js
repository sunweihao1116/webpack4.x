// const str = () => import(/* webpackChunkName: "a" */ './assets/js/a'); /* webpackPrefetch: true */ // 预加载
// import add from './assets/js/a';
// eslint-disable-next-line no-undef
// const str = require('./assets/js/a');
import str from './assets/js/a';
require('./assets/css/index.css'); // import css会分文件打包
require('./assets/css/index.less');
////////////////////////////////
// 图片引入
// 1. js创建image引入；
// 2. css background: url();引入
// html <img src=''> 引入

import WillettEvegarden from './assets/images/紫罗兰永恒花园1.jpg'; 
let img = new Image();
// img.src = './assets/images/紫罗兰永恒花园1.jpg'; // 只能识别出字符串不会打包
img.src = WillettEvegarden;
document.body.appendChild(img);

////////////////////////////////
console.log(`hello ${str}`);
////////////////////////////////
const fn = () => {
  console.log('babel-loader es6转es5 fn()');
};
fn();
////////////////////////////////
class A {
  constructor() {
    this.x = 'aaa';
  }
}
const a = new A();
console.log('class语法转低级语法_classCallCheck-------', a.x);
////////////////////////////////
// console.log('全模块组册$--------', $);
////////////////////////////////
