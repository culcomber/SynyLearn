import { createStore } from 'redux'

/*
其中 State 即 Store，一般就是一个纯 JavaScript Object。
Action 也是一个 Object，用于描述发生的动作。
而 Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的Store。
Reducer(State + Action) => New State

1. 先创建 Store；
2. 再利用 Action 和 Reducer 修改 Store；
3. 最后利用 subscribe 监听 Store 的变化。*/

// 1 定义 Store 的初始值
const initialState = { value: 0 }

// 2 Reducer，处理 Action 返回新的 State
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        default:
            return state
    }
}
// 利用 Redux API 创建一个 Store，参数就是 Reducer
const store = createStore(counterReducer)

// 3 Store 提供了 subscribe 用于监听数据变化
store.subscribe(() => console.log(store.getState()))

// 计数器加 1，用 Store 的 dispatch 方法分发一个 Action，由 Reducer 处理
const incrementAction = { type: 'counter/incremented' };
store.dispatch(incrementAction); // 监听函数输出：{value: 1}

// 计数器减 1
const decrementAction = { type: 'counter/decremented' };
store.dispatch(decrementAction) // 监听函数输出：{value: 0}