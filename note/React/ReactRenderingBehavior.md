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

在render后，浏览器绘制DOM之前，执行相关操作的方法

 `componentDidMount`, `componentDidUpdate`, and `useLayoutEffect` 还有`ref`

- Render a component the first time with some partial but incomplete data
- In a commit-phase lifecycle, use refs to measure the real size of the actual DOM nodes in the page
- Set some state in the component based on those measurements
- Immediately re-render with the updated data

在这些方法中执行`JS`会阻塞浏览器的绘制，如 `div.innerHTML = "a"; div.innerHTML = b";`，但 "a "永远不会出现。

因此，React 将始终同步运行`commit`阶段生命周期中的渲染。

Because of this, **React will always run renders in commit-phase `lifecycles` synchronously**. 

 `useEffect` 在浏览器绘制完DOM之后执行

**Function components may call `setSomeState()` directly while rendering, as long as it's done conditionally** and isn't going to execute *every* time this component renders. 

组件可以在渲染时直接调用 `setState()`，只要它是有条件地调用，并且不会在该组件每次渲染时都执行。

## 3、Improving Rendering Performance

**React component render output should always be entirely based on current props and current component state**.

React 组件是否重新render取决于props和state是否变化。即props和state没有变化，组件不需要重新render，复用之前的组件。

When trying to improve software performance in general, there are two basic approaches: 

1) do the same work faster
2) do less work. Optimizing React rendering is primarily about doing less work by skipping rendering components when appropriate.

优化 React 渲染主要是通过在适当的时候跳过渲染组件来减少工作量，提升性能。

### Component Render Optimization Techniques

React offers three primary `APIs` that allow us to potentially skip rendering a component:

- `React.memo()`，HOC，传入组件props没有变化(浅比较)，阻止组件更新
- `React.Component.shouldComponentUpdate`，类组件
- `React.PureComponent`，类组件

 React 组件在渲染输出中返回了与上次完全相同的元素引用，React 就会跳过重新渲染该特定子元素

There's also a lesser-known technique as well: **if a React component returns the exact same element reference in its render output as it did the last time, React will skip re-rendering that particular child.** There's at least a couple ways to implement this technique:

- If you include `props.children` in your output, that element is the same if this component does a state update
- If you wrap some elements with `useMemo()`, those will stay the same until the dependencies change

Conceptually, we could say that the **difference** between these two approaches is:

- `React.memo()`: controlled by the **child** component
- Same-element references: controlled by the **parent** component

For all of these techniques, **skipping rendering a component means React will also skip rendering that entire subtree**, because it's effectively putting a stop sign up to halt the default "render children recursively" behavior.

跳过渲染组件意味着 React 也将跳过渲染整个子树

```jsx
// The `props.children` content won't re-render if we update state
function SomeProvider({ children }) {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Count: {counter}</button>
      <OtherChildComponent />
      {children}
    </div>
  );
}

function OptimizedParent() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const memoizedElement = useMemo(() => {
    // This element stays the same reference if counter 2 is updated,
    // so it won't re-render unless counter 1 changes
    return <ExpensiveChildComponent />;
  }, [counter1]);

  return (
    <div>
      <button onClick={() => setCounter1(counter1 + 1)}>
        Counter 1: {counter1}
      </button>
      <button onClick={() => setCounter1(counter2 + 1)}>
        Counter 2: {counter2}
      </button>
      {memoizedElement}
    </div>
  );
}
```

### How New Props References Affect Render Optimizations

**by default, React re-renders all nested components even if their props haven't changed**

React 会重新渲染所有嵌套组件，即使传递的props没有改变。也就是说，传递props并不重要，因为父组件render都会导致子组件render

```jsx
function ParentComponent() {
  const onClick = () => {
    console.log('Button clicked');
  };

  const data = { a: 1, b: 2 };

  return <NormalChildComponent onClick={onClick} data={data} />;
}
```

