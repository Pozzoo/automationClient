const { app, BrowserWindow, ipcMain } = require('electron')
const {createSocket} = require("node:dgram");
const path = require("node:path");

const socket = createSocket("udp4");
let port = 5700;
let address = '0.0.0.0';

const createWindow = () => {
    const window = new BrowserWindow({
        title: "Automation Client",
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    window.loadFile(path.join(__dirname, './renderer/views/index.html')).then();
    window.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('message', (event, args) => {
    socket.send(args, port, address);

    socket.on('message', (message) => {
        console.log(message.toString())

        event.sender.send("reply", message.toString());
    })
})






