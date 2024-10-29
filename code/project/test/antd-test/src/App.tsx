import React from 'react';
import {Button, Typography} from 'antd';

function App() {
  const { Title } = Typography;
    return (
      <div className="App">
          {/*@ts-ignore*/}
          <Title as="h2">这是一个标题</Title>
          <Title>这是一个标题</Title>
        <Button type="primary">Hello Ant Design!</Button>
      </div>
  );
}

export default App;