Every time `ParentComponent` renders, it will create a new `onClick` function reference and a new `data` object reference, then pass them as props to `NormalChildComponent`. (Note that it doesn't matter whether we're defining `onClick` using the `function` keyword or as an arrow function - it's a new function reference either way.)

每次 `ParentComponent` 渲染时，它都会创建一个新的 `onClick` 函数引用和一个新的数据对象引用，然后将它们作为道具传递给 `NormalChildComponent`。(请注意，无论我们是使用函数关键字定义 `onClick`，还是将其作为箭头函数，这都无关紧要，因为无论哪种方式，它**都是一个新的函数引用**）。

```jsx
const MemoizedChildComponent = React.memo(ChildComponent);
function ParentComponent() {...}
```

This means that:

- `MemoizedChildComponent` will always **re-render** even though we wanted to skip rendering most of the time
- The work that it's doing to compare its old and new props is wasted effort

Similarly, note that rendering `<MemoizedChild><OtherComponent /></MemoizedChild>` will *also* force the child to always render, because `props.children` is always a new reference.

即使用 `React.memo` 优化 `ChildComponent` 且传递的props没有变，但是父组件render，函数引用会变，导致子组件重新渲染

### Optimizing Props References

**Class components don't have to worry about accidentally creating new callback function references as much, because they can have instance methods that are always the same reference.** However, they may need to generate unique callbacks for separate child list items, or capture a value in an anonymous function and pass that to a child. Those will result in new references, and so will creating new objects as child props while rendering. React doesn't have anything built-in to help optimize those cases.

For function components, React does provide two hooks to help you reuse the same references: `useMemo` for any kind of general data like creating objects or doing complex calculations, and `useCallback` specifically for creating callback functions.

类组件不必担心意外创建新的回调函数引用，因为它们的实例方法可以始终是相同的引用。但是，它们可能需要为不同的子列表项生成独特的回调函数，或在匿名函数中捕获一个值并将其传递给子对象。这些都会产生新的引用，在呈现时创建新对象作为子道具也是如此。React 没有内置任何功能来帮助优化这些情况。

对于函数组件，React 提供了两个钩子来重用相同的引用：`useMemo` 用于创建对象或进行复杂计算等任何类型的通用数据，而 `useCallback` 则专门用于创建回调函数。

### `Memoize` Everything?

`memoization` 会消耗性能，只给传递给子组件的对象和函数进行 `useMemo` 和 `useCallback`

*There's definitely collective misunderstanding about the idea of a "render" and the perf impact. Yes, React is totally based around rendering - gotta render to do anything at all. No, **most renders aren't overly expensive.***

大多数渲染并不昂贵，只有在需要时才进行优化

Optimizing with `memo` is only valuable when **your component re-renders often with the same exact props, and its re-rendering logic is expensive**. If there is no perceptible lag when your component re-renders, `memo` is unnecessary. Keep in mind that `memo` is completely useless if the props passed to your component are always different, such as if you pass an object or a plain function defined during rendering. This is why you will often **need `useMemo` and `useCallback` together with `memo`**.

There is **no benefit** to wrapping a component in `memo` in other cases. There is **no significant harm** to doing that either, so some teams choose to not think about individual cases, and `memoize` as much as possible. The downside of this approach is that code becomes less readable. Also, not all `memoization` is effective: a single value that’s “always new” is enough to break memoization for an entire component.

只有当组件经常重新渲染即使`props`没有变化，而且重新渲染逻辑成本很高时，使用`memo`进行优化才有价值。如果组件重新渲染时没有明显的延迟，那么就没有必要使用 `memo`。在使用 `memo` 的同时还需要使用 `useMemo` 和 `useCallback`，因为父组件的对象和函数props每次渲染都会改变。

在其他情况下，用 memo 封装组件没有任何好处。但这样做也没有什么坏处，所以有些团队选择不考虑个别情况，而是尽可能多地使用 memo。这种做法的缺点是代码的可读性会降低。此外，并非所有的备忘都是有效的：一个 "总是新的 "值就足以破坏整个组件的备忘。

### Immutability and `Rerendering`

**React, and the rest of the React ecosystem, assume immutable updates. Any time you mutate, you run the risk of bugs. Don't do it.**

```jsx
const [todos, setTodos] = useState(someTodosArray);

// mutate --> bug
const onClick = () => {
  todos[3].completed = true;
  setTodos(todos);
};

// immutable --> good
const onClick = () => {
  const newTodos = todos.slice();
  newTodos[3].completed = true;
  setTodos(newTodos);
};
```

### Measuring React Component Rendering Performance

Use the [React DevTools Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see what components are rendering in each commit. React runs way slower in `dev` builds. But, **never measure absolute render times using a React development build - only measure absolute times using production builds!** 

`React DevTools Profiler` 可以监测渲染时间，开发模式比正式环境慢，可以在开发模式下对应用程序进行剖析，但是在生产构建来测量绝对时间。

## 4、Context and Rendering Behavior

### Context Basics

```jsx
<MyContext.Provider value={42}>
    
<MyContext.Consumer>{ (value) => <div>{value}</div>}</MyContext.Consumer>
const value = useContext(MyContext)
```

### Updating Context Values

```jsx
function GrandchildComponent() {
  const value = useContext(MyContext);
  return <div>{value.a}</div>;
}

function ChildComponent() {
  return <GrandchildComponent />;
}

function ParentComponent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState('text');
  const contextValue = { a, b };

  return (
    <MyContext.Provider value={contextValue}>
      <ChildComponent />
    </MyContext.Provider>
  );
}
```

`ParentComponent`每次render都会导致`ChildComponent`重新`render`，因为`value`是对象，`ParentComponent`重新`render`后都会生成新的引用

### State Updates, Context, and Re-Renders

**by default, any state update to a parent component that renders a context provider will cause all of its descendants to re-render anyway, regardless of whether they read the context value or not!**.

默认情况下，对渲染上下文提供者的父组件的任何状态更新都会导致其所有子组件重新渲染，无论它们是否读取了上下文值

**the `GrandchildComponent` will re-render, but not because of a context update - it will re-render because `ChildComponent` rendered!**.

`GrandchildComponent` 将重新`render`，但不是因为上下文更新，而是因为 `ChildComponent` 重新`render`了。

### Context Updates and Render Optimizations

```jsx
// 父节点GrandchildComponent重新render，导致子节点重新render
function GreatGrandchildComponent() {
  return <div>Hi</div>
}

// 子孙节点，使用useContext，会render
function GrandchildComponent() {
    const value = useContext(MyContext);
    return (
      <div>
        {value.a}
        <GreatGrandchildComponent />
      </div>
}

// 子节点，没有使用useContext，不会render，但是子组件可能使用useContext，所以会继续遍历
function ChildComponent() {
    return <GrandchildComponent />
}
const MemoizedChildComponent = React.memo(ChildComponent);

function ParentComponent() {
    const [a, setA] = useState(0);
    const [b, setB] = useState("text");

    const contextValue = {a, b};

    return (
      <MyContext.Provider value={contextValue}>
        <MemoizedChildComponent />
      </MyContext.Provider>
    )
}
```

### Context and Renderer Boundaries

```jsx
function App() {
  return (
    <MyContext.Provider>
      <DomComponent>
        <ReactThreeFiberParent>
          <ReactThreeFiberChild />
        </ReactThreeFiberParent>
      </DomComponent>
    </MyContext.Provider>
  );
}
```

where `ReactFiberParent` creates and shows content rendered with React-Three-Fiber, then `<ReactThreeFiberChild>` will not be able to see the value from `<MyContext.Provider>`.

## 5、`React-Redux` and Rendering Behavior

### `React-Redux` Subscriptions



### Differences between connect and `useSelector`



## 6、Future React Improvements

### "React Forget" `Memoizing` Compiler



### Context Selectors



## 7、Summary

- React always recursively renders components by default, so when a parent renders, its children will render
- Rendering by itself is fine - it's how React knows what DOM changes are needed
- But, rendering takes time, and "wasted renders" where the UI output didn't change can add up
- It's okay to pass down new references like callback functions and objects most of the time
- APIs like `React.memo()` can skip unnecessary renders if props haven't changed
- But if you always pass new references down as props, `React.memo()` can never skip a render, so you may need to memoize those values
- Context makes values accessible to any deeply nested component that is interested
- Context providers compare their value by reference to know if it's changed
- A new context values does force all nested consumers to re-render
- But, many times the child would have re-rendered anyway due to the normal parent->child render cascade process
- So you probably want to wrap the child of a context provider in `React.memo()`, or use `{props.children}`, so that the whole tree doesn't render all the time when you update the context value
- When a child component is rendered based on a new context value, React keeps cascading renders down from there too
- React-Redux uses subscriptions to the Redux store to check for updates, instead of passing store state values by context
- Those subscriptions run on every Redux store update, so they need to be as fast as possible
- React-Redux does a lot of work to ensure that only components whose data changed are forced to re-render
- `connect` acts like `React.memo()`, so having lots of connected components can minimize the total number of components that render at a time
- `useSelector` is a hook, so it can't stop renders caused by parent components. An `app` that only has `useSelector` everywhere should probably add `React.memo()` to some components to help avoid renders from cascading all the time.
- The "React Forget" `auto-memoizing` compiler may drastically simplify all this if it does get released.

**Final Thoughts**

- Use context if:
  - You just need to pass some simple values that don't change often
  - You have some state or functions that need to be accessed through part of the app, and you don't want to pass them as props all the way down
  - You want to stick with what's built in to React and not add additional libraries
- Use (React-)Redux if:
  - You have large amounts of application state that are needed in many places in the app
  - The app state is updated frequently over time
  - The logic to update that state may be complex
  - The `app` has a medium or large-sized `codebase`, and might be worked on by many people

