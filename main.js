const{app,BrowserWindow,ipcMain}=require("electron")
//require("electron-reload")(__dirname)
require("electron-reload")(__dirname, {
    electron:require(`${__dirname}/node_modules/electron`)})
const path=require("path")
const fs=require("fs")
//Important. Clean up imports so it doesn't slow down loading times.

var win=[]
function popout(bounds,page){
    win[win.length]=new BrowserWindow({
        width:bounds[0],
        height:bounds[1],
        frame:false,
        show:false,
        backgroundColor:"#383838",
        webPreferences:{
            nodeIntegration:false,
            contextIsolation:true,
            enableRemoteModule:false,
            preload:path.join(__dirname,"resources/preload.js")}})
        win[win.length-1].loadFile(path.join(__dirname,page))
        setTimeout(function(){win[win.length-1].show()}),500}
async function main(){popout([580,300],"index.html")}
app.on("ready",main)
ipcMain.on("minimize",()=>{BrowserWindow.getFocusedWindow().minimize()})
ipcMain.on("maximize",()=>{BrowserWindow.getFocusedWindow().maximize()})
ipcMain.on("close",()=>{BrowserWindow.getFocusedWindow().close()})
ipcMain.on("popout",(events,args)=>{popout([400,220],args)})
ipcMain.on("save",(events,args)=>{
    win=BrowserWindow.getAllWindows().at(-1).webContents
    win.executeJavaScript("console.group('Saving')")
    win.executeJavaScript("console.info('Saving in progress...')")         
    var p=path.join(__dirname,"temp/text.txt")
    if(args) 
        fs.writeFile(p,args,(e)=>{
            if(e)return})
    else
        fs.readFile(p,(e,data)=>{
            if(e)return})
    //if(!temp.path(args["name"]))popout([580,300],"resources/folders.html")
    //else{
    win.executeJavaScript("console.info('Saving completed.')")
    win.executeJavaScript("console.groupEnd()")})
ipcMain.on("load",()=>{})