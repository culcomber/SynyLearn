import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div>
        <div>
            <h3>Button</h3>
            <button>原生</button>
            <Button>HELLO</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary_lg</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled={true}>Primary_sm</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Danger_lg</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger_sm</Button>
            <Button btnType={ButtonType.Link} href="https://react.dev/">Link</Button>
            <Button btnType={ButtonType.Link} href="https://react.dev/" disabled={true}>Link disabled</Button>
        </div>

    </div>
  );
}

export default App;
