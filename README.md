# React Desktop Application Template

This is a template for building cross-platform desktop applications using React, Electron, and Vite. It provides a fast and efficient development environment with a focus on security and best practices.

## Features

* **Vite for React:** Lightning-fast development experience with hot module replacement (HMR).
* **Electron:** Cross-platform desktop application framework.
* **Secure Defaults:** `contextIsolation: true` and `nodeIntegration: false` for enhanced security.
* **Preload Script:** `preload.js` for safe communication between the renderer and main processes.
* **Electron Builder:** Easy packaging and distribution for macOS, Windows, and Linux.
* **ES Module Support:** Modern JavaScript development.
* **Clear Project Structure:** Organized for maintainability.
* **Concurrent Development:** React and Electron run concurrently during development.
* **Linting:** Eslint configured for code quality.

## Getting Started

1.  **Clone the Repository:**

    ```bash
    git clone [repository URL]
    cd react-desktop-app-template
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Run in Development Mode:**

    ```bash
    npm run dev
    ```

    This will start both the Vite development server and the Electron application.

4.  **Build for Production:**

    ```bash
    npm run electron:build
    ```

    This will build the React application and package it into an executable for your operating system.

## Security

* **`contextIsolation: true`:** Prevents the renderer process from directly accessing Node.js APIs, improving security.
* **`nodeIntegration: false`:** Disables Node.js integration in the renderer process by default.
* **Preload Script:** Use the `preload.js` script to selectively expose Node.js APIs to the renderer process.
* **Principle of Least Privilege:** Only expose the APIs that are absolutely necessary.
* **Data Validation:** Sanitize and validate any data received from the renderer process.

**Important:** If you need to enable `nodeIntegration` or disable `contextIsolation`, carefully consider the security implications and implement appropriate safeguards.

## Preload Script (electron/preload.js)

The `preload.js` script is crucial for securely exposing Node.js APIs to your React application (renderer process). It acts as a bridge, allowing controlled communication between the main process and the renderer.

* **`contextBridge.exposeInMainWorld`:** This function is the cornerstone of secure API exposure. It creates a global object (`electronAPI` in this case) in the renderer process, allowing you to access the exposed functions.
* **`ipcRenderer`:** The `ipcRenderer` module is used for inter-process communication (IPC) between the renderer and main processes.
* **Example `ping` and `onPong`:** These functions demonstrate how to send and receive IPC messages.
* **Security Best Practices:** The comments in the script emphasize the importance of following security best practices:
    * Only expose necessary APIs.
    * Sanitize and validate data.
    * Be mindful of security implications.

In your React components, you can access the exposed APIs through the `window.electronAPI` object.

## Electron Main Process (electron/main.js)

The `electron/main.js` file is the entry point for your Electron application. It manages the application lifecycle, creates the main window, and handles inter-process communication.

* **`createWindow()`:**
    * Creates the main browser window with specified dimensions.
    * Configures `webPreferences`:
        * `preload`: Specifies the preload script (`preload.js`).
        * `nodeIntegration: false`: Disables Node.js integration in the renderer process (security best practice).
        * `contextIsolation: true`: Enables context isolation for enhanced security.
    * Loads the application:
        * In production (`app.isPackaged`), it loads the built HTML file from `../dist/renderer/index.html`.
        * In development, it loads the Vite development server (`http://localhost:5173`).
    * Adds error handling for production file loading.
    * Opens DevTools in development mode.
* **`app.whenReady().then(() => { ... })`:**
    * Executes `createWindow()` when Electron is ready.
    * Adds an `activate` event listener to create a new window if all windows are closed (macOS behavior).
* **`app.on('window-all-closed', () => { ... })`:**
    * Quits the application when all windows are closed (except on macOS).

## Electron Builder Configuration (build section in package.json)

The `build` section in your `package.json` file configures Electron Builder, which is used to package and distribute your application for various platforms.

* **`appId`**: A unique identifier for your application. **Important:** Change this to your own unique ID.
* **`directories`**: Specifies the directories for build resources and output.
* **`files`**: Includes the built React application and Electron files.
* **`mac`, `win`, `linux`**: Configures build settings for each platform.
* **`afterSign`**: Placeholder for macOS notarization.
* **`publish`**: Disables automatic publishing by default.

## Customization

* **`electron/main.js`:** Customize the Electron main process, window creation, and IPC communication.
* **`electron/preload.js`:** Expose Node.js APIs to the renderer process securely.
* **`src/`:** Develop your React application.
* **`vite.config.js`:** Configure Vite for your specific needs.
* **`package.json`:** Modify the build configuration, dependencies, and scripts.
* **Icons:** Place your app icons in the `build/icons` directory and configure the `icon` field in the `build` section of the package.json.

## Dependencies

* **Electron:** `^35.0.0`
* **Vite:** `^6.2.0`
* **React:** `^19.0.0`
* **Electron Builder:** `^25.1.8`
* **Concurrently:** `^9.1.2`
* **@vitejs/plugin-react:** `^4.3.4`
* **Eslint:** `^9.21.0`

## Updating Dependencies

* Use `npm outdated` to check for available updates.
* Run `npm update` to update dependencies to their latest compatible versions.
* Regularly review your dependencies and update them as needed.
* Consider using Dependabot or a similar tool to automate dependency updates.
* It is suggested to test the application after any dependency updates.

## Publishing

* Configure the `publish` section in the `build` section of your `package.json` for automatic publishing.
* For macOS, configure notarization using `electron-builder-notarize`.
* For Windows, codesigning is recommended.

## Linting

* Use `npm run lint` to run Eslint on the project.

## package.json scripts.

* **`dev`:** Starts the development environment.
* **`build`:** Builds the React application for production.
* **`lint`:** Runs Eslint on the code base.
* **`preview`:** Starts a local server to preview the production build.
* **`electron:build`:** Builds the React application and packages it into an Electron application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.