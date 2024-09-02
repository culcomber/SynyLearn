import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div>
        <div>
            <h3>Button</h3>
            <button>原生</button>
            <Button>HELLO</Button>
            <Button btnType="primary" size="lg">Primary_lg</Button>
            <Button btnType="primary" size="sm" disabled={true}>Primary_sm</Button>
            <Button btnType="danger" size="lg">Danger_lg</Button>
            <Button btnType="danger" size="sm">Danger_sm</Button>
            <Button btnType="link" href="https://react.dev/">Link</Button>
            <Button btnType="link" href="https://react.dev/" disabled={true}>Link disabled</Button>
        </div>

    </div>
  );
}

export default App;
