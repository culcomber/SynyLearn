const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
  // toggle() 方法从列表中删除一个给定的标记并返回 false。如果标记不存在，则添加并且函数返回 true。
  // .active ?
  search.classList.toggle('active')
  input.focus()
})