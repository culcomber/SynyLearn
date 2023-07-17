## 1、What is "Rendering"?

**Rendering** is the process of React asking your components to describe what they want their section of the UI to look like, now, based on the current combination of props and state.

根据组件（基于props and state）去展示UI

### 1.1 Rendering Process Overview

在渲染过程中，React 将从组件树的根节点开始向下遍历，找到并标记需要更新的组件。对于每个被标记的组件，React将调用`FunctionComponent(props)`（针对函数组件）或`classComponentInstance.render()`（针对类组件），并将渲染输出保存到渲染传递的下一步。

### 1.2 Render and Commit Phases



## 2、How Does React Handle Renders?

### Queuing Renders

### Standard Render Behavior

### Rules of React Rendering

### Component Metadata and Fibers

### Component Types and Reconciliation

### Keys and Reconciliation

### Render Batching and Timing

### Async Rendering, Closures, and State Snapshots

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

