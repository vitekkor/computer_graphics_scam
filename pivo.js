let scriptQr = document.createElement("script");
scriptQr.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js";
document.body.insertAdjacentElement("afterbegin", scriptQr);

setTimeout(() => {
    let s = document.createElement("div");
    s.id = "myModal";
    s.className = "modal-window"
    let title = document.createElement("div");
    title.className = "modal-window__title"
    let qr = document.createElement("div");
    qr.style.align = "center"
    new QRCode(qr, "https://www.tinkoff.ru/cf/5RmrFwtJ4F9");
    let pivo = document.createElement("h4");
    pivo.innerHTML = "Разработчику на пиво <3";
    title.appendChild(pivo);
    let p = document.createElement("p");
    p.innerHTML = "Вот тут ниже qr-код, по которому ты можешь перевести мне деньги и поддержать разработку данного ПО. " +
        "Я потратил немало времени, чтобы ты мог легко списывать этот курс. " +
        "Так что надеюсь ты отблагодаришь меня за мой труд."
    let p2 = document.createElement("p");
    let img = document.createElement("img")
    img.src = "https://sun9-11.userapi.com/impf/c851420/v851420471/1f0336/w8lFMaioIzA.jpg?size=604x593&quality=96&sign=73f83ecb07f9d3eef70fe116e79114ab&type=album"
    img.height = 150
    let img2 = document.createElement("img")
    img2.src = "https://sun9-61.userapi.com/impg/6cVyhEfxkHZjo0rv53Xkpp99j3zecmOGgKn0pQ/MtqLkVQXYmY.jpg?size=810x1080&quality=96&sign=2dc600c43eab3899971e9179a40c17d3&type=album"
    img2.height = 150
    img2.style.paddingLeft = "10px"
    p2.appendChild(img)
    p2.appendChild(img2)
    let close = document.createElement("a")
    close.href = "#"
    close.className = "modal-close"
    close.innerHTML = "Закрыть"
    close.onclick = function () {
        s.classList.remove('show');
    }

    s.appendChild(title);
    s.appendChild(p);
    s.appendChild(p2)
    s.appendChild(qr);
    s.appendChild(close)

    document.getElementById("main-content").insertAdjacentElement("beforebegin", s);
    s.classList.add("show");
}, 2000);

