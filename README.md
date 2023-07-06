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

4. Generate private and public key
    * **Info:** If want to use  unsecure websockets and the website of the hots allows it checkout the branch `ws-unsecure`

    * I can recommend the following guide: [How to Generate Let’s Encrypt SSL using Certbot](https://tecadmin.net/how-to-generate-lets-encrypt-ssl-using-certbot/)

    * Place the private key in the root folder of this repository and name it `key.pem`
    * Place the public key in the root folder of this repository and name it `cert.pem`

5. Start the server
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### **!!! Important Informations !!!**
 * Replace `your.domain` in both snippets to the servers accordingly
 * If the website has an iframe element then the host needs to first view/open the iframe element in the DOM console. Otherwise the event listener will not work! (I don't exactly know the reason why this behavior is but i found out while testing)

### Host

Paste the following code in the DOM Console of the host (You can open it in most browsers with `F12`)
```js
const DOMAIN_OR_IP = 'your.domain';
const PORT = 8080;

const ws = new WebSocket('wss://' + DOMAIN_OR_IP + ':' + PORT + '?host');
ws.onmessage = function message(event) {
  const data = JSON.parse(event.data);
  document.dispatchEvent(new KeyboardEvent(data.type, data));
};
```

### Clients

Paste the following code in the DOM Console of the client (You can open it in most browsers with `F12`)
```js
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
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
