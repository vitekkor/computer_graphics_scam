setTimeout(() => {
    window.yaContextCb = window.yaContextCb || []
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
        let sequence = document.getElementsByClassName("sequence")[0]
        if (!sequence) {
            try {
                let right = document.getElementsByClassName("col-12 col-md-4 p-0 px-md-4")[0]
                sequence = right.children[right.children.length - 1]
            } catch (e) {
                sequence = document.createElement("div")
                document.body.insertAdjacentElement("afterbegin", sequence)
            }
        }
        sequence.insertAdjacentElement("afterend", notification)
    }

    document.getElementsByClassName("notification-tray-container")[0].insertAdjacentElement("beforeend", yaDiv)

    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            renderTo: yaDiv.id,
            blockId: 'R-A-1952775-1',
            pageNumber: 1
        })
    })

    for (let i = 2; i <= 15; i++) {
        yaDiv = document.getElementById("yandex_rtb_R-A-1952775-" + (i - 1))
        let yaDiv2 = document.createElement("div")
        yaDiv2.id = "yandex_rtb_R-A-1952775-" + i
        yaDiv.insertAdjacentElement("afterend", yaDiv2)
        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                renderTo: yaDiv2.id,
                blockId: 'R-A-1952775-1',
                pageNumber: i
            })
        })
    }
}, 10000);