import './style';
// import { getUserInfo, login } from './server';
// import { setCookie } from './utils/cookie';
// login 
// const params = {
//     user_name: 'swh',
//     password: 'swh1116',
// }
// login(params).then(res => {
//   console.log('success', res);
//   setCookie('webpack_token', res.token, 1);
//   getUserInfo().then(r => {
//     console.log(r);
//   }).catch(e => {
//     console.log(e);
//   })
// }).catch(err => {
//   console.log('error', err);
// });

// getUserInfo().then(r => {
//   console.log(r);
// }).catch(e => {
//   console.log(e);
// });


// setTimeout(() => {
//   // getlist
//   getList().then(res => {
//     console.log('listres', res);
//   }).catch(err => {
//     console.log('listerr', err);
//   });
// });

/// 
import { createSocket, onopenWS } from './utils/scoket';
createSocket('ws://localhost:8080/ws');
onopenWS();