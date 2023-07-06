const DOMAIN_OR_IP = 'your.domain';
const PORT = 8080;

const newContent = document.createElement('html');
newContent.setAttribute(
  'style',
  'width: calc(100% - 4rem); height: calc(100% - 4rem); margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; color: white; background-color: #35363a; font-family: monospace;'
);
newContent.innerHTML = '<h1>You are now free to press any button you like :)</h1>';
document.querySelector('html').replaceWith(newContent);

const ws = new WebSocket('wss://' + DOMAIN_OR_IP + ':' + PORT);
const eventHandler = (event) => {
  if (event.repeat) return;

  const data = {
    type: event.type,
    key: event.key,
    keyCode: event.keyCode,
    which: event.which,
    code: event.code,
    location: event.location,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    repeat: event.repeat,
  };
  ws.send(JSON.stringify(data));
};

document.addEventListener('keydown', eventHandler);
document.addEventListener('keyup', eventHandler);
