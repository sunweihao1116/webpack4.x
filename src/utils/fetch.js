import axios from 'axios';
import { getCookie } from '../utils/cookie';

window._cancel = null;
const CancelToken = axios.CancelToken;

const fetch = (url, params = {}, method = 'GET', tokenType = '') => {
  const config = {
    url,
    method: method.toLocaleUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    tokenType,
    cancelToken: new CancelToken(function executor(c) {
      if (!window._cancel) {
        console.log('!null');
        window._cancel = c;
      } else {
        console.log('null');
        window._cancel();
        window._cancel = c;
      }
      // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
    })
  };
  if (config.method === 'GET' || config.method === 'DELETE') {
    config.params = params;
  } else {
    config.data = params;
  }
  if (config.tokenType) {
    const token = getCookie(config.tokenType) || '';
    if (token) {
      config.headers['Authorization'] = token;
    } else {
      console.log('token is nil');
      return;
    }
  }  
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      resolve(res.data);
      window._cancel = null;
    }).catch(err => {
      let error = {
        message: '网络错误',
      }
      if (err && err.response && err.response.data) {
        const d = err.response.data;
        error = {
          message: d.message,
          httpstatus: d.errCode,
        };
      }
      window._cancel = null;
      reject(error);
    });
  });
}

export const fetchData = (url, params, method) => fetch(url, params, method);
export const fetchToken = (url, params, method) => fetch(url, params, method, 'webpack_token');
