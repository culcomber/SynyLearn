## 1、React基本概念

**1.1 React 核心原理**

当数据发生变化时，不需要操作DOM，UI 能够自动把变化反映出来。

通过 `JSX` 语法，用声明式的方式来描述数据（`state`）和 `UI` 之间的关系。

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230427100431552.png" alt="image-20230427100431552" style="zoom:47%;" />

**1.2 基本概念**

1. **组件**

   React 中所有的元素都是组件

   - 内置组件：内置组件其实就是映射到 `HTML` 节点的组件，例如 `div`、`input`、`table` 等等，作为一种约定，它们都是小写字母。
   - 自定义组件：自定义组件其实就是自己创建的组件，使用时必须以大写字母开头，例如`TopicList`、`TopicDetail`。

   React 组件是以树状结构组织到一起的，一个 React 的应用通常只有一个根组件。

   ```jsx
   function CommentBox() {
       return (
           <div>
               <CommentHeader />
               <CommentList />
               <CommentForm />
           </div>
       );
   }
   ```

2. **状态**

   数据状态在`state`，数据变化时会自动重新渲染`UI`，任何一个 `state` 发生变化，整个组件重新执行一遍。

   `props`类似`HTML` 标记上属性，在父子组件之间传递状态。**父组件传递的属性变化时，父子组件都会重新渲染。**

   ```jsx
   import React from "react";
   function CountLabel({ count }) {
       const color = count > 10 ? "red" : "blue";
       return <span style={{ color }}>{count}</span>;
   }
   export default function Counter() {
       const [count, setCount] = React.useState(0); // 定义了 count 这个 state
       return (
           <div>
               <button onClick={() => setCount(count + 1)}>
                   {/* count 发生变化时，CountLabel 也会重新渲染 */}
               	<CountLabel count={count} />
               </button>
           </div>
       );
   }
   ```

3.  **`JSX`**

   `JSX` 不是一个新的模板语言，是一个**语法糖**。`JSX` 的表达能力等价于 `JavaScript` 的表达能力，而只是原生 `JavaScript` 的另一种写法。

   ```js
   // 不用JSX实现Counter，但是JSX更高效简洁
   React.createElement(
       "div", // 第一个参数表示组件的类型
       null, // 第二个参数是传给组件的属性，也就是 props；
       React.createElement(
           "button",
           { onClick: function onClick() {
           	return setCount(count + 1);
           } },
           React.createElement(CountLabel, { count: count })
       ) // 第三个以及后续所有的参数则是子组件。
   );
   ```

## 2、Hooks

**2.1 Class 组件弊端**

- 组件之间是不会互相继承的。

- 所有 `UI` 都是由状态驱动的，因此很少会在外部去调用一个类实例（即组件）的方法。


**2.2 React 组件的模型**

把 `UI` 的展现看成一个函数的执行过程。其中，`Model` 是输入参数，函数的执行结果是 `DOM 树`，也就是 `View`。**函数组件适合去描述 `State => View` 这样的一个映射。**

把一个外部的数据绑定到函数的执行。当数据变化时，函数能够自动重新执行，这个机制就是 **`Hooks`**。

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230427102941021.png" alt="image-20230427102941021" style="zoom:30%;" />

Hooks 就是**把某个目标结果（Result）钩到某个可能会变化的数据源或者事件源（State、URL、窗口大小）上，那么当被钩到的数据或事件发生变化时，产生这个目标结果的代码（Execution）会重新执行，产生更新后的结果**。

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230427103858808.png" alt="image-20230427103858808" style="zoom:40%;" />

**逻辑复用**

Hooks 好处：简化了逻辑复用

Hooks 中被钩的对象（State、URL、窗口大小），不仅可以是某个独立的数据源，也可以是另一个 Hook 执行的结果。

## 3、内置 Hooks

只能在函数组件的顶级作用域使用；只能在函数组件或者其他 Hooks 中使用

1. **`useState`：让函数组件具有维持状态的能力**

   state中永远不要保存可以通过计算得到的值。

   - 从 `props` 传递过来的值
   - 从 `URL` 中读到的值
   - 从 `cookie`、`localStorage` 中读取的值

