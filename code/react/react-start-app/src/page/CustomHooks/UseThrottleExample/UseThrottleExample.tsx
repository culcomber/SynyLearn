import {useThrottle} from "./useThrottleState";
import React, { useState } from 'react';
import {useThrottleEffect} from "./useThrottleEffect";

export const UseThrottleExample = () => {
    console.log('-----------UseThrottleExample-------------')
    const [keyword, setKeyword] = useState("hello");
    const throttleValue = useThrottle(keyword, 1000);

    /*const [state, setState] = useState("hello world");
    const throttleEffect = useThrottleEffect(
        (_state) => {
            console.log(_state, "_state");
            return _state;
        },
        [state],
        1000
    );*/


    return (
        <div>
            <h1>state:</h1>
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <span>throttleValue:{throttleValue}</span>
            <br/>
            {/*<h1>effect:</h1>
            <input value={state} onChange={(e) => setState(e.target.value)} />
            <span>throttleEffect:{throttleEffect}</span>*/}
        </div>
    );
}