## 零: 概览

用 “element” 来代指 React Element， 用 “node” 来代指 DOM Element

```jsx
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)

// 不使用 React 的情况下，渲染
// JSX 通过构建工具 Babel 转换成 JS，将标签中的代码替换成 createElement，并把标签名、参数和子节点作为参数传入
// React.createElement 验证入参并生成了一个对象
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello", // 一般情况下，是一个由元素组成的数组。由此 element 的结构形成了一个树
  },
}

const container = document.getElementById("root")

const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("")
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)
```

## Step I: The `createElement` Function

```jsx
// 这样注释一下，babel 会将 JSX 编译成我们需要的函数
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
ReactDOM.render(element, container)

const element = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
)

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      // children 数组中也可能有像 strings、numbers 这样的基本值
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
// Didact 作为我们自己写的库名.
const Didact = {
  createElement,
}

const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)
```

## Step II: The render Function

暂时只关心如何在 DOM 上添加东西，之后再考虑 更新 和 删除

```jsx
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
ReactDOM.render(element, container)

function render(element, container) {
  // 当 element 类型是 TEXT_ELEMENT 的时候我们创建一个 text 节点而不是普通的节点
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
  // 把 element 的属性赋值给 node
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  // 对每一个子节点递归地做相同的处理
  element.props.children.forEach(child =>
    render(child, dom)
  )
  container.appendChild(dom)
}

const Didact = {
  createElement,
  render,
}
```

Step III: Concurrent Mode



Step IV: Fibers



Step V: Render and Commit Phases



Step VI: Reconciliation



Step VII: Function Components



Step VIII: Hooks

