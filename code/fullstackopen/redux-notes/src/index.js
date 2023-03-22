import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import noteService from './services/notes'
import noteReducer, { appendNote, setNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
import store from './store'

/*const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})
const store = createStore(reducer)*/
// 使用toolkit简化配置
/*const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})*/
// 放到store


// 请求后台，并把数据保存到store  适合放在App.js，react-redux提供useDispatch HOOK
/*noteService.getAll().then(notes =>
  // notes.forEach(note => {
  //   store.dispatch(appendNote(note))
  // })
  store.dispatch(setNotes(notes))
)*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)