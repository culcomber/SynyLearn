import Note from './components/Note'

// 解构
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/* 循环 */}
        <ul>
          {notes.map(note => 
            <Note key={note.id} note={note} />
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App
