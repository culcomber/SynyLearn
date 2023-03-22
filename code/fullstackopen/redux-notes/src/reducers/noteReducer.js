import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes'

// 数据从后台获取
/*const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));*/

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    /*createNote(state, action) {
      /!*const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId(),
      });*!/
      // 后台会产生id。并且在services\notes.js增加important属性
      state.push(action.payload)
    },*/
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;
export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}
export default noteSlice.reducer;

/*// state使用toolkit初始化参数
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
      // 组件使用dispatch(createNote(content))，dispatch派发
    case "NEW_NOTE":
      // return state.concat(action.data)
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

// 处理函数，单独导出，index.js只使用到了noteReducer
// return store对象，被调用dispatch(createNote(content))
export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

export default noteReducer;*/
