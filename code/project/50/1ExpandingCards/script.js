const panels = document.querySelectorAll('.card-item');

// forEach参数是函数
panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active') // addEventListener绑定事件，panel dom已经保存下来可以直接用
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active');
    })
}