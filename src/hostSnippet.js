const DOMAIN_OR_IP = 'your.domain';
const PORT = 8080;

const ws = new WebSocket('wss://' + DOMAIN_OR_IP + ':' + PORT + '?host');
ws.onmessage = function message(event) {
  const data = JSON.parse(event.data);
  document.dispatchEvent(new KeyboardEvent(data.type, data));
};
