const WebSocket = require('ws');

// const server = createServer({
//   cert: readFileSync('./cert.pem'),
//   key: readFileSync('./key.pem'),
// });
// const wss = new WebSocketServer({ server });

const wss = new WebSocket.WebSocketServer({ port: 8080 });
let host;

wss.on('connection', function connection(ws, req) {
  let clientType;
  if (req.url?.includes('host')) {
    host = ws;
    clientType = 'Host';
  } else {
    clientType = 'Client';
  }
  console.log(clientType + ' connected with IP: ' + req.socket.remoteAddress);

  ws.on('error', console.error);
  ws.on('message', function message(data) {
    const dataObj = JSON.parse(data.toString());
    if (host != undefined && host !== ws && host.readyState === WebSocket.OPEN) {
      host.send(JSON.stringify(dataObj));
    }
  });
});

// server.listen(443);
