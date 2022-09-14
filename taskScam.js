function waitForIFrame() {
    return new Promise(resolve => {
        if (getIframe(false)) {
            return resolve(getIframe(false));
        }
        let timerId = setInterval(() => {
            if (getIframe(false)) {
                clearInterval(timerId)
                return resolve(getIframe(false));
            }
        }, 1000);
    });
}

function getIframe(log = true) {
    try {
        let t = document.getElementsByTagName("iframe")
        return t[0].contentDocument.getElementsByTagName("iframe")[0]
    } catch (e) {
        if (log) {
            console.info(e.stack)
            console.info("Couldn't download 3D modeling answers. Please, contact the developer")
        }
        return null
    }
}

function getRealDoc() {
    let iframe = document.getElementsByTagName("iframe")[0]
    if (iframe) {
        return iframe.contentDocument
    } else {
        return null
    }
}

let button = document.createElement("button");
button.innerText = "Scam!";
button.onclick = function () {
    if (getRealDoc().getElementById('myModal')) {
        getRealDoc().getElementById('myModal').parentElement.removeChild(getRealDoc().getElementById('myModal'))
    }
    let mutationsEnabled = getRealDoc().getElementById('mutations').children[0].checked;
    let mutations = [];
    let e, t = getIframe();
    try {
        e = t.contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")
    } catch (n) {
        e = t.contentWindow.OpenJsCad.Processor.prototype.getFullScript("model")
        console.log("3D modeling answers are downloaded")
    }
    let n = js_beautify(e.split("\n").slice(2)[0]).split("\n"), l = [], c = !1;
    for (let e = 0; e < n.length; e++) {
        if (n[e].includes("grid")) {
            c = true
        } else {
            if (!c || n[e].includes("pos")) {
                c = false;
                l.push(n[e]);
                if (n[e].includes(';') && !n[e].includes('return') && !n[e].includes('if') && mutationsEnabled && Math.floor(Math.random() * 2)) {
                    let mutation = makeid(6);
                    mutations.push(mutation)
                    l.push(`var ${mutation} = ${Math.floor(Math.random() * 100) / 10};`);
                    Math.floor(Math.random() * 2) ? l.push(`${mutation} +=${Math.floor(Math.random() * 42) + 0.32};`) : console;
                    Math.floor(Math.random() * 2) ? l.push(ifMutation(mutation, mutations)) : console;
                }
            }
        }
    }
    l[l.length - 1] = "}()";
    let s = document.createElement("div");
    s.id = "myModal";
    let o = document.createElement("div");
    o.className = "modal-content";
    let i = document.createElement("button");
    i.className = "close";
    i.innerHTML = "&times;";
    o.appendChild(i);
    let z = document.createElement("button");
    z.id = "pasteButton";
    z.innerText = "Paste in editor";
    o.appendChild(z);
    o.innerHTML += "<p>The scam was successful</p><p>Result:</p>";
    for (let e = 0; e < l.length; e++) o.innerHTML += `<p>${l[e]}</p>`;
    s.appendChild(o);
    let fullscrin_ = getRealDoc().getElementById("fullscrin");
    if (!fullscrin_) fullscrin_ = getRealDoc().querySelector('.problem-progress');
    fullscrin_.insertAdjacentElement("afterend", s);
    getRealDoc().getElementById('pasteButton').onclick = function () {
        getIframe().contentWindow.putSourceInEditor(l.join("\n"));
        getRealDoc().getElementsByClassName('close')[0].click();
        getRealDoc().getElementById('check').style.display = 'block';
    };
    getRealDoc().getElementsByClassName("close")[0].onclick = function () {
        getRealDoc().getElementById("myModal").style.display = "none"
    }
};
let script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.0/beautify.min.js";
document.body.insertAdjacentElement("afterbegin", script);
console.log("js-beautifier was added");
let check = document.createElement('button');
check.innerText = 'Check Result!';
check.id = 'check';
check.style.display = 'none';
check.onclick = function () {
    let t = getIframe();
    t.contentDocument.getElementById('modelrender').click();
    t.contentDocument.getElementById('viewupdate').click();
    t.contentDocument.getElementById('controlentity').click();
    getRealDoc().getElementsByClassName('submit')[0].click()
};

waitForIFrame().then(r => {
    let fullscrin = getRealDoc().getElementById("fullscrin");
    if (!fullscrin) fullscrin = getRealDoc().querySelector('.problem-progress');
    fullscrin.parentElement.insertBefore(button, fullscrin.nextSibling);
    button.insertAdjacentElement('afterend', check);
    let mutations = document.createElement('label');
    mutations.id = 'mutations';
    mutations.innerHTML = '<input type="checkbox"/>Enable code mutations';
    button.insertAdjacentElement('afterend', mutations);
})

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        i === 0 ?
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength)) : result += charactersD.charAt(Math.floor(Math.random() *
                charactersLength));
    }
    return result;
}

function ifMutation(mutation, mutations) {
    return `if (${mutation} >= ${Math.floor(Math.random() * 100) / 10}) {
     ${mutation} = ${mutations[Math.floor(Math.random() * mutations.length)]} * ${Math.floor(Math.random() * 42) + Math.random()};
     ${mutations[Math.floor(Math.random() * mutations.length)]} = 0;
     } else {
     ${mutations[Math.floor(Math.random() * mutations.length)]} = ${mutation}
     }`
}

console.log("Script has been successfully injected");
