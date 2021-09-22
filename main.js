const {app, BrowserWindow} = require('electron')

let win;

app.whenReady().then(() => {
    createWindow()
})

function createWindow() {
    win = new BrowserWindow({width: 1000, height: 1000, webPreferences: {webSecurity: false}})

    win.webContents.on('dom-ready', (() => scam()))

    win.loadURL('https://courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/progress')
}

function scam() {
    if (win.webContents.getTitle().includes("Задание") && win.webContents.getURL().includes("courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/courseware")) {
        let code = `let button=document.createElement("button");button.innerText="Scam!",button.onclick=function(){var e="",t=document.getElementsByTagName("iframe");if(t.length>0)try{e=t[0].contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")}catch(n){e=t[0].contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")}let n=js_beautify(e.split("\\n").slice(2)[0]).split("\\n"),l=[],c=!1;for(let e=0;e<n.length;e++)n[e].includes("grid")?c=!0:c&&!n[e].includes("pos")||(c=!1,l.push(n[e]));l[l.length-1]="}()";var s=document.createElement("div");s.id="myModal";var o=document.createElement("div");o.className="modal-content";var i=document.createElement("span");i.className="close",i.innerHTML="&times;",o.appendChild(i),o.innerHTML+="<p>The scam was successful</p><p>Result:</p>";for(let e=0;e<l.length;e++)o.innerHTML+=\`<p>\${l[e]}</p>\`;s.appendChild(o),document.getElementById("fullscrin").insertAdjacentElement("afterend",s),document.getElementsByClassName("close")[0].onclick=function(){document.getElementById("myModal").style.display="none"}};var script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify.min.js",document.body.insertAdjacentElement("afterbegin",script);let fullscrin=document.getElementById("fullscrin");fullscrin.parentElement.insertBefore(button,fullscrin.nextSibling)`
        win.webContents.insertCSS(css);
        setTimeout(() => {
            win.webContents.executeJavaScript(code).then(r => {
                console.log(r)
            }).finally(() => {
            })
        }, 2000);
    }
}

const css = `.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}`


