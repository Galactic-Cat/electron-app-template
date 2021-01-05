import { app, BrowserWindow } from 'electron'
import { BrowserWindowConstructorOptions } from 'electron/main'
import Store from 'electron-store'

let mainWindow: BrowserWindow

function createWindow(): void {
    let options: BrowserWindowConstructorOptions = {
        backgroundColor: '#191919',
        frame: false,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    }

    const storage = new Store()
    mainWindow = new BrowserWindow(Object.assign(options, storage.get('hidden.windowBoundries', { width: 800, height: 600 })))

    mainWindow.loadFile('index.html')

    mainWindow.once('ready-to-show', mainWindow.show)

    mainWindow.on('close', () => storage.set('hidden.windowBoundries', mainWindow.getBounds()))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})

app.on('activate', () => {
    if (mainWindow == null)
        createWindow()
})
