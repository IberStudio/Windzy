const { app, BrowserWindow, screen, ipcMain } = require('electron')
const { spawn, exec } = require('child_process')
const path = require('path')

let pythonProcess = null

function killPython() {
  if (pythonProcess) {
    // Force kill on Windows
    exec(`taskkill /PID ${pythonProcess.pid} /T /F`, (err) => {
      if (err) console.error('Failed to kill Python:', err)
    })
    pythonProcess = null
  }
}

function startPython() {
  // Point to venv python instead of global python
  const pythonPath = path.join(__dirname, '../Backend/venv/Scripts/python.exe')
  const scriptPath = path.join(__dirname, '../Backend/app.py')

  pythonProcess = spawn(pythonPath, [scriptPath])

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`)
  })

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`)
  })
}

function createWindow() {
    const { height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: 360,
        height: height,
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
          preload: path.join(__dirname, 'preload.js') // ← same folder as main.js
        }
    })

    
  win.webContents.openDevTools({mode: 'detach'})
  win.setIgnoreMouseEvents(true, { forward: true })
  win.loadURL('http://localhost:5173')
  // win.loadFile('../Frontend/dist/index.html')
}
  
ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.setIgnoreMouseEvents(ignore, { forward: true })
})

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow()?.close()
})

app.whenReady().then(() => {
  startPython()
  setTimeout(() => {
    createWindow()
  }, 2000)
})

// Kill Python when Electron closes
app.on('window-all-closed', () => {
  killPython()
  app.quit()
})

app.on('before-quit', () => {
  killPython()
})