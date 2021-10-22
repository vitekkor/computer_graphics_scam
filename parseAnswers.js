let html = document.createElement('html');
html.innerHTML = unparsed;

var prepared = Array.from(html.getElementsByTagName('tr')).map(e => Array.from(e.getElementsByTagName('td')).filter(e => {
    return e.innerText !== '' || e.innerHTML.includes('img')
}).map(e => e.innerHTML)).filter(e => e.length > 0);

prepared.forEach((e, i, a) => {
    if (e.length === 1) {
        try {
            if (a[i + 1][0].includes('img')) {
                a[i + 1][0] = `${e[0]}\n${a[i + 1][0]}`;
                a.splice(i, 1);
            }
        } catch (e) {
            console.log(e.stack)
        }
    }
    if (e.length === 3) {
        e[1] = e[1] + e[2];
        a[i].splice(2, 1)
    }
});

prepared = prepared.filter(e => e.length === 2);

prepared
