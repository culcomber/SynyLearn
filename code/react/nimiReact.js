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
  };
}

// 创建 DOM 节点
function createDom(fiber) {
  // 当 element 类型是 TEXT_ELEMENT 的时候我们创建一个 text 节点而不是普通的节点
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // 把 element 的属性赋值给 node
  const isProperty = key => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    });
  return dom;
}

function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot; // 渲染染完，渲染树变成当下页面展示的树
  wipRoot = null;
}

// 比较新老 fiber 节点的属性， 移除、新增或修改对应属性
// 比较特殊的属性值是事件监听，如果属性值以 “on” 作为前缀，我们需要以不同的方式来处理这个属性
const isEvent = key => key.startsWith("on");
const isProperty = key => key !== "children" && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
// updateDom(fiber.dom, fiber.alternate.props, fiber.props)
function updateDom(dom, prevProps, nextProps) {
  // Remove old or changed event listeners 对应的监听事件如果改变了我们需要移除旧的
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        !(key in nextProps) ||
        isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.removeEventListener(
        eventType,
        prevProps[name]
      )
    })

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name
        .toLowerCase()
        .substring(2)
      dom.addEventListener(
        eventType,
        nextProps[name]
      )
    })

  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ""
    })

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}

// 递归地将所有节点添加到 dom 上
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    //  add this node
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // 需要更新已经存在的旧 DOM 节点的属性值
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    domParent.removeChild(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  // 对每一个子节点递归地做相同的render处理，但是递归会造成阻塞
  /*const dom = createDom(element);
  element.props.children.forEach(child =>
      render(child, dom)
  )
  container.appendChild(dom);*/

  /* 通过fiber改造——fiber保存dom节点信息和操作信息
  创建根fiber，将其设为nextUnitOfWork作为第一个任务单元，剩下的任务单元会通过performUnitOfWork函数完成并返回
  performUnitOfWork函数根据浏览器是否空闲deadline.timeRemaining，有时间遍历任务，没有时间则终止
  performUnitOfWork在workLoop内，requestIdleCallback(workLoop)，当浏览器有空闲时，会调用 workLoop
  */
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot, // 用于记录旧 fiber 节点（上一个 commit 阶段使用的 fiber 节点）的引用
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}

// 需要将整个任务分成一些小块，每当我们完成其中一块之后需要把控制权交给浏览器，让浏览器判断是否有更高优先级的任务需要完成
let nextUnitOfWork = null;
let wipRoot = null; // 正在渲染的fiber树
let currentRoot = null; // 当前页面渲染的fiber树
let deletions = null;

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) { // 当前帧还有剩余时间
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    ) // 完成传入的任务并返回下一个任务，下一个任务在下一次执行，这样就可以不断遍历任务
    // timeRemaining获取到当前帧剩余时间
    shouldYield = deadline.timeRemaining() < 1;
  }
  // next unit of work 为 undefined，把整颗树的变更提交（commit）到实际的 DOM 上
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

// 可以类比成 setTimeout，浏览器来决定什么时候运行回调函数，而不是 settimeout 里通过我们指定的一个时间
// React 并不是用 requestIdleCallback 的，使用自己编写的 scheduler package。 但两者概念上是相同的
requestIdleCallback(workLoop);

// 不仅需要执行每一小块的任务单元，还需要返回下一个任务单元
/*每个fiber节点完成三件事：1.把element添加到DOM上 2.为该fiber节点的子节点新建fiber 3.挑出下一个任务单元*/
function performUnitOfWork(fiber) {
  /*  根节点
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  }*/

  /*element（通过 createElement创建的 react element）
  DOM node（最终生成对应的 DOM 节点）
  fiber node（从element 到 DOM 节点的中间产物，用于时间切片）*/
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  // 3 return next unit of work
  // 找到下一个工作单元。 先试试 child 节点，再试试 sibling 节点，再试试 “uncle” 节点
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function updateFunctionComponent(fuber) {
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

function updateHostComponent(fiber) {
  // 1 add dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // 在完成整棵树的渲染前，浏览器还要中途阻断这个过程。 那么用户就有可能看到渲染未完全的 UI
  /*if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }*/
  // 把修改DOM的内容记录在 wipRoot（work in progress root）上，通过追踪这颗树来收集所有 DOM 节点的修改

  // 2 create new fibers
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}

// reconcile 旧的fiber节点 和 新的 react elements来创建新 fiber 节点的代码
/* diff
对于新旧节点类型是相同的情况，我们可以复用旧的 DOM，仅修改上面的属性
如果类型不同，意味着我们需要创建一个新的 DOM 节点
如果类型不同，并且旧节点存在的话，需要把旧节点的 DOM 给移除 */
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  // element 是我们想要渲染到 DOM 上的东西，oldFiber 是我们上次渲染 fiber 树
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    /*const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }*/
    let newFiber = null
    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props, // 仅修改属性
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      }
    }
    if (element && !sameType) {
      //  add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      }
    }
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      // 对于需要删除的节点，我们并不会去生成 fiber，因此我们在旧的fiber上添加标记
      // 但是当我们提交（commit）整颗 fiber 树（wipRoot）的变更到 DOM 上的时候，并不会遍历旧 fiber
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 根据是否是第一个子节点，来设置父节点的 child 属性的指向，或者上一个节点的 sibling 属性的指向
    if (index === 0) {
      wipFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
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
