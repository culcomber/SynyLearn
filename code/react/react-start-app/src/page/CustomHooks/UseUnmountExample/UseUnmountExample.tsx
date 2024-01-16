import {useState} from "react";
import {useUnmount} from "./UseUnmount";
import React from 'react';

const Child = () => {
    console.log('Child')
    const [num, setNum] = useState(0);
    useUnmount(() => console.log('num = ' + num));

    return (<div>
        num: {num}
        <button onClick={() => setNum(num + 1)}>add</button>
    </div>)
}

export const UseUnmountExample = () => {
    console.log('Example')
    const [showFlag, setShowFlag] = useState(true);

    return (<div>
        {showFlag && <Child />}
        <button onClick={() => setShowFlag(false)}>销毁 Child</button>
    </div>)
}