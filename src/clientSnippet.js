const newContent = document.createElement('h1');
newContent.setAttribute(
  'style',
  'width: calc(100% - 4rem); height: calc(100% - 4rem); margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; color: white; background-color: #35363a; font-family: monospace;'
);
newContent.textContent = 'You are now free to press any button you like :)';
document.querySelector('html').replaceWith(newContent);

const ws = new WebSocket('wss://your.domain:8080');
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