2. **`useEffect`：执行副作用**

   **`useEffect` 是每次组件 `render` 完后判断依赖并执行**

   - 每次 render 后执行：不提供第二个依赖项参数 `useEffect(() => {})`
   - 仅第一次 render 后执行：提供一个空数组作为依赖项 `useEffect(() => {}, [])`
   - 第一次以及依赖项发生变化后执行：提供依赖项数组 `useEffect(() => {}, [deps])`
   - 组件 unmount 后执行：返回一个回调函数 `useEffect() => { return () => {} }, [])`

   定义依赖项

   - 依赖项中定义的变量一定是会在**回调函数中用到**的，否则声明依赖项其实是没有意义的。
   - 依赖项一般是一个常量数组，而不是一个变量。因为一般在创建 callback 的时候，你其实非常清楚其中要用到哪些依赖项了。
   - React 会使用**浅比较**来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化。

3. **`useCallback`：缓存回调函数**

   ```jsx
   function Counter() {
       const [count, setCount] = useState(0);
       // handleIncrement会被重新渲染，只要有状态发生变化而重新渲染函数组件
       // 每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染
       // const handleIncrement = () => setCount(count + 1);
      
       // 只有当 count 发生变化时，我们才需要重新定一个回调函数
       // 接收这个回调函数作为属性的组件，也不会频繁地需要重新渲染
       const handleIncrement = useCallback(
           () => setCount(count + 1),
           [count], // 只有当 count 发生变化时，才会重新创建回调函数
       );
       return <button onClick={handleIncrement}>+</button>
   }
   ```

4. **`useMemo`：缓存计算的结果**

   避免在用到的数据没发生变化时进行的重复计算

   避免子组件的重复渲染

   ```js
   // useMemo 实现了 useCallback 的功能
   const myEventHandler = useMemo(() => {
       // 返回一个函数作为缓存结果
       return () => {
       	// 在这里进行事件处理
       }
   }, [dep1, dep2]);
   ```

   useCallback & useMemo：建立了 **绑定结果到依赖数据** 的关系。只有当依赖变了，这个结果才需要被重新得到

5. **`useRef`：在多次渲染之间共享数据**

   - **存储跨渲染的数据**

     可以把 `useRef` 看作是在函数组件之外创建的一个容器空间，通过唯一的 `current` 属设置一个值，从而在函数组件的多次渲染之间共享这个值。

     **`useRef` 保存的数据一般是和 `UI` 的渲染无关，因此当 `ref` 的值发生变化时，不会触发组件的重新渲染的。**

   - **保存某个 DOM 节点的引用**

     ```tsx
     function TextInputWithFocusButton() {
         const inputEl = useRef(null);
         const onButtonClick = () => {
             // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
             inputEl.current.focus();
         };
         return (
             <>
                 <input ref={inputEl} type="text" />
                 <button onClick={onButtonClick}>Focus the input</button>
             </>
         );
     }
     ```

6. **`useContext`：定义全局状态**

   全局状态管理：跨层次，或者同层的组件之间要进行数据的共享。

   在 React 的开发中，除了像 Theme、Language 等一目了然的需要全局设置的变量外，很少会使用 Context 来做太多数据的共享。

## 4、自定义Hooks

Hooks 有两个非常核心的优点：一是方便进行逻辑复用；二是帮助关注分离。

自定义 Hooks 的两个特点：名字以 use 开头的函数；函数内部一定调用了其它的 Hooks。

```jsx
import { useState, useCallback }from 'react';
function useCounter() {
    // 定义 count 这个 state 用于保存当前数值
    const [count, setCount] = useState(0);
    // 实现加 1 的操作
    const increment = useCallback(() => setCount(count + 1), [count]);
    // 实现减 1 的操作
    const decrement = useCallback(() => setCount(count - 1), [count]);
    // 重置计数器
    const reset = useCallback(() => setCount(0), []);
    // 将业务逻辑的操作 export 出去供调用者使用
    return { count, increment, decrement, reset };
}

import React from 'react';
function Counter() {
    // 调用自定义 Hook
    const { count, increment, decrement, reset } = useCounter();
    // 渲染 UI
    return (
        <div>
            <button onClick={decrement}> - </button>
            <p>{count}</p>
            <button onClick={increment}> + </button>
            <button onClick={reset}> reset </button>
        </div>
    );
}
```

**4.1 业务场景**

1. 抽取业务逻辑：useAsync发起异步请求获取数据并显示在界面上

   利用了 Hooks 能够管理 React 组件状态的能力，将一个组件中的某一部分状态独立出来，从而实现了通用逻辑的重用。

