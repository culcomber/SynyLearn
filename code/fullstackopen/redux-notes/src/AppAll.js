import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}
const store = createStore(counterReducer) // 调用redux方法创建store

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      {/* 把Action dispatch 到 store */}
      <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>plus</button>
      <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>minus</button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />)
}

renderApp()
store.subscribe(renderApp) // store变更后重新渲染组件