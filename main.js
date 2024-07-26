const { app, BrowserWindow } = require('electron')
const {createSocket} = require("node:dgram");

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
        },
    })

    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    const json = '{"command":"get_all", "locate":"ar_guarita"}';
    socket.send(json, port, address);
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})






socket.on('message', (message) => {
    console.log(message.toString())
})