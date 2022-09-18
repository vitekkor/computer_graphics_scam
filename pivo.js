let scriptQr = document.createElement("script");
scriptQr.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js";
document.body.insertAdjacentElement("afterbegin", scriptQr);

let s = document.createElement("div");
s.id = "myModal";
s.className = "modal-window"
let title = document.createElement("div");
title.className = "modal-window__title"
let qr = document.createElement("div");
qr.style.align = "center"
new QRCode(qr, "https://www.tinkoff.ru/cf/5RmrFwtJ4F9");
let pivo = document.createElement("h3");
pivo.innerHTML = "Задонать на разработку";
let p = document.createElement("p");
p.innerHTML = "Вот тут ниже qr-код, по которому ты можешь перевести мне деньги. Я потратил немало времени, чтобы ты мог легко списывать этот курс. Так что надеюсь ты отблагодаришь меня за это (а иначе минус в карму)";

let close = document.createElement("a")
close.href = "#"
close.className = "modal-close"
close.innerHTML = "Закрыть"
close.onclick = function () {
    s.classList.remove('show');
}

s.appendChild(title);
s.appendChild(pivo);
s.appendChild(p);
s.appendChild(qr);
s.appendChild(close)

document.getElementById("main-content").insertAdjacentElement("beforebegin", s);
s.classList.add("show");

