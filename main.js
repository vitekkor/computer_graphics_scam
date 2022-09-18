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

let css;

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

fs.readFile(path.resolve(__dirname, "styles.css"), 'utf-8', function (err, content) {
    if (err) {
        console.log(err.stack);
    }
    css = content
})

let ya;

fs.readFile(path.resolve(__dirname, "ya.js"), 'utf-8', function (err, content) {
    if (err) {
        console.log(err.stack);
    }
    ya = content
});

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
app.commandLine.appendSwitch('disable-features', "CrossSiteDocumentBlockingAlways,CrossSiteDocumentBlockingIfIsolating")

function createWindow() {
    win = new BrowserWindow({width: 1000, height: 1000, webPreferences: {webSecurity: false}})

    win.webContents.on('dom-ready', (() => scam()))

    win.webContents.on('page-title-updated', (() => scam()))

    /*session.defaultSession.clearStorageData([], function (data) { //for development purposes only
        console.log('cleared');
    })*/

    win.loadURL('https://apps.openedu.ru/learning/course/course-v1:spbstu+COMPGR+fall_2022/progress')
}

const lab = ['задание', 'лабораторная работа']
const test = ['контрольный тест']

function isLab(title) {
    return lab.some((element) => {
        return title.includes(element)
    })
}

function isTest(title) {
    return test.some((element) => {
        return title.includes(element)
    })
}

function scam() {
    if (!answers && unparsedAnswers) {
        parseAnswersInDom()
    }
    if (isLab(win.webContents.getTitle().toLowerCase())) {
        let code = taskScam;
        code = code + '\n' + `waitForIFrame().then(r => {${ya}})`
        win.webContents.insertCSS(css);
        win.webContents.executeJavaScript(code).then(r => {
            console.log(r)
        }).catch(err => {
            console.log(err.stack)
        })
    }
    if (isTest(win.webContents.getTitle().toLowerCase())) {
        let code = `var answers = ${answers.print()};${testScam}`;
        code = code + '\n' + ya
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


