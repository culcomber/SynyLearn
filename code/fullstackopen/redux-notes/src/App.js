import { useEffect } from "react";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import VisibilityFilter from "./components/VisibilityFilter";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";
import store from './store'

const App = () => {
  const dispatch = useDispatch();
  /*useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch]) // dispatch存储在redux，这个useEffect只会在开始时运行一次*/
  // App.js组件不应该处理请求，把请求放在noteReducer更加合适
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
