import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
export function Counter() {
    // 从 state 中获取当前的计数值
    const count = useSelector(state => state.value)
    // 获得当前 store 的 dispatch 方法
    const dispatch = useDispatch()
    // 在按钮的 click 时间中去分发 action 来修改 store
    return (
        <div>
            <button
                onClick={() => dispatch({ type: 'counter/incremented' })}
            >+</button>
            <span>{count}</span>
            <button
                onClick={() => dispatch({ type: 'counter/decremented' })}
            >-</button>
        </div>
    )
}