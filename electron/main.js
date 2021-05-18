const { app, BrowserWindow } = require('electron')
const path = require('path')

// If development environment
if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true
    });
  } catch (error) { console.log(`Error: ${error.message}`); }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  void win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))

  if(process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
}

void app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
