const { app,BrowserWindow,Menu ,ipcMain} = require("electron");
const { dialog } = require('electron');
const path = require('path');

var fs = require('fs');

var canvasBuffer = require('electron-canvas-to-buffer');


function saveCallback(filePath) {
  let canvas = document.createComment("canvas") ;
  const url = canvas.get('image/jpg', 0.8);
}


let mainWindow = null;

 // Menu
const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
        { role: 'close' }
    ]
  },
  {
    label: 'Images',
    submenu: [
    {label: 'Load Image',
    click () {
      console.log(dialog.showSaveDialog({title:'Testing a save dialog',defaultPath:'image.jpg'},saveCallback));
      }
    }]
  }]
 app.on("ready",()=>{
   const menu = Menu.buildFromTemplate(template);
   Menu.setApplicationMenu(menu);
   mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true
  },
  
   });
    
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  
  mainWindow.loadURL(`file://${__dirname}/index.html`)  ;
  mainWindow.maximize();
  if(process.platform === "darwin"){
    app.dock.setIcon (path.join(__dirname, '/icons/icon.png'));
  }
 })