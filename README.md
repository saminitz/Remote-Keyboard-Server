<!-- ABOUT THE PROJECT -->
## About The Project

You want to be able to use your own keyboard in a remote browser of your friend?
Then you have found the right place.
With this project you will be able to listen to every keystroke from one or more browsers (`clients`) and play back all pressed keys on another browser (`host`)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy of the server up and running follow these steps.

### Prerequisites

You need to have NodeJS installed on your PC. If you already have npm you can use the following command to ensure you are up to date

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/saminitz/Remote-Keyboard-Server.git
   ```
2. Navigate into the cloned repository
    ```sh
    cd Remote-Keyboard-Server
    ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the server
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

**Replace in both snippets the IP accordingly**

### Host

Paste the following code in the DOM Console of the host (You can open it in most browsers with `F12`)
```js
const ws = new WebSocket('ws://127.0.0.1:8080?host');
ws.onmessage = function message(event) {
  const data = JSON.parse(event.data);
  document.dispatchEvent(new KeyboardEvent(data.type, data));
};
```

### Clients

Paste the following code in the DOM Console of the client (You can open it in most browsers with `F12`)
```js
const newContent = document.createElement('h1');
newContent.setAttribute(
  'style',
  'width: calc(100% - 4rem); height: calc(100% - 4rem); margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; color: white; background-color: #35363a; font-family: monospace;'
);
newContent.textContent = 'You are now free to press any button you like :)';
document.querySelector('html').replaceWith(newContent);

const ws = new WebSocket('ws://127.0.0.1:8080');
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
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[Node.js]: https://img.shields.io/badge/NodeJS-20232A?style=for-the-badge&logo=nodedotjs
[NodeJS-url]: https://nodejs.org/