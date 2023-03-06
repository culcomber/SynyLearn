import logo from './logo.svg';
import './App.css';
import {Link} from "react-router-dom";
import React from "react";

function App() {
  return (
      <div>
          <h1>Hello World</h1>
          <div>
              <Link to="unicafe">Unicafe</Link>
          </div>
          <div>
              <Link to="courseinfo">Courseinfo</Link>
          </div>
          <div>
              <Link to="anecdotes">Anecdotes</Link>
          </div>
      </div>
  );
}

export default App;
