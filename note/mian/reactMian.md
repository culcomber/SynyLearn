## 组件基础

### 1、React 事件

```jsx
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
```

**处理流程**

- “**顶层注册**”，其实是在root元素上绑定一个统一的事件处理函数。而不是在元素本身绑定事件处理函数。

  ![Event listener added by react on root node](../assets/eqr3z4s0mgs9btxsrfo8.png)

- **事件代理**：对于不存在冒泡阶段的事件，React只委托了捕获阶段的监听器，而对于其他的事件，则对于捕获阶段和冒泡阶段都委托了监听器。

- **“事件收集**”指的是事件触发时（实际上是root上的事件处理函数被执行）

- **构造合成事件对象**，按照冒泡或捕获的路径去组件中收集真正的事件处理函数。

- “**统一触发**”发生在收集过程之后，对所收集的事件逐一执行，并共享同一个合成事件对象。这里有一个重点是绑定到root上的事件监听并非我们写在组件中的事件处理函数

  ![Gif of the process to get listeners](../assets/1nzvmya0ehqjpfo0ezr0.gif)

**区别**

- `React16`中，对`document`的事件委托都委托在冒泡阶段，当事件冒泡到`document`之后触发绑定的回调函数，在回调函数中重新模拟一次 **捕获-冒泡** 的行为，所以React事件中的`e.stopPropagation()`无法阻止原生事件的捕获和冒泡，因为原生事件的捕获和冒泡已经执行完了。

- `React17`中，对React应用根DOM容器的事件委托分别在捕获阶段和冒泡阶段

  - 当根容器接收到捕获事件时，先触发一次React事件的捕获阶段，然后再执行原生事件的捕获传播。所以React事件的捕获阶段调用`e.stopPropagation()`**能**阻止原生事件的传播。

  - 当根容器接受到冒泡事件时，会触发一次React事件的冒泡阶段，**此时原生事件的冒泡传播已经传播到根了**，所以React事件的冒泡阶段调用`e.stopPropagation()`**不能**阻止原生事件向根容器的传播，但是能阻止根容器到页面顶层的传播。

**为什么React实现了自己的事件机制**

- 将事件都代理到了根节点上，减少了事件监听器的创建，节省了内存

- 磨平浏览器差异，开发者无需兼容多种浏览器写法。如想阻止事件传播时需要编写`event.stopPropagation()` 或 `event.cancelBubble = true`，在React中只需编写`event.stopPropagation()`即可。

- 对开发者友好。只需在对应的节点上编写`onClick`、`onClickCapture`等代码即可完成click事件在该节点上冒泡节点、捕获阶段的监听，统一了写法。
- 方便 react 统一管理和事务机制。

**React的事件和普通的HTML事件有什么不同？**

- 对于事件名称命名方式，原生事件为全小写，react 事件采用小驼峰；

- 对于事件函数处理语法，原生事件为字符串，react 事件为函数；
- react 事件不能采用 `return false` 的方式来阻止浏览器的默认行为，而必须要地明确地调用`preventDefault()`来阻止默认行为。

**正确绑定`this`**

- render方法中使用bind

- render方法中使用箭头函数

- constructor中bind

- 定义阶段使用箭头函数绑定

  ```jsx
  handleClick() {
  	console.log('this > ', this);
  }
  
  <div onClick={handleClick.bind(this)}>test</div>
  <div onClick={e => handleClick(e)}>test</div>
  handleClick = () => {
  	console.log('this > ', this);
  }
  ```

  

参考：

[React17事件机制](https://juejin.cn/post/7164582718053810184)

[「react进阶」一文吃透react事件系统原理](https://juejin.cn/post/6955636911214067720?searchId=2023072420425497B8B45C32F441E8ABD4)

[深入React合成事件机制原理](https://segmentfault.com/a/1190000039108951)

### 2、高阶组件、Render props、hooks 区别



