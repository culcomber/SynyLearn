const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

// 事件在按键被松开时触发
textarea.addEventListener('keyup', (e) => {
    // console.log(e);
    // 每次点击键盘都会触发
    createTags(e.target.value);

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    const tags = input.split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => tag.trim());

    tagsEl.innerHTML = '';

    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

function randomSelect () {
    const times = 30;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        if (randomTag !== undefined) {
            highlightTag(randomTag);

            setTimeout(() => {
                unHighlightTag(randomTag);
            }, 100)
        }
    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();
            highlightTag(randomTag);
        }, 100)
    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    // Math.floor() 函数总是返回小于等于一个给定数字的最大整数
    // Math.random() 函数返回一个浮点数，伪随机数在范围从0 到小于1，也就是说，从 0（包括 0）往上，但是不包括 1（排除 1）
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag (tag) {
    tag.classList.add('highlight');
}

function unHighlightTag (tag) {
    tag.classList.remove('highlight');
}