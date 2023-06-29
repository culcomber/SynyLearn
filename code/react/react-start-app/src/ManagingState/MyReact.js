import { useState } from 'react';

export function useReducer(reducer, initialState) {
  // 利用useState保存state
  const [state, setState] = useState(initialState);

  // 调用dispatch-->调用render函数，返回新state-->setState保存新state
  function dispatch(action) {
    /*const nextState = reducer(state, action);
    setState(nextState);*/
    // This is because the dispatched actions are queued until the next render
    setState((s) => reducer(s, action));
  }

  return [state, dispatch];
}