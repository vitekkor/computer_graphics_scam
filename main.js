const {app, BrowserWindow, /*session*/} = require('electron')
const https = require('follow-redirects').https;
const fs = require('fs');

const url = `https://docs.google.com/spreadsheets/d/1-BuF9tmzmS9vNit6lKD3-Pihis83q6HMP1TtYhQ73bA/export?format=tsv&id=1-BuF9tmzmS9vNit6lKD3-Pihis83q6HMP1TtYhQ73bA&gid=0`;

let answers
const file = fs.createWriteStream("answers.tsv");
const request = https.get(url, function (response) {
    response.pipe(file)
    file.on('finish', () => {
        file.close()
        console.log("downloaded")
        fs.readFile("answers.tsv", 'utf-8', function (err, content) {
            answers = content.split('\r\n').slice(1).map((str) => {
                var data = str.split('\t');
                return {question: data[0], answer: data[1]}
            });
            answers.print = function () {
                var data = "[";
                answers.forEach((a) => {
                    if (a) {
                        data += `{question: \`${a.question}\`, answer: \`${a.answer}\`},`
                    }
                });
                data += "]";
                return data;
            };
            console
        })
    })
});


let win;

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    fs.unlink("answers.tsv", () =>{})
    app.quit()
})

function createWindow() {
    win = new BrowserWindow({width: 1000, height: 1000, webPreferences: {webSecurity: false}})

    win.webContents.on('dom-ready', (() => scam()))

    /*session.defaultSession.clearStorageData([], function (data) { //for development purposes only
        console.log('cleared');
    })*/

    win.loadURL('https://courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/progress')
}

function scam() {
    if (win.webContents.getTitle().includes("Задание") && win.webContents.getURL().includes("courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/courseware")) {
        let code = `let button=document.createElement("button");button.innerText="Scam!",button.onclick=function(){var e="",t=document.getElementsByTagName("iframe");if(t.length>0)try{e=t[0].contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")}catch(n){e=t[0].contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")}let n=js_beautify(e.split("\\n").slice(2)[0]).split("\\n"),l=[],c=!1;for(let e=0;e<n.length;e++)n[e].includes("grid")?c=!0:c&&!n[e].includes("pos")||(c=!1,l.push(n[e]));l[l.length-1]="}()";var s=document.createElement("div");s.id="myModal";var o=document.createElement("div");o.className="modal-content";var i=document.createElement("span");i.className="close",i.innerHTML="&times;";o.appendChild(i);var z=document.createElement("button");z.id="pasteButton";z.innerText="Paste in editor";o.appendChild(z);o.innerHTML+="<p>The scam was successful</p><p>Result:</p>";for(let e=0;e<l.length;e++)o.innerHTML+=\`<p>\${l[e]}</p>\`;s.appendChild(o);document.getElementById("fullscrin").insertAdjacentElement("afterend",s);document.getElementById('pasteButton').onclick=function(){document.getElementsByTagName("iframe")[0].contentWindow.putSourceInEditor(l.join("\\n"));document.getElementsByClassName('close')[0].click();document.getElementById('check').style.display='block';};document.getElementsByClassName("close")[0].onclick=function(){document.getElementById("myModal").style.display="none"}};var script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify.min.js";document.body.insertAdjacentElement("afterbegin",script);let check=document.createElement('button');check.innerText='Check Result!';check.id='check';check.style.display='none';check.onclick=function(){ var t=document.getElementsByTagName('iframe')[0]; t.contentDocument.getElementById('modelrender').click(); t.contentDocument.getElementById('viewupdate').click();t.contentDocument.getElementById('controlentity').click(); document.getElementsByClassName('submit')[0].click()};let fullscrin=document.getElementById("fullscrin");fullscrin.parentElement.insertBefore(button,fullscrin.nextSibling);button.insertAdjacentElement('afterend', check);`
        win.webContents.insertCSS(css);
        setTimeout(() => {
            win.webContents.executeJavaScript(code).then(r => {
                console.log(r)
            }).finally(() => {
            })
        }, 2000);
    }
    if (win.webContents.getTitle().includes('Контрольный тест') && win.webContents.getURL().includes("courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/courseware")) {
        let code = `console.warn("!!!");var questions = Array.from(document.getElementsByClassName('problem-header'));var answers = ${answers.print()};questions.forEach((q) => { if (q) { var regex = new RegExp(q.innerText, "i"); var answer = answers.find((ans) => { return regex.test(ans.question) }); if (answer) { var ans = document.createElement('p'); ans.innerText = \`Answer: \${answer.answer}\`; q.insertAdjacentElement('afterend', ans); try { var el = Array.from(Array.from(q.parentElement.children).find((e) => {return e.className === 'problem'}).children[0].children[0].children[0].children[0].children).find((div) => { if (div.nodeName !== 'SPAN') { var r = new RegExp(answer.answer, "i"); return r.test(div.children[0].innerText) }}).children[0]; if(!el.children[0].checked) el.children[0].click(); } catch (e) { answer.answer.split(', ').forEach((a) => { if (a) { try { var el = Array.from(Array.from(q.parentElement.children).find((e) => {return e.className === 'problem'}).children[0].children[0].children[0].children[0].children).find((div) => {if (div.nodeName !== 'SPAN') { var r = new RegExp(a, "i"); return r.test(div.children[0].innerText) }}).children[0]; if(!el.children[0].checked) el.children[0].click(); } catch (ee) {}}}) } } } });`
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


