//
// http:localhost:8080 -> 代理3000
// http-proxy
const xhr = new XMLHttpRequest();

xhr.open('GET', '/api/user', true);

xhr.onload = function() {
  console.log('sss', xhr.response);
}

xhr.send();