import './style';
import { getUserInfo, login } from './server';
import { setCookie } from './utils/cookie';
// login 
const params = {
    user_name: 'sjx',
    password: 'sjx1314',
}
login(params).then(res => {
  console.log('success', res);
  // window._token = res.token;
  setCookie('webpack_token', res.token);
  getUserInfo().then(r => {
    console.log(r);
  }).catch(e => {
    console.log(e);
  })
}).catch(err => {
  console.log('error', err);
});




// setTimeout(() => {
//   // getlist
//   getList().then(res => {
//     console.log('listres', res);
//   }).catch(err => {
//     console.log('listerr', err);
//   });
// });