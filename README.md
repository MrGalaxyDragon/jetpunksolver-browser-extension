# jetpunksolver-browser-extension

This is a browser extension to automatically solve [JetPunk](https://www.jetpunk.com/) Quizzes.

## Getting Started

To start automatically solving [JetPunk](https://www.jetpunk.com/) Quizzes, you can follow the steps below.

### Requirements

- [![Git](https://img.shields.io/badge/Git-gray?logo=git)](https://git-scm.com/)
- [![Node.js](https://img.shields.io/badge/Node.js-gray?logo=nodedotjs)](https://nodejs.org/en)
- [![npm](https://img.shields.io/badge/npm-gray?logo=npm)](https://www.npmjs.com/)
- Browser:
    - [![Google Chrome](https://img.shields.io/badge/Google_Chrome-gray?logo=googlechrome)](https://www.google.com/intl/en_us/chrome/)
    - [![Microsoft Edge](https://img.shields.io/badge/Microsoft_Edge-gray?logo=msedge)](https://www.microsoft.com/en-us/edge/)

### Installation

1. Clone [this repository](https://github.com/MrGalaxyDragon/jetpunksolver-browser-extension):
    ```sh
    git clone https://github.com/MrGalaxyDragon/jetpunksolver-browser-extension.git
    ```
2. Install dependencies:
    ```sh
    npm i
    ```
3. Build the browser extension:
    ```sh
    npm run build
    ```

### Usage

To use this browser extension, go to your browser and into the extensions tab.
You can either go there by navigating through the options or by entering one of the following urls:
- `chrome://extensions/` for Google Chrome
- `edge://extensions/` for Microsoft Edge

Then, activate the **Developer mode** and click on **Load unpacked**.
Select the [dist](/dist) folder and apply.

Tutorials for adding a browser extension in Developer mode can be found here:
- [browser extension for Google Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)
- [browser extension for Microsoft Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions/getting-started/picture-viewer-popup-webpage)