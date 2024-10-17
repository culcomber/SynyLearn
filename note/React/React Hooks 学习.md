# 1、useState 
## 1.1 参考
`const [state, setState] = useState(initialState);`
- `initialState `：组件初次 `render` 时赋值给 `state`，后续组件 `re-render` 会忽略初始值。
- `setState`
	- 不需要把 `useState` 返回的第二个 `Setter` 函数作为 `Effect` 的依赖。`React` 内部已经对 `Setter` 函数做了 `Memoization` 处理，因此每次渲染拿到的 `Setter` 函数都是完全一样的，`deps` 加不加都是没有影响的。
	- `setState` 的参数如果是函数，需要保证是纯函数，在 `re-render` 时 `React` 会执行函数。
	- 如果  `setState`  传入新值和旧值通过 `Object.is` 比较相同，`React` 会跳过 `re-render`。`React` 会在所有事件处理函数调用之后进行`setState`[批处理](https://react.dev/learn/queueing-a-series-of-state-updates)更新。
- 不要在循环、条件或嵌套函数中调用 `Hook`，`React` 通过单向循环链表的形式存储管理 `state`（[参考](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjliMDI4NWMzMWJmZDhiMDQwZTAzMTU3YjE5YzRlOTYwYmRjMTBjNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTgwNTk1ODI4NzgzMTU0MjM2MDUiLCJlbWFpbCI6Im0xMzA3NjE4NTE0MEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzAzMDgwNTQzLCJuYW1lIjoi6Z2S55OcIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0piNWM3dWc0MFpPZUFGQXFVY2ZPenV6SGFlZTl2SG5DNVpzeVpORHRkcC1BPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IueTnCIsImZhbWlseV9uYW1lIjoi6Z2SIiwibG9jYWxlIjoiemgtQ04iLCJpYXQiOjE3MDMwODA4NDMsImV4cCI6MTcwMzA4NDQ0MywianRpIjoiN2QzYTlmNGIyODIzYzgwMTQzYmFlMGVjNTM3NmVjZWE2NmQ2MjA1NSJ9.iNHu57DXh81OSsJFQiOghOgOrqMWA52Uh6ru9YQcjA_3dNVhF5Ha3T1TwA-fRrVQSs1ear52Jkes_v7WeXMbickEz8pxhgpGCNmzFqNMVFtxKu2G5LcxOcoG2qnDv90VhQqOUk5oFwzVqMTlox4la6ZnIi6utX_kegygGEbUkI_-86rghyWYz5BYI3IwMyMfz3mTY3hdhmbvKMpYNGut5B5cVx3lFrWgMmFH2T_B4tqWFcz6neTv8-4z6ndtWGWlQ4aRwA4J-liagbF5w45SJ7youC5ljzqjbcDQ9ppDefq2YEEY5kEvj1CZ4ZTMnAUr4EZdPx85FAOuPUF-pIOWrw)）。

以 `mountWorkInProgressHook` 创建当前 `hooks`, 并且把 `hook` 的数据存到 `hook.memoizedState` 上，而在 `update` 阶段，则是依次读取 `hooks` 链表的memoizedState属性来获取状态 (数据)。
`dispatch` 函数是更新 `state` 的关键，它会生成一个 `update` 挂载到 `Hooks` 队列上面，并提交一个` React` 更新调度。

```js
// useState在mount阶段的源码：
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
useCallback在mount阶段的源码：

function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
然后mountWorkInProgressHook的源码如下：

function mountWorkInProgressHook(): Hook {
  const hook: Hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
```
## 1.2 用法
### 1.2.1 基于先前状态更新状态
```js
// 调用setState更新值，导致组件re-render，更新state，state是一个快照，保存上次setState的值
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}

// 解决方案，传递函数，直接设置值和传递函数对于react没有区别
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```
### 1.2.2 避免重新创建初始状态
```js
// 初次render执行createInitialTodos函数返回值作为todos初始值，虽然createInitialTodos只在初次render起作用，但每次render都会调用createInitialTodos
const [todos, setTodos] = useState(createInitialTodos());

// good：createInitialTodos()是调用函数，createInitialTodos是函数本身，React只会在初始化期间调用
const [todos, setTodos] = useState(createInitialTodos);

// 将函数作为state
const [fn, setFn] = useState(() => someFunction);
```
### 1.2.3 父组件 `state` 作为子组件 `key`
```js
// Form 组件渲染不依赖父组件props ，可以通过将state作为 key 组件传递给组件来重置组件的状态
export default function App() {
  const [version, setVersion] = useState(0);
  return (<>
      <button onClick={() => setVersion(version + 1)}>Reset</button>
      <Form key={version} />
  </>);
}
function Form() {
  const [name, setName] = useState('Taylor');
  return (<>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <p>Hello, {name}.</p>
  </>);
}
```
### 1.2.4 `render` 期间 `setState`
```js
export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  // 在render期间执行setstate，必须在条件语句中，类似新旧state比较，防止无限渲染
  if (prevCount !== count) {
    // render时执行到setState，执行完下面return不渲染子组件，立即重新渲染CountLabel
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}

// 🚩 Wrong: calls the handler during render render时无条件setstate 会造成无限渲染
return <button onClick={handleClick()}>Click me</button>
// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>
// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```
# 2、useReducer
`useState` 的实现使用了 `useReducer`，同样需要在顶层调用，`state` 是一个快照，`Object.is` 比较新旧值， 批量更新。
## 2.1 参考 
`const [state, dispatch] = useReducer(reducer, initialArg, init?)`
- `reducer`：函数指定如何更新状态，必须是纯函数。 
- `initialArg`： 计算初始状态的值。
- 可选的 `init`： 应该返回初始状态的初始化函数。 如果未指定，则初始状态设置为 `initialArg`。 否则，初始状态设置为调用 `init(initialArg)` 的结果。
- `useReducer` 返回的 `dispatch` 对象又是“[性能安全的](https://zh-hans.legacy.reactjs.org/docs/hooks-reference.html#usereducer)”，可以直接放心地传递给子组件而不会引起子组件 `re-render`。
## 2.2 用法
### 2.2.1 编写 `reducer` 函数
```js
function reducer(state, action) {
    case 'incremented_age': {
      return { name: state.name, age: state.age + 1 };
    }
    case 'changed_name': {
      return { name: action.nextName, age: state.age };
    }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  return (<>
      <button onClick={() => { dispatch({ type: 'incremented_age' }) }}>Increment age</button>
      <p>Hello! You are {state.age}.</p>
  </>);
}
```
# 3、`createContext`/`useContext`
## 3.1 参考
`const value = useContext(SomeContext)`
- 在组件的顶层调用 `useContext` 以读取和订阅 `context`。
- 使用 `memo` 跳过重新渲染不会阻止子级接收新的上下文值。==todo==
## 3.2 用法
```js
const ThemeContext = createContext('light');

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Form />
      <Button onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); }}>
        Toggle theme
      </Button>
      // 独立于value={theme}的context
      <ThemeContext.Provider value="light">
		 <Footer />
	  </ThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
```
## 3.3 `Redux`
[Redux 包教包会](https://juejin.cn/post/6844904021187117069)

Control 就是将权力集中起来，员工们只需有条不紊地按照 CEO 的决策执行相应的任务，就像 Redux 中的全局 Store 是”唯一的真相来源“（Single Source of Truth），所有状态和数据流的更新必须经过 Store；而 Context 就是给予各部门、各层级足够的决策权，因为他们所拥有的上下文更充足，专业度也更好，就像 React 中响应特定逻辑的组件具有更充足的上下文，并且可以借助 Hooks ”自给自足“地执行任务，而无需依赖全局的 Store。
# 4、`useEffect`/`useLayoutEffect`
## 4.1 `useEffect` 参考
`useEffect(setup, dependencies?)`
- 只能在组件的顶层调用，不能在循环或条件内调用。 
- `setup`： 每次依赖重新渲染后，`React` 将首先使用旧值运行清理函数，然后使用新值运行设置函数。 在组件从 `DOM` 中移除后，`React` 将运行你的清理函数。
- 可选的 `dependencies`：使用 `Object.is` 比较将每个依赖与其先前的值进行比较。`deps` 数组项必须是 `mutable`  的，比如不能也不必传 `useRef`、`dispatch` 等进去
- 有些组件在页面上显示时，需要与网络、浏览器 `API` 或第三方库保持连接。 这些系统不受 `React` 控制，被称为外部系统。不与外部系统做连接， 可能[不需要副作用](https://react.nodejs.cn/reference/react/useEffect#)。
- 浏览器挂载真实 `DOM` 之后执行 `useEffect` 内的函数。
- 每个 `Effect` 必然在渲染之后执行，因此不会阻塞渲染，提高了性能。
- `useEffect` 调用也会在当前 `Fiber` 节点的 `Hooks` 链追加一个 `hook` 并返回，它的 `memoizedState` 存放一个 `effect` 对象，`effect` 对象最终会被挂载到 `Fiber` 节点的 `updateQueue` 队列（当 `Fiber` 节点都渲染到页面上后，就会开始执行 `Fiber` 节点中的 `updateQueue` 中所保存的函数）。
## 4.2 `useEffect` 用法 
### 4.2.1 根据副作用的先前状态更新状态
```js
// 不停渲染
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1); // You want to increment the counter every second...
    }, 1000)
    return () => clearInterval(intervalId);
  }, [count]); // 🚩 ... but specifying `count` as a dependency always resets the interval.
  // ...
}

// 传递函数不依赖state
export default function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ Pass a state updater
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // ✅ Now count is not a dependency
  return <h1>{count}</h1>;
}
```
### 4.4.2 删除不必要的依赖
 `Object.is` 比较函数和对象总是返回 `false`，导致函数和对象作为 `useEffect` 依赖时，组件每次重新 `render` 都会执行 `useEffect` 里的函数，此时可以修改依赖项，或者把对象用 `useMemo`，函数用 `useCallback` 缓存起来。
```js
// error
 const options = { // 🚩 This object is created from scratch on every re-render
   serverUrl: 'https://localhost:1234',
   roomId: roomId
 };
 useEffect(() => {
   const connection = createConnection(options); // It's used inside the Effect
   connection.connect();
   return () => connection.disconnect();
 }, [options]); // 🚩 As a result, these dependencies are always different on a re-render

 useEffect(() => {
   const options = {
     serverUrl: serverUrl,
     roomId: roomId
   };
   const connection = createConnection(options);
   connection.connect();
   return () => connection.disconnect();
 }, [roomId]);

// error
  function createOptions() { // 🚩 This function is created from scratch on every re-render
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }
  useEffect(() => {
    const options = createOptions(); // It's used inside the Effect
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]);

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```
### 4.2.3 异步函数
`useEffect` 约定 `Effect` 函数要么没有返回值，要么返回一个 `Cleanup` 函数。 `async` 函数会隐式地返回一个 `Promise`，直接违反了这一约定，会造成不可预测的结果。
```js
// error
useEffect(async () => {
  const response = await fetch('...');
  const data = await response.json();
  setGlobalStats(data);
}, []);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      const response = await fetch(`${BASE_URL}/all`);
      const data = await response.json();
      setGlobalStats(data);
    };
    fetchGlobalStats();
  }, []);
```
## 4.3 `useLayoutEffect`
`useLayoutEffect` 会影响性能。 尽可能选择 `useEffect`。

`useLayoutEffect` 和 `useEffect` 功能相同，只是执行函数时机有区别，`useLayoutEffect` 在浏览器挂载真实 `DOM` 之前，`useEffect` 在浏览器挂载真实 `DOM` 之后。

在浏览器重绘屏幕之前调用 `useLayoutEffect` 执行布局测量：

```js
// 分两次渲染并阻止浏览器会影响性能。 尽可能避免这种情况。
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
```
# 5、`useRef`/`useImperativeHandle`
## 5.1 `useRef` 参考
`useRef(initialValue) `
- 保存不参与页面展示的数据。更改 `ref` 不会导致组件重新渲染
- useRef 返回具有单个属性(`current`)的对象，不要在 `render` 期间修改和读取 `ref.current`。

```js
function MyComponent() {
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}

function MyComponent() {
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
}
```
## 5.2 `useRef` 用法
```js
export default function VideoPlayer() {
	 const ref = useRef(null);
	 function handleClick() {
	 	ref.current.play();
	 }
	 return (<>
      <button onClick={handleClick}>'Play'</button>
      <video ref={ref} >
        <source src="" type="video/mp4"/>
      </video>
    </>);
}

// new VideoPlayer() 的结果仅用于初始渲染，但仍会在每次渲染时调用此函数
function Video() {
  const playerRef = useRef(new VideoPlayer());
}
// 优化
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
}
```
### 5.2.2 操作 `DOM`
```js
export default function VideoPlayer() {
	 const ref = useRef(null);
	 function handleClick() {
	 	ref.current.play();
	 }
	 return (<>
      <button onClick={handleClick}>'Play'</button>
      <video ref={ref} >
        <source src="" type="video/mp4"/>
      </video>
    </>);
}
```
## 5.3 `setTimeout`
在setTimeout的回调函数里面，拿不到useState的最新值原因：
- react 中的state，遵循着状态不可变的原则，在setState之后，不会修改原来老的state的值，而是把新值重新赋值给hook.memoizedState。
- 对于react函数组件，其本身就是个render函数，每次重渲染之后，都会重新执行此函数，而每次执行的时候就会产生一个新的函数作用域。
- setTimeout的回调函数对hook.memoizedState形成了闭包引用，而在setState之后，都会重新执行组件函数，setTimeout 的回调函数会捕获在 setTimeout 被创建时的状态的快照，而不是最新的状态。

能获取useRef的最新值
- useRef本身并不能解决闭包引用的问题，但是它通过创建一个稳定的引用:

```js
function mountRef<T>(initialValue: T): {|current: T|} {
  const hook = mountWorkInProgressHook();
  const ref = {current: initialValue};
  hook.memoizedState = ref;
  return ref;
}
```
## 5.3 `useImperativeHandle`
`useImperativeHandle(ref, createHandle, dependencies?)`
```js
const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);
  return (<>...</>);
}
```
- 将子组件的 `DOM` 节点暴露给父组件。
- `ref`： 父组件传入的 `ref`。
- `createHandle`：不带参数并返回要公开的方法的对象。
- 可选的 `dependencies`： 使用 `Object.is` 比较将每个依赖与其先前的值进行比较。
- 父组件可以用props来操作子组件时，不应该使用ref。例如：与其暴露 ` { open, close } ` 方法，不如 `<Modal isOpen={isOpen} />`通过`props` 管理子组件。
# 6、`memo`
`memo` 是一个高阶组件，接受一个组件作为参数，并返回一个原组件为基础的新组件
## 6.1 参考
`memo(Component, arePropsEqual?)`
- `Component`： 要记忆化的组件。
- 可选的 `arePropsEqual`： 接受两个参数的函数： 该组件的先前属性及其新属性。 
- `memo` 返回一个新的 `React` 组件。
- 在遍历 `props` 进行对比的过程，就需要一定的执行时间，如果组件较小，`re-render` 的代价比对比 `props` 的代价更低，这时候就不适合使用`memo`。
```js
// useMemo的update阶段源码如下：
function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (prevState !== null) {
    // Assume these are defined. If they're not, areHookInputsEqual will warn.
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        return prevState[0];
      }
    }
  }
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```
## 6.2 用法
### 6.2.1 `props` 不变时跳过重新渲染
```js
export const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

//  context改变也会导致memo 缓存组件重新render，点击按钮更改context即使props没变也会触发Greeting 重新render
export default function MyApp() {
  const [theme, setTheme] = useState('dark');
  function handleClick() { setTheme(theme === 'dark' ? 'light' : 'dark'); }
  return (<ThemeContext.Provider value={theme}>
      <button onClick={handleClick}> Switch theme</button>
      <Greeting name="Taylor" />
  </ThemeContext.Provider>);
}
```

- `props` 修改时 `memo`  返回一个新的组件而不是修改组件。
- 页面是强交互，并且经常相同的 `props` 导致昂贵渲染可以考虑使用 `memo`。
- 如果传递的 `props` 每次都不一样，不必使用 `memo` 进行优化。
- 如果传递对象和函数，可以用 `usememo` 和 `usecallback` 缓存，防止父组件每次渲染，都是不同的值。
### 6.2.2 指定自定义比较函数 
当新属性与旧属性相同时，返回 `true`； 否则返回 `false`。
```js
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```
# 7、`useMemo`
## 7.1 参考
`useMemo(calculateValue, dependencies)`
- `calculateValue`： 计算要缓存的值的函数。
- `dependencies`： 计算 `calculateValue` 代码中所有依赖列表。 
- 返回不带参数调用 `calculateValue` 的结果，在下一次渲染期间，它将返回上次渲染中已存储的值（如果依赖未更改），或者再次调用 `calculateValue`，并返回  `calculateValue`  返回的结果。
- 不能在循环或条件内调用。 
## 7.2 用法
使用 `useMemo` 进行优化仅在少数情况下有价值：

 - 计算耗时，并且依赖变化少。
 - 传递给`memo`。

```js
export default function TodoList({ todos, tab, theme }) {
  // Every time the theme changes, this will be a different array...
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      {/* ... so List's props will never be the same, and it will re-render every time */}
      <List items={visibleTodos} />
    </div>
  );
}

export default function TodoList({ todos, tab, theme }) {
  // Tell React to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  );
  return (
    <div className={theme}>
      {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  );
}

// 将 <List /> JSX 节点本身封装在 useMemo 中
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
  return (
    <div className={theme}>
      {children}
    </div>
  );
}
```

判断计算是否昂贵：

 - `useMemo` 对于第一次渲染没有优化。
 - 查看代码耗时，如果超过一毫秒可以考虑用 `useMemo` 缓存，可以使用谷歌 [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) 降低机器性能。

```javascript
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```

`useMemo`  缓存组件：

```jsx
 export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
  return (
    <div className={theme}>
      {children}
    </div>
  );
}
```

 不能在循环中调用 `useMemo`：
```js
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 You can't call useMemo in a loop like this:
        const data = useMemo(() => calculateReport(item), [item]);
        return (
          <figure key={item.id}>
            <Chart data={data} />
          </figure>
        );
      })}
    </article>
  );
}

// good
const Report = memo(function Report({ item }) {
  const data = calculateReport(item);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
});
```
# 8、`useCallback`
`useMemo` 的功能是 `useCallback` 的超集。与 `useCallback` 只能缓存函数相比，`useMemo` 可以缓存任何类型的值（当然也包括函数）。`React` 不会调用传入的函数，而是存储函数。
## 8.1 参考
`useCallback(fn, dependencies)`
- `fn`： 要缓存的函数值。
- `dependencies`： `fn` 函数依赖列表。 
- 在初始渲染中，`useCallback` 返回你传递的 fn 函数。`useCallback` 在重新渲染之间缓存一个函数，直到它的依赖发生变化。
- 不能在循环或条件内调用。 

## 8.2 用法
### 8.2.1 跳过组件的重新渲染
- 将函数传给用 `memo` 缓存的子组件
- 函数作为其他 `Hook` 依赖
```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  const createOptions = useCallback(() => {
    return { serverUrl: 'https://localhost:1234', roomId: roomId };
  }, [roomId]); // ✅ Only changes when roomId changes
  useEffect(() => {
    const options = createOptions();
  }, [createOptions]); // ✅ Only changes when createOptions changes
}

// 但是，最好不要依赖函数
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    function createOptions() { // ✅ No need for useCallback or function dependencies!
      return { serverUrl: 'https://localhost:1234', roomId: roomId };
    }
    const options = createOptions();
  }, [roomId]); // ✅ Only changes when roomId changes
}
```
### 8.2.2 通过传递 更新函数 来移除该依赖
```js
function TodoList() {
  const [todos, setTodos] = useState([]);
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
}
```
### 8.2.3 优化自定义Hook
建议将自定义 `Hook` 返回的任何函数封装到 `useCallback` 中，确保了 `Hook` 的使用者可以在需要时优化他们自己的代码。
```js
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);
  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);
  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);
  return { navigate, goBack };
}
```

**参考：**
[React官方文档](https://react.dev/)
[用动画和实战打开 React Hooks（一）：useState 和 useEffect](https://juejin.cn/post/6844904127110053895)
[React Hooks 开发技巧和正确姿势, 相关关键源码解读](https://mp.weixin.qq.com/s/LkSdRC5HqiLpKNnNtS7Jyg)
[React Hooks完全上手指南](https://zhuanlan.zhihu.com/p/92211533)
[A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)