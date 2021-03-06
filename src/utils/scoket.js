// const WSS_URL = `ws://localhost:8000`;
let Socket = '';
let setIntervalWesocketPush = null;

export function createSocket(WSS_URL) {
  if (!Socket) {
    console.log('建立websocket连接')
    Socket = new WebSocket(WSS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
/**打开WS之后发送心跳 */
export function onopenWS() {
  sendPing() //发送心跳
}
/**连接失败重连 */
export function onerrorWS() {
  clearInterval(setIntervalWesocketPush)
  Socket.close()
  createSocket() //重连
}
/**WS数据接收统一处理 */
export function onmessageWS(res) {
  console.log(res.data);
  // window.dispatchEvent(new CustomEvent('onmessageWS', {
  //   detail: {
  //     data: e
  //   }
  // }));
}
/**发送数据
 * @param eventType
 */
export function sendWSPush(eventTypeArr) {
  const obj = {
    appId: 'airShip',
    cover: 0,
    event: eventTypeArr
  };
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close();
    createSocket(); //重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj));
    }, 3000);
  }
}
/**关闭WS */
export function oncloseWS() {
  clearInterval(setIntervalWesocketPush);
  console.log('websocket已断开');
}
/**发送心跳 */
export function sendPing() {
  if (Socket.readyState === 1) {
    Socket.send('ping');
    setIntervalWesocketPush = setInterval(() => {
      Socket.send('ping')
    }, 5000);
  }
}
// createSocket('ws://localhost:8000');
// onopenWS();