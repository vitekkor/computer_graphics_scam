window.yaContextCb=window.yaContextCb||[]
let ya = document.createElement("script");
ya.src = "https://yandex.ru/ads/system/context.js"
ya.async = true
document.head.insertAdjacentElement("beforeend", ya);
document.head.insertAdjacentElement("beforeend", ya);

let yaDiv = document.createElement("div")
yaDiv.id = "yandex_rtb_R-A-1952775-1"

let notifications = document.getElementsByClassName("notification-tray-container")
if (!notifications[0]) {
    let notification = document.createElement("section")
    notification.classList.add("notification-tray-container", "ml-0", "ml-lg-4")
    notification.ariaLabel = "Панель уведомлений"
    document.getElementsByClassName("sequence")[0].insertAdjacentElement("afterend", notification)
}

document.getElementsByClassName("notification-tray-container")[0].insertAdjacentElement("beforeend", yaDiv)

let yaDiv2 = document.createElement("div")
yaDiv2.id = "yandex_rtb_R-A-1952775-2"

yaDiv.insertAdjacentElement("afterend", yaDiv2)

let yaDiv3 = document.createElement("div")
yaDiv3.id = "yandex_rtb_R-A-1952775-3"

yaDiv2.insertAdjacentElement("afterend", yaDiv3)

window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
        renderTo: yaDiv.id,
        blockId: 'R-A-1952775-1'
    })
})

window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
        renderTo: yaDiv2.id,
        blockId: 'R-A-1952775-2'
    })
})

window.yaContextCb.push(()=>{
    Ya.Context.AdvManager.render({
        renderTo: yaDiv3.id,
        blockId: 'R-A-1952775-3'
    })
})