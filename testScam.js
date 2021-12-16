(function testScam() {
    if (document.getElementsByClassName('testScam').length) {
        console.log("Answers already added")
        return;
    }
    var questions = Array.from(document.getElementsByClassName('problem-header'));
    console.log('Questions:');
    console.log(questions);
    if (answers.length === 0) {
        console.error('Has no answers');
    } else questions.forEach((q) => {
        if (q) {
            //var regex = new RegExp(q.innerText, "i");
            var answer = answers.filter((ans) => {
                return q.innerText.toLowerCase().includes(ans.question.toLowerCase())
            });
            if (answer.length) {
                var ans = document.createElement('div');
                ans.className = 'testScam';
                ans.innerHTML = `Answer: ${answer.map(e => e.answer).join("<div style='font-weight: bold'>ANOTHER ANSWER:</div>")}`;
                q.insertAdjacentElement('afterend', ans);
                /* auto-select answer
                try {
                    var el = Array.from(Array.from(Array.from(q.parentElement.children).find((e) => {
                        return e.className === 'problem'
                    }).children[0].children).filter((p) => {
                        return p.tagName.toLowerCase() === 'div'
                    })[0].children[0].children[0].children).find((div) => {
                        if (div.nodeName !== 'SPAN') {
                            var r = new RegExp(answer.answer, "i");
                            return r.test(div.children[0].innerText)
                        }
                    }).children[0];
                    if (!el.children[0].checked) el.children[0].click();
                } catch (e) {
                    answer.answer.split(', ').forEach((a) => {
                        if (a) {
                            try {
                                var el = Array.from(Array.from(q.parentElement.children).find((e) => {
                                    return e.className === 'problem'
                                }).children[0].children[0].children[0].children[0].children).find((div) => {
                                    if (div.nodeName !== 'SPAN') {
                                        var r = new RegExp(a, "i");
                                        return r.test(div.children[0].innerText)
                                    }
                                }).children[0];
                                if (!el.children[0].checked) el.children[0].click();
                            } catch (ee) {
                                console.log(ee.stack)
                            }
                        }
                    })
                }*/
            }
        }
    });
})();