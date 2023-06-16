// JSX 通过构建工具 Babel 转换成 JS，将标签中的代码替换成 createElement，并把标签名、参数和子节点作为参数传入
/* const element = <h1 title="foo">Hello</h1>
const element = React.createElement(
    "h1",
    { title: "foo" },
    "Hello"
)*/
// createElement验证入参并生成了一个对象，element 是一个带有 type 和 props 的对象
// 入参中的 children 使用 剩余参数 , 这样 children 参数永远是数组
function createElement(type, props, ...children) {
    return {
        type, // h1
        props: {
            ...props, // { title: "foo" }
            children: children.map(child =>
                typeof child === "object"
                    ? child // 数组
                    : createTextElement(child) // strings、numbers 这样的基本值
            ),
        },
    }
}

function createTextElement(text) {
    return {
        // React 对于一个基本值的子元素，不会创建空数组也不会包一层 TEXT_ELEMENT，这里为了简化代码
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

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

    // 对每一个子节点递归地做相同的render处理，但是递归会造成阻塞
    element.props.children.forEach(child =>
        render(child, dom)
    )
    // 通过fiber改造
    // 创建根fiber，将其设为 nextUnitOfWork 作为第一个任务单元，剩下的任务单元会通过 performUnitOfWork 函数完成并返回

    container.appendChild(dom)
}

// 需要将整个任务分成一些小块，每当我们完成其中一块之后需要把控制权交给浏览器，让浏览器判断是否有更高优先级的任务需要完成
let nextUnitOfWork = null

function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) { // 当前帧还有剩余时间
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        ) // 完成传入的任务并返回下一个任务，下一个任务在下一次执行，这样就可以不断遍历任务
        // timeRemaining获取到当前帧剩余时间
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}
// 可以类比成 setTimeout，浏览器来决定什么时候运行回调函数，而不是 settimeout 里通过我们指定的一个时间
// React 并不是用 requestIdleCallback 的，使用自己编写的 scheduler package。 但两者概念上是相同的
requestIdleCallback(workLoop)

// 不仅需要执行每一小块的任务单元，还需要返回下一个任务单元
/*每个 fiber 节点完成下述三件事：
把 element 添加到 DOM 上
为该 fiber 节点的子节点新建 fiber
挑出下一个任务单元*/
function performUnitOfWork(nextUnitOfWork) {
    // TODO
}

// Didact 作为我们自己写的库名
const Didact = {
    createElement, // 解析JSX
    render, // 渲染函数
}

// 这样注释一下，babel 会将 JSX 编译成我们需要的函数
/** @jsx Didact.createElement */
const element = (
    <div id="foo">
        <a>bar</a>
        <b/>
    </div>
)
const container = document.getElementById("root")
Didact.render(element, container)
