const PROT = 8080;

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('./cert.pem'),
  key: fs.readFileSync('./key.pem'),
});

const wss = new WebSocket.WebSocketServer({ server });
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
    try {
      const dataObj = JSON.parse(data.toString());
      if (
        host != undefined &&
        host !== ws &&
        host.readyState === WebSocket.OPEN &&
        dataObj.type != undefined
      ) {
        host.send(JSON.stringify(dataObj));
      }
    } catch (e) {}
  });
});

server.listen(PROT);
