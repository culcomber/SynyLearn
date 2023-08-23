import './App.css';
import React from 'react';
import Performance from "./page/Performance/Performance";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href={`/managing-state`}>ManagingState</a>
          </li>
          <li>
            <a href={`/escape-hatches`}>EscapeHatches</a>
          </li>
          <li>
            <a href={`/agent`}>Agent</a>
          </li>
          <li>
            <a href={`/performance`}>Performance</a>
          </li>
          <li>
            <a href={`/pattern`}>Pattern</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
