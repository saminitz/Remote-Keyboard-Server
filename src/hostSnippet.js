const ws = new WebSocket('ws://127.0.0.1:3050?host');
ws.onmessage = function message(event) {
  const data = JSON.parse(event.data);
  document.dispatchEvent(new KeyboardEvent(data.type, data));
};
