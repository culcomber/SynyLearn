import React from "react";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

// const store = createStore(noteReducer);

const App = () => {
  const dispatch = useDispatch();
  // useSelector选择store，参数是函数
  // 选择重要笔记 const importantNotes = useSelector(state => state.filter(note => note.important)) 
  // 选择全部笔记
  const notes = useSelector((state) => state);

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    /* App.js 组件不涉及store 逻辑，提取到Reducer
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    });*/
    /*index.js使用react redux库提供Provider组件，App接收index传递store
    store.dispatch(createNote(content))*/
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;