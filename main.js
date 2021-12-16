const {app, BrowserWindow, /*session*/} = require('electron')
const https = require('follow-redirects').https;
const path = require('path');
const fs = require('fs');
const AdmZip = require("adm-zip");

const zip = 'https://docs.google.com/spreadsheets/d/1-BuF9tmzmS9vNit6lKD3-Pihis83q6HMP1TtYhQ73bA/export?format=zip'

const zipFile = fs.createWriteStream("answers.zip");
let unparsedAnswers;

https.get(zip, function (response) {
    response.pipe(zipFile)
    zipFile.on('finish', () => {
        zipFile.close()
        console.log("Answers are downloaded")
        let zip = new AdmZip("./answers.zip");
        let zipEntries = zip.getEntries();
        zipEntries.forEach(function (zipEntry) {
            if (zipEntry.entryName === "Комп. графика.html") {
                unparsedAnswers = zipEntry.getData().toString("utf8");
                if (!win.webContents.isLoading()) {
                    parseAnswersInDom()
                }
            }
        });
    })
});

let answers;

let taskScam;
let testScam;
let parseAnswers;

fs.readFile(path.resolve(__dirname, "taskScam.js"), 'utf-8', function (err, content) {
    if (err) {
        console.log(err.stack);
    }
    taskScam = content
});

fs.readFile(path.resolve(__dirname, "testScam.js"), 'utf-8', function (err, content) {
    if (err) {
        console.log(err.stack);
    }
    testScam = content
});

fs.readFile(path.resolve(__dirname, "parseAnswers.js"), 'utf-8', function (err, content) {
    if (err) {
        console.log(err.stack);
    }
    parseAnswers = content
})


let win;

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    fs.unlink("answers.zip", () => {
    })
    app.quit()
})

app.on('quit', () => {
    fs.unlink("answers.tsv", () => {
    })
    app.quit()
})

function createWindow() {
    win = new BrowserWindow({width: 1000, height: 1000, webPreferences: {webSecurity: false}})

    win.webContents.on('dom-ready', (() => scam()))

    win.webContents.on('page-title-updated', (() => scam()))

    /*session.defaultSession.clearStorageData([], function (data) { //for development purposes only
        console.log('cleared');
    })*/

    win.loadURL('https://courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/progress')
}

function scam() {
    if (!answers && unparsedAnswers) {
        parseAnswersInDom()
    }
    if (win.webContents.getTitle().toLowerCase().includes("задание") && win.webContents.getURL().includes("courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/courseware")) {

        let code = taskScam;
        win.webContents.insertCSS(css);
        win.webContents.executeJavaScript(code).then(r => {
            console.log(r)
        }).catch(err => {
            console.log(err.stack)
        })
    }
    if (win.webContents.getTitle().toLowerCase().includes('контрольный тест') && win.webContents.getURL().includes("courses.openedu.ru/courses/course-v1:spbstu+COMPGR+fall_2021/courseware") || win.webContents.getTitle().toLowerCase().includes('финальное тестирование')) {
        let code = `var answers = ${answers.print()};${testScam}`;
        setTimeout(() => {
            win.webContents.executeJavaScript(code).then(r => {
                console.log(r)
            }).catch(err => {
                console.log(err.stack)
            })
        }, 2000);
    }
}

function parseAnswersInDom() {
    win.webContents.executeJavaScript(`var unparsed = \`${unparsedAnswers}\`;${parseAnswers}`).then(r => {
        answers = r;
        answers.print = function () {
            var data = "[";
            answers.forEach((a) => {
                if (a) {
                    data += `{question: \`${a[0]}\`, answer: \`${a[1]}\`},`
                }
            });
            data += "]";
            return data;
        };
    }).catch(err => {
        console.log(err.stack)
    });
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