2. 封装通用逻辑：useScroll组件需要绑定到当前滚动条的位置数据上

3. 监听浏览器状态

   Hooks可以让 React 的组件绑定在任何可能的数据源上。这样当数据源发生变化时，组件能够自动刷新。

4. 拆分复杂组件

   避免函数冗长：尽量将相关的逻辑做成独立的 Hooks，然后在函数组中使用这些 Hooks，通过参数传递和返回值让 Hooks 之间完成交互。

   拆分逻辑的目的不一定是为了重用，而可以是仅仅为了业务逻辑的隔离。不一定要把 Hooks 放到独立的文件中，而是可以和函数组件写在一个文件中。

## 5、Redux

Redux 用全局唯一的 Store 维护了整个应用程序的状态。对于页面的多个组件，都是从这个 Store 来获取状态的，保证组件之间能够共享状态。

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230428103128109.png" alt="image-20230428103128109" style="zoom:50%;" />

**Redux Store 特点**

1. **Redux Store 是全局唯一的**。即整个应用程序一般只有一个 Store。

2. **Redux Store 是树状结构**，可以更天然地映射到组件树的结构，虽然不是必须的。

**使用场景**

- **跨组件的状态共享**：当某个组件发起一个请求时，将某个 Loading 的数据状态设为True，另一个全局状态组件则显示 Loading 的状态。

- **同组件多个实例的状态共享**：某个页面组件初次加载时，会发送请求拿回了一个数据，切换到另外一个页面后又返回。这时数据已经存在，无需重新加载。设想如果是本地的组件 state，那么组件销毁后重新创建，state 也会被重置，就还需要重新获取数据。

**基本概念**

- State 即 Store，一般就是一个纯 JavaScript Object。
- Action 也是一个 Object，用于描述发生的动作。
- Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的Store。

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230428103500655.png" alt="image-20230428103500655" style="zoom:33%;" />

<img src="C:\Users\SamTL\AppData\Roaming\Typora\typora-user-images\image-20230428103703201.png" alt="image-20230428103703201" style="zoom:33%;" />

所有对于 Store 的修改都必须通过这样一个公式去完成，即通过 Reducer

完成，而不是直接修改 Store。*Reducer(State + Action) => New State*

- 可以保证数据的不可变性（Immutable），同时也能带来两个非常大的好处。
- 可预测性（Predictable）：即给定一个初始状态和一系列的 Action，一定能得到一致的结果，同时这也让代码更容易测试。
- 易于调试：可以跟踪 Store 中数据的变化，甚至暂停和回放。因为每次 Action 产生的变化都会产生新的对象，而我们可以缓存这些对象用于调试。Redux 的基于浏览器插件的开发工具就是基于这个机制，非常有利于调试。

 **Redux 处理异步逻辑**

如果发现接受到的 action 是一个函数，那么就不会传递给 Reducer，而是执行这个函数，并把 dispatch 作为参数传给这个函数，从而在这个函数中你可以自由决定何时，如何发送Action。

```jsx
function fetchData() {
    return dispatch => {
        dispatch({ type: 'FETCH_DATA_BEGIN' });
        fetch('/some-url').then(res => {
        	dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
        }).catch(err => {
        	dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
        })
    }
}

function DataList() {
    const dispatch = useDispatch();
    // dispatch 了一个函数由 redux-thunk 中间件去执行
    dispatch(fetchData());
}
```

**实例**

获取列表useList，在多个组件中使用useList，不会重复触发接口调用

```jsx
export function useFetchAdmins() {
    const dispatch = useDispatch();
    const { admins, fetchAdminsPending, fetchAdminsError } = useSelector(
        state => ({
            admins: state.pluginPluginManager.home.admins,
            fetchAdminsPending: state.pluginPluginManager.home.fetchAdminsPending,
            fetchAdminsError: state.pluginPluginManager.home.fetchAdminsError,
        }),
        shallowEqual,
    );
    const boundAction = useCallback(
        (...args) => {return dispatch(fetchAdmins(...args));},
        [dispatch],
    );
    
    // 状态变更才获取数据
    useEffect(() => {
    	if (!admins && !fetchAdminsPending && !fetchAdminsError) boundAction();
    }, [admins, fetchAdminsPending, fetchAdminsError, boundAction]);
    
    return {admins,fetchAdmins: boundAction,fetchAdminsPending,fetchAdminsError,};
}
```





