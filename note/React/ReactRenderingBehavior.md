## 1、What is "Rendering"?

**Rendering** is the process of React asking your components to describe what they want their section of the UI to look like, now, based on the current combination of props and state.

根据组件（基于props and state）去展示UI

### 1.1 Rendering Process Overview

- 在渲染过程中，React 将从组件树的根节点开始向下遍历，找到并标记需要更新的组件。对于每个被标记的组件，React将调用`FunctionComponent(props)`（针对函数组件）或`classComponentInstance.render()`（针对类组件），并保存渲染输出以用于渲染过程的后续步骤。（save the render output for the next steps of the render pass）。
- 在收集了整个组件树的渲染输出后（输出 new tree ），React将对新的对象树（通常称为 "虚拟DOM"）进行差分，并收集所有需要应用的更改列表，以使真实DOM看起来与当前所需的输出一致。差异和计算过程被称为 "调和"。

- 然后，React会将计算出的所有更改同步应用到DOM中。

**React 团队淡化虚拟 DOM 概念**

- *React is “value UI”. Its core principle is that UI is a value, just like a string or an array.* *You can keep it in a variable, pass it around, use JavaScript control flow with it, and so on.* *It doesn’t even always represent the DOM, for example* `<Message recipientId={10} />` *is not DOM. Conceptually it represents lazy function calls:* `Message.bind(null, { recipientId: 10 })`*.*
- React 是 “value `UI`”。它的核心是 `UI` 是一个值，就像字符串或者数组一样。你可以将它保存在一个变量中，传递它，使用 JavaScript 控制。虚拟DOM甚至并不总是代表 DOM，例如 `<Message recipientId={10} />` 不是 DOM。从概念上讲，它表示惰性函数调用：`Message.bind(null, { recipientId: 10 })`

### 1.2 Render and Commit Phases

- The "Render phase" contains all the work of **rendering components and calculating changes**
- The "Commit phase" is the process of **applying those changes to the DOM**
- After commit phase, it **updates all refs** accordingly to point to the requested DOM nodes and component instances. 
- Then sets a short timeout, and when it expires, runs all the **`useEffect`** hooks

## 2、How Does React Handle Renders?

### Queuing Renders

初始化后会导致重新渲染的操作 re-render:

- Function components:
  - `useState` setters
  - `useReducer` dispatches
- Class components:
  - `this.setState()`
  - `this.forceUpdate()`
- Other:
  - Calling the `ReactDOM` top-level `render(<App>)` method again (which is equivalent to calling `forceUpdate()` on the root component)
  - Updates triggered from the new `useSyncExternalStore` hook

### Standard Render Behavior

当父组件重新渲染时，React 也会重新渲染其内部的所有子组件

 `A > B > C > D`， `B` 通过`setState`改变state，**从顶层A开始**，A没有变化就直接跳过，B/C/D都会从新渲染

这意味着，在根 `<App>` 组件中调用 `setState()`，将导致 React 重新渲染组件树中的每个组件。现在，组件树中的大部分组件很可能会返回与上次完全相同的渲染输出，因此 **React 无需对 DOM 进行任何更改**。但是，React 渲染组件并找出与当前`UI`的差异

rendering is not a bad thing - it's how React knows whether it needs to actually make any changes to the DOM  

渲染并不是一件坏事，React 正是通过渲染来了解是否需要对 DOM 进行更改

### Rules of React Rendering

rendering must be "pure" and not have any side effects

函数组件必须是纯函数，不是不允许副作用，而是保持幂等性（相同传参返回相同值）

- Render logic must not :
  - Can't mutate existing variables and objects
  - Can't create random values like `Math.random()` or `Date.now()`
  - Can't make network requests
  - Can't queue state updates
- Render logic may :
  - Mutate objects that were newly created while rendering
  - Throw errors
  - "Lazy initialize" data that hasn't been created yet, such as a cached value

### Component `Metadata` and Fibers

React stores an internal data structure that tracks all the **current component instances** that exist in the application. The core piece of this data structure is an object called a "fiber"

fiber保存着呈现当前`UI`所需要的数据，包括以下内容

- What **component type** is supposed to be rendered at this point in the component tree
- The current **props and state** associated with this component
- Pointers to **parent, sibling, and child** components
- Other internal `metadata` that React uses to **track the rendering process**

```js
export type Fiber = {
  // Tag identifying the type of fiber.
  tag: WorkTag;

  // Unique identifier of this child.
  key: null | string;

  // The resolved function/class/ associated with this fiber.
  type: any;

  // Singly Linked List Tree Structure.
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  // Input is the data coming into this fiber (arguments/props)
  pendingProps: any;
  memoizedProps: any; // The props used to create the output.

  // A queue of state updates and callbacks.
  updateQueue: Array<State | StateUpdaters>;

  // The state used to create the output
  memoizedState: any;

  // Dependencies (contexts, events) for this fiber, if any
  dependencies: Dependencies | null;
};
```

During a rendering pass, React will iterate over this tree of fiber objects, and construct an updated tree as it calculates the new rendering results.

渲染过程中，react会遍历fiber，计算新的值，并更新到fiber

Note that these **"fiber" objects store the real component props and state values**. When you use props and state in your components, React is actually giving you access to the values that were stored on the fiber objects.

fiber存储了props and state，在组建中使用props and state是引用了fiber中的值

Similarly, React hooks work because React stores all of the hooks for a component as a linked list attached to that component's fiber object. When React renders a function component, it gets that linked list of hook description entries from the fiber, and every time you call another hook, it returns the appropriate values that were stored in the hook description object (like the state and dispatch values for `useReducer`.

hook也存储在fiber

When a parent component renders a given child component for the first time, React creates a fiber object to track that "instance" of a component. 

初始化时，react创建fiber保存页面宿主实例

### Component Types and `Reconciliatio`



### Keys and Reconciliation



### Render Batching and Timing



### `Async` Rendering, Closures, and State Snapshots



### Render Behavior Edge Cases



## 3、Improving Rendering Performance

### Component Render Optimization Techniques



### How New Props References Affect Render Optimizations



### Optimizing Props References



### Memoize Everything?



### Immutability and Rerendering



### Measuring React Component Rendering Performance



## 4、Context and Rendering Behavior

### Context Basics



### Updating Context Values



### State Updates, Context, and Re-Renders



### Context Updates and Render Optimizations



## 5、React-Redux and Rendering Behavior

### React-Redux Subscriptions



### Differences between connect and useSelector



## 6、Future React Improvements

### "React Forget" Memoizing Compiler



### Context Selectors



## 7、Summary



## 8、Final Thoughts



## 9、Further Information

