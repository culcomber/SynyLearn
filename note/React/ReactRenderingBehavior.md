## 1、What is "Rendering"?

**Rendering** is the process of React asking your components to describe what they want their section of the UI to look like, now, based on the current combination of props and state.

根据组件（基于props and state）去展示`UI`

### 1.1 Rendering Process Overview

- 在渲染过程中，React 将从组件树的根节点开始向下遍历，找到并标记需要更新的组件。对于每个被标记的组件，React将调用`FunctionComponent(props)`（针对函数组件）或`classComponentInstance.render()`（针对类组件），并保存渲染输出以用于渲染过程的后续步骤。（save the render output for the next steps of the render pass）。
- After it has collected the render output from the entire component tree, React will `diff` the new tree of objects (frequently referred to as the "virtual DOM"), and collects a list of all the changes that need to be applied to make the real DOM look like the current desired output. The `diffing` and calculation process is known as **["reconciliation"](https://reactjs.org/docs/reconciliation.html).**
- 然后，React会将计算出的所有更改同步应用到DOM中。

**React 团队淡化虚拟 DOM 概念**

- *React is “value `UI`”. Its core principle is that `UI` is a value, just like a string or an array.* *You can keep it in a variable, pass it around, use JavaScript control flow with it, and so on.* *It doesn’t even always represent the DOM, for example* `<Message recipientId={10} />` *is not DOM. Conceptually it represents lazy function calls:* `Message.bind(null, { recipientId: 10 })`*.*
- React 是 “value `UI`”。它的核心是 `UI` 是一个值，就像字符串或者数组一样。你可以将它保存在一个变量中，传递它，使用 JavaScript 控制。虚拟DOM甚至并不总是代表 DOM，例如 `<Message recipientId={10} />` 不是 DOM。从概念上讲，它表示惰性函数调用：`Message.bind(null, { recipientId: 10 })`

### 1.2 Render and Commit Phases

- The "**Render** phase" contains all the work of **rendering components and calculating changes**
- The "**Commit** phase" is the process of **applying those changes to the DOM**
- After commit phase, it **updates all refs** accordingly to point to the requested DOM nodes and component instances. 
- Then sets a short timeout, and when it expires, runs all the **`useEffect`** hooks

## 2、How Does React Handle Renders?

### Queuing Renders

初始化后会导致重新渲染的操作 `re-render`:

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

 `A > B > C > D`， `B` 通过`setState`改变`state`，**从顶层A开始，A没有变化就直接跳过**，B/C/D都会从新渲染

rendering is not a bad thing - it's how React knows whether it needs to actually make any changes to the DOM  

渲染并不是一件坏事，React 正是通过渲染来了解是否需要对 DOM 进行更改

### Rules of React Rendering

rendering must be "pure" and not have any side effects

函数组件必须是纯函数，不是不允许副作用，而是保持幂等性（相同传参返回相同值）

- Render logic must **not** :
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

- During a rendering pass, React will iterate over this tree of fiber objects, and construct an updated tree as it calculates the new rendering results.

  渲染过程中，react在遍历组件树过程中会创建新的fiber，并将新fiber作为render的输出

- Note that these **"fiber" objects store the real component props and state values**. When you use props and state in your components, React is actually giving you access to the values that were stored on the fiber objects.

  fiber存储了props and state，在组建中使用props and state是引用了fiber中的值

- Similarly, React hooks work because React stores all of the hooks for a component as a linked list attached to that component's fiber object. When React renders a function component, it gets that linked list of hook description entries from the fiber, and every time you call another hook, it returns the appropriate values that were stored in the hook description object (like the state and dispatch values for `useReducer`.

  hook也存储在fiber

- When a parent component renders a given child component for the first time, React creates a fiber object to track that "instance" of a component. 

  初始化时，react创建fiber，fiber保存构建页面组件`UI`所以要的信息

### Component Types and `Reconciliatio`

If you ask React to render the same type of component or HTML node in the same place in the tree, React will reuse that and just apply updates if appropriate, instead of re-creating it from scratch.

为了提高`re-renders`的效率，`react`会充分利用the existing component tree and DOM structure。如果在同一个地方渲染相同类型组件，`react`不会重新创建而是在现有基础上更新组件。

### Keys and Reconciliation

React uses `key` as a unique identifier that it can use to differentiate specific instances of a component type.

React 使用 key 作为唯一标识符，用于区分组件类型的特定实例。

Note that `key` isn't actually a *real* prop - it's an instruction to React. React will always strip that off, and it will never be passed through to the actual component, so you can never have `props.key` - it will always be `undefined`.

`key`只是 `React` 的一个指令，真实 `DOM` 上没有`key`属性。

### Render Batching and Timing

Render batching is when multiple calls to `setState()` result in a single render pass being queued and executed, usually on a slight delay.

在一个组件的多次调用 `setState()` 会导致单次渲染排队并执行，通常会稍有延迟。

```js
const [counter, setCounter] = useState(0);

const onClick = async () => {
  setCounter(0);
  setCounter(1); // React17 / React18 合并处理，只设置setCounter(1)

  const data = await fetchSomeData();
    
  // 不在react原始调用栈，进入事件循环调用栈
  // the original synchronous call stack is done, and the second half of the function is running much later in a totally separate event loop call stack. 
  setCounter(2);
    
  // React17会设置两次setCounter，同步执行 / React18合并处理，会相比React17晚一点执行
  // even though they're much later, that's *also* two state updates queued in the same event loop, so they get batched into a second render.
  setCounter(3); 
};
```

### `Async` Rendering, Closures, and State Snapshots

```jsx
function MyComponent() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    // ❌ THIS WON'T WORK!
    console.log(counter);
    // Original value was logged - why is this not updated yet??????
  };
}
```

Strictly speaking, the React render is literally synchronous - it will be executed in a "microtask" at the very end of this event loop tick.

严格来说，React 渲染实际上是同步的--它将在事件循环 tick 的最后以 "微任务 "的形式执行。(诚然，这有点迂腐，但本文的目的就是要让细节更准确、更清晰）。不过，从 `handleClick` 函数的角度来看，它是 "异步 "的，因为你无法立即看到结果，而且实际更新发生的时间要比 `setCounter()` 调用晚得多。

However, there's a bigger reason why this doesn't work. **The `handleClick` function is a "closure"- it can only see the values of variables as they existed when the function was defined**. In other words, **these state variables are a snapshot in time**.

Since `handleClick` was defined during the most recent render of this function component, **it can only see the value of `counter` as it existed during that render pass.** When we call `setCounter()`, it queues up a *future* render pass, and that *future* render will have a new `counter` variable with the new value and a new `handleClick` function... **but this copy of `handleClick` will never be able to see that new value.**

`setCounter`不能生效更重要的原因是，`handleClick` 函数是一个 "闭包"--它只能查看函数定义时存在的变量值。换句话说，这些状态变量是上一次渲染的快照。

由于 `handleClick` 是函数组件的最近一次**render**过程中定义的，因此它只能看到上一次**render**过程中存在的计数器值。当我们调用 `setCounter()` 时，它会排队等待未来的render，而未来的render将有一个新的`counter`和 `handleClick` 函数......但这个 **`handleClick` 的副本永远无法看到`setCounter`的值，`setCounter`在下一次`render`，`handleClick`保存是上一次`render`的值**。

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

