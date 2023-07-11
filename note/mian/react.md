1、说说对 React 的理解？有哪些特性？

理解

- react之前是比较流行JQuery，封装了直接操作DOM的方法，通过改变DOM改变界面。React提供了一种新的模式，可以把React当作函数，通过传入不同的数据，展示不同的界面。

- [Declarative programming](https://react.dev/learn/reacting-to-input-with-state) means describing the UI for each visual state rather than micromanaging the UI (imperative).  这种思想就是去通过数据去描述用户界面，而不是直接操作用户界面。
- 框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。

特性

- 声明式编程 [Declarative programming](https://react.dev/learn/reacting-to-input-with-state) 

- Component structure 组件的思想，整个页面是由组件构成，组件可以重复利用方便管理代码
- Virtual DOM 
  - A virtual DOM object is a DOM object representation that creates a virtual copy of the original DOM object
  - 使用虚拟的Dom结构表示页面中渲染的真实Dom

- JSX (JavaScript Syntax Extension) 使用JS写HTML，让组件编写更方便
- One-way data binding 
  - keeps everything modular and fast.  increases the application's flexibility, which leads to increased efficiency
  - 数据只能从父组件传到子组件
  - 父组件state变化会重新渲染整颗树，如果子组件可以传数据给父组件，那么就会违背渲染规则 ==todo ?==


2、react与其他框架比较

**MVVM vs. Virtual DOM**

MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是[数据绑定](https://www.zhihu.com/search?q=数据绑定&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A53544875})：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 **O(watcher count)** 的代价；Knockout/Vue/Avalon 都采用了[依赖收集](https://www.zhihu.com/search?q=依赖收集&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A53544875})，在 js 和 DOM 层面都是 **O(change)**：

- 脏检查：scope digest **O(watcher count)** + 必要 DOM 更新 **O(DOM change)**
- 依赖收集：重新收集依赖 **O(data change)** + 必要 DOM 更新 **O(DOM change)**

**性能比较**

- 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
- 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
- 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化

3、说说 Real DOM 和 Virtual DOM 的区别？优缺点？

Real DOM

- *Document Object Model*：In simpler terms, it is a *structural representation of the HTML elements* of the web application

Virtual DOM

- The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called [reconciliation](https://legacy.reactjs.org/docs/reconciliation.html)

- 用JS模拟的DOM结构，将DOM变化的对比放在JS层来做，减少浏览器不必要的重绘，提高效率
- Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM.  Fiber 渲染虚拟Dom
- 1）不管数据变化多少，每次重绘的性能都可以接受；2) 依然可以用类似 innerHTML 的思路去写应用

[虚拟DOM并不比真实的DOM快](https://www.zhihu.com/question/31809713/answer/53544875)

- 当每一条数据都改变时，显然真实的DOM操作更快，因为虚拟DOM还存在js中diff算法的比对过程。所以，react性能优势仅仅适用于大量数据的渲染并且改变的数据只是一小部分的情况。

- innerHTML:  render html string **O(template size)** + 重新创建所有 DOM 元素 **O(DOM size)**

  Virtual DOM: render Virtual DOM + diff **O(template size)** + 必要的 DOM 更新 **O(DOM change)**

虚拟DOM优秀的地方在于:

- 它打开了函数式的UI编程的大门，即UI = f(data)这种构建UI的方式。

- 可以将JS对象渲染到浏览器DOM以外的环境中，也就是支持了跨平台开发，比如ReactNative。

4、diff算法

==todo==

5、说说 React 生命周期有哪些不同阶段？每个阶段对应的方法是？

Every React component goes through the same lifecycle:

- A component ***mounts*** when it’s added to the screen.
- A component ***updates*** when it receives new props or state, usually in response to an interaction.
- A component ***unmounts*** when it’s removed from the screen.

<img src="../assets/image-20230704001824045.png" alt="image-20230704001824045" style="zoom:80%;" />

6、React中的setState执行机制







参考

https://juejin.cn/post/6941546135827775525

https://github.com/sudheerj/reactjs-interview-questions

https://vue3js.cn/interview/React/React.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88

