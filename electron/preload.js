// electron/preload.js

// Import necessary modules from Electron.
import { contextBridge, ipcRenderer } from 'electron';

// Use contextBridge to safely expose APIs to the renderer process.
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Exposing a simple function to send a "ping" message to the main process.
  ping: () => {
    // Send an IPC message named "ping" to the main process.
    ipcRenderer.send('ping');
  },

  // Example: Exposing a function to listen for "pong" messages from the main process.
  onPong: (callback) => {
    // Listen for IPC messages named "pong" and execute the callback when received.
    ipcRenderer.on('pong', callback);
  },

  // Add more APIs as needed:
  // - You can expose functions to interact with the file system, system dialogs, etc.
  // - Always follow the principle of least privilege: only expose necessary APIs.
  // - Sanitize and validate any data received from the renderer process.
});

// Important Security Considerations:
// - contextBridge ensures that the renderer process cannot directly access Node.js APIs.
// - This helps prevent security vulnerabilities like cross-site scripting (XSS) attacks.
// - Always be mindful of the security implications when exposing Node.js functionality.
// - Avoid exposing sensitive APIs or data unless absolutely necessary.
// - Carefully validate and sanitize any data received from the renderer process.