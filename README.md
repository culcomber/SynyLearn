# SynyLearn
同步学习笔记和学习资料

todo

- 跨域实践
- 安全实践
- hook child
- TS
- https://github.com/dennis-jiang/Front-End-Knowledges
- 字母的大小比较
- webstrom控制滑轮
- https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e
- https://overreacted.io/react-as-a-ui-runtime/
  https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/

## [Recommended Reading](https://julesblom.com/writing/react-hook-component-timeline#recommended-reading)

- [React Docs: Render and Commit](https://react.dev/learn/render-and-commit)
- [React Docs: Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects)
- [Thoughtspile: So you think you know everything about React refs](https://thoughtspile.github.io/2021/05/17/everything-about-react-refs/)
- [Thoughtspile: useLayoutEffect is a bad place for deriving state](https://blog.thoughtspile.tech/2021/09/21/useeffect-derived-state/)
- [Thoughtspile: useEffect sometimes fires before paint](https://blog.thoughtspile.tech/2021/11/15/unintentional-layout-effect/)
- [Why React Re-Renders - Josh W Comeau](https://www.joshwcomeau.com/react/why-react-re-renders)
- [Blogged Answers: A (Mostly) Complete Guide to React Rendering Behavior · Mark’s Dev Blog](https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/)
  - Or Zhenghao’s summary of it if you’re short on time or focus: [When Does React Render Your Component?](https://www.zhenghao.io/posts/react-rerender)
- [A Visual Guide to useEffect | Alex Sidorenko](https://alexsidorenko.com/blog/useeffect/)
- [A Visual Guide to useEffect - Cleanups | Alex Sidorenko](https://alexsidorenko.com/blog/useeffect-cleanups/)
- [A Complete Guide to useEffect — Overreacted](https://overreacted.io/a-complete-guide-to-useeffect)
- [Erik Ras: Modeling React in XState](https://erikras.com/blog/modeling-react-in-xstate)
- [📺 Understand the React Hook Flow | egghead.io](https://egghead.io/lessons/react-understand-the-react-hook-flow)
- [donavon: A flowchart that explains the new lifecycle of a Hooks component](https://github.com/donavon/hook-flow)

```jsx
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
Didact.render(element, container)

```

