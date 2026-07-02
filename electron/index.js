const { app, BrowserWindow, screen, ipcMain } = require('electron')
const { spawn, exec } = require('child_process')
const path = require('path')
const http = require('http')

let pythonProcess = null
let mainWindow = null

function killPython() {
  if (pythonProcess) {
    exec(`taskkill /PID ${pythonProcess.pid} /T /F`, (err) => {
      if (err) console.error('Failed to kill Python:', err)
    })
    pythonProcess = null
  }
}


function startPython() {
  if (app.isPackaged) {
    const exePath = path.join(process.resourcesPath, 'backend', 'app.exe')
    pythonProcess = spawn(exePath)
  } else {
    // dev mode — use venv python
    const pythonPath = path.join(__dirname, '../Backend/venv/Scripts/python.exe')
    const scriptPath = path.join(__dirname, '../Backend/app.py')
    pythonProcess = spawn(pythonPath, [scriptPath])
  }

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`)
  })

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`)
  })
}

function waitForFlask(callback) {
  http.get('http://localhost:5000', () => {
    callback()
  }).on('error', () => {
    setTimeout(() => waitForFlask(callback), 500)
  })
}
const TASKBAR_RESERVED_HEIGHT = 8 

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().bounds
  const windowHeight = height - TASKBAR_RESERVED_HEIGHT

  const win = new BrowserWindow({
    width: width,
    height: windowHeight,
    x: 0,
    y: 0,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    win.loadFile(path.join(process.resourcesPath, 'frontend', 'index.html'))
  } else {
    win.loadURL('http://localhost:5173/')
  }

  win.moveTop()
  win.setAlwaysOnTop(true, 'modal-panel')

  // win.webContents.openDevTools({ mode: 'detach' })

  win.setIgnoreMouseEvents(true, { forward: true })

  mainWindow = win
}

ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return

  win.setIgnoreMouseEvents(ignore, { forward: true })

  if (!ignore) {
    win.setAlwaysOnTop(true, 'modal-panel')
    win.moveTop()
  }
})

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow()?.close()
})

app.whenReady().then(() => {
  startPython()
  waitForFlask(() => createWindow())
})

app.on('window-all-closed', () => {
  killPython()
  app.quit()
})

app.on('before-quit', () => {
  killPython()
})