import React from 'react';
import Button, {ButtonSize, ButtonType} from "./components/Button/button";

function App() {
  return (
    <div>
        <div>
            <h3>Button</h3>
            <Button>HELLO</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Primary</Button>
            <Button btnType={ButtonType.Link} href="https://react.dev/">Link</Button>
        </div>

    </div>
  );
}

export default App;
