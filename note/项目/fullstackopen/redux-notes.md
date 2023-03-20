## Part 6

### a Flux架构与Redux

1. Flux-architecture

   Flux 是一种架构思想，专门解决软件的结构问题，就像MVC，[Flux存在多种实现](https://github.com/voronianski/flux-comparison)。

   Flux 的最大特点，就是数据的"单向流动"

   1. 用户访问 View

   2. View 发出用户的 Action

   3. Dispatcher 收到 Action，要求 Store 进行相应的更新

   4. Store 更新后，发出一个"change"事件

   5. View 收到"change"事件后，更新页面

      <img src="../../assets/image-20230320144748799.png" alt="image-20230320144748799" style="zoom:67%;" />

   `\components\MyButton.jsx`：纯组件（即不含有任何状态），从而方便了测试和复用

   `\components\MyButtonController.jsx`："controller view"组件只用来保存状态，然后将其转发给子组件MyButton，将MyButton点击事件派发给dispatcher，并且响应store改变事件

   `\actions\ButtonActions.js`：

   `\dispatcher\AppDispatcher.js`：将 Action 派发到 Store，可以看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递路线

   `\stores\ListStore.js`：更新状态，并将变化传递给MyButtonController

2. Redux

   - 创建应用`npx create-react-app redux-notes`

3. Redux-notes

4. Pure functions, immutable

5. Array spread syntax

6. Uncontrolled form

7. Action creators

8. Forwarding Redux-Store to various components

9. More components

10. Exercises 6.3.-6.8.

### b 再来点 reducers

1. Store with complex state
2. Combined reducers
3. Finishing the filters
4. Redux Toolkit
5. Redux DevTools
6. Exercises 6.9.-6.12.

### c 在Redux应用中与后端通信

1. Asynchronous actions and redux thunk
2. Exercises 6.15.-6.18.

### d React Query, useReducer and the context

1. Managing data on the server with the React Query library
2. Synchronizing data to the server using React Query
3. Optimizing the performance
4. useReducer
5. Using context for passing the state to components
6. Defining the counter context in a separate file
7. Which state management solution to choose?
8. Exercises 6.23.-6.24.

### d connect方法(old)

1. Using the connect-function to share the redux store to components
2. mapDispatchToProps
3. Referencing action creators passed as props
4. Alternative way of using mapDispatchToProps
5. Presentational/Container revisited
6. Redux and the component state
7. Exercises 6.19.-6.21.