import Notes from "./components/Notes";
import NewNote from "./components/NewNote";

const App = () => {
  const filterSelected = (value) => {
    console.log(value);
  };

  return (
    <div>
      <NewNote />
      {/* input name 属性相同，只能勾选一个 */}
      <div>
        all{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
        />
        important{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
        />
        nonimportant{" "}
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NONIMPORTANT")}
        />
      </div>
      <Notes />
    </div>
  );
};

export default App;
