import './style';
import axios from 'axios';

window.cancel = null;
const CancelToken = axios.CancelToken;

const fetch = (url, params = {}, method = 'GET') => {
  const config = {
    url,
    method: method.toLocaleUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    cancelToken: new CancelToken(function executor(c) {
      if (!window.cancel) {
        console.log('!null');
        window.cancel = c;
      } else {
        console.log('null');
        window.cancel();
        window.cancel = c;
      }
      // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
    })
  };
  if (config.method === 'GET' || config.method === 'DELETE') {
    config.params = params;
  } else {
    config.data = params;
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      resolve(res.data);
      window.cancel = null;
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
      window.cancel = null;
      reject(error);
    })
  })
};

// server
const login = params => fetch('/api/v1/login', params, 'POST');
const getList = params => fetch('/api/v1/list', params);

// login
const params = {
    user_name: 'sjx',
    password: 'sjx1314',
}
login(params).then(res => {
  console.log('success', res);
}).catch(err => {
  console.log('error', err);
});


setTimeout(() => {
  // getlist
  getList().then(res => {
    console.log('listres', res);
  }).catch(err => {
    console.log('listerr', err);
  });
});