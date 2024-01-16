import './App.css';
import React from 'react';

function App() {
  return (
    <>
      <div className={'nav-link'}>
        <div>
          <a href={`/managing-state`}>ManagingState</a>
        </div>
        <div>
          <a href={`/escape-hatches`}>EscapeHatches</a>
        </div>
        <div>
          <a href={`/performance`}>Performance</a>
        </div>
        <div>
          <a href={`/pattern`}>Pattern</a>
        </div>
        <div>
          <a href={`/custom-hooks`}>Pattern</a>
        </div>
        <div>
          <a href={`/test`}>Test</a>
        </div>
      </div>
    </>
  );
}

export default App;
