const {
  contextBridge,
  ipcRenderer,
  shell
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "ipc", {
      send: (channel, data) => {
        ipcRenderer.send(channel, data);
      },
      on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
      },
      once: (channel, func) => {
        ipcRenderer.once(channel, (event, ...args) => func(event, ...args));
      }
  }
);
