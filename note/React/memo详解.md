1、`memo`

```js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

- ``memo`可以使组件在`props`不变情况下，跳过重新熏染。

- `memo`可以是性能优化的一种手段，但是并不保证使用`memo`就一定解决性能问题。`memoization` is a performance optimization, not a guarantee. 

- `props`修改时`memo` 返回一个新的组件而不是修改组件。The `memo` does not modify this component, but returns a new, `memoized` component instead. 
- react使用`Object.is`比较props是否相同。React will compare each prop with [`Object.is`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

- 页面是强交互，并且经常相同的props导致昂贵渲染可以考虑使用memo。If your `app` is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find `memoization` very helpful. Optimizing with `memo`  is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive.

- 如果传递的props每次都不一样，不必使用memo进行优化。 `memo` is completely useless if the props passed to your component are *always different,* such as if you pass an object or a plain function defined during rendering.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1. When a component visually wraps other components, let it [accept JSX as children.](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.  ==todo==
2. Prefer local state and don’t [lift state up](https://react.dev/learn/sharing-state-between-components) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library. 尽量使用本身props，慎重把props提升，不要把临时state，例如表单的props保存到全局state。
3. Keep your [rendering logic pure.](https://react.dev/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding `memoization`. 保证组件的幂等性。
4. Avoid [unnecessary Effects that update state.](https://react.dev/learn/you-might-not-need-an-effect) Most performance problems in React `apps` are caused by chains of updates originating from Effects that cause your components to render over and over. 在`useEffect`中正确更新state。
5. Try to [remove unnecessary dependencies from your Effects.](https://react.dev/learn/removing-effect-dependencies) For example, instead of `memoization`, it’s often simpler to move some object or a function inside an Effect or outside the component. `useEffect`移除不必要依赖，可以把普通函数放在组件外，避免重新渲染。

2、`useMemo`



3、`useCallback`



4、`Should we use useCallback in every function handler in React Functional Components`

声明式函数：函数会被变量提升

函数表达式：函数名变量提升，赋值为undefined，运行到声明处才会被赋值

箭头函数：函数表达式语法糖

https://stackoverflow.com/questions/55284165/can-i-use-arrow-functions-instead-of-normal-functions-for-react-hooks
https://stackoverflow.com/questions/64134566/should-we-use-usecallback-in-every-function-handler-in-react-functional-componen

https://www.appsloveworld.com/reactjs/100/7/should-we-use-usecallback-in-every-function-handler-in-react-functional-component