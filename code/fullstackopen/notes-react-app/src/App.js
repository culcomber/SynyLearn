import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    /*axios.get("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });*/
    noteService
    .getAll()
    .then(response => {
      setNotes(response.data)
    })
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    // 在POST请求中发送的数据是一个JavaScript对象，axios自动知道为Content-Type头设置适当的application/json值
    /*axios
      .post("http://localhost:3001/notes", noteObject) // 把数据传到后台
      .then((response) => {
        setNotes(notes.concat(response.data)); // 使用后台返回数据
        setNewNote("");
      });*/
      noteService
          .create(noteObject)
          .then(response => {
              setNotes(notes.concat(response.data))
              setNewNote('')
          })
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    /*axios.put(url, changedNote).then((response) => {
      setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    });*/
    noteService
        .update(id, changedNote)
        .then(response => {
          setNotes(notes.map(note => note.id !== id ? note : response.data))
        })
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
