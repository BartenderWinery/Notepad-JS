const {
    contextBridge,
    ipcRenderer
} = require("electron")

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = "minimize;maximize;close;popout;save";
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)}}})