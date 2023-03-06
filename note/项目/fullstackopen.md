## Part 0

在AJAX时代之前，页面上显示的所有数据都是通过服务器生成的HTML代码获取的。

AJAX能够使用包含在HTML中的JavaScript来获取网页内容，而不需要重新渲染网页。

## Part 1

### a React 简介

JSX

### b JavaScript

在使用React时，经常使用函数式编程的技术。函数式编程范式的一个特点是使用[不可变的](https://en.wikipedia.org/wiki/Immutable_object)数据结构。在React代码中，最好使用[concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)方法，该方法不会将项目添加到数组中，而是创建一个新的数组，其中同时包含旧数组和新项目的内容。

### c 组件状态，事件处理

```tsx
// App.js
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    // 当修改状态的函数setCounter被调用时，React重新渲染组件，这意味着组件函数的函数体被重新执行
    () => setCounter(counter + 1), // 重新执行App()
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

### d 深入React 应用调试

注意点

- 禁止直接改变状态(useState)

- Do not define components inside another component

调试

- `console.log('props value is', props)`

- 在代码的任何地方写下[debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)命令

<img src="../../../LearnNote/note/assets/image-20230304212658452.png" alt="image-20230304212658452" style="zoom:67%;" />

- 在*Sources*标签中添加断点来访问调试器

**Function that returns a function**

```tsx
const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => { // 工厂模式
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button> <!-- 当组件被渲染时，下面的函数被执行 -->
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
```

## Part 2

### a 从渲染集合到模块学习

循环

### b 表单

json-server是一个方便的工具，它能够在开发阶段使用服务器端的功能，而不需要对其进行任何编程

[fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)基于[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)，XHR使用的事件驱动模型

### c 从服务器获取数据

```
render 0 notes // 定义该组件的函数主体被执行，该组件被首次渲染
effect
promise fulfilled
render 3 notes // 对状态更新函数的调用会触发组件的重新渲染
```

<img src="../assets/image-20230307000943374.png" alt="image-20230307000943374" style="zoom:50%;" />

### d 在服务端将数据Alert出来



### e 给React应用加点样式

