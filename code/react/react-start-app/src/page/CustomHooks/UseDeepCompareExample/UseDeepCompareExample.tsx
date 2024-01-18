import { useState } from "react";
import {useDeepCompare} from "./useDeepCompare";
import React from 'react';

export const UseDeepCompareExample = () => {
    console.log('UseDeepCompareExample')
    const [obj, setObj] = useState({ a: "1" });
    const [obj2, setObj2] = useState({ a: "1" });

    // obj即使设置相同的值也会重新render，但是不同的obj才执行下面的逻辑
    useDeepCompare(() => {
        console.log("12222");
    }, [obj]);

    return (
        <div>
            UseDeepCompareEffectDemo:
            <p>{obj.a}</p>
            <button onClick={() => setObj({ a: "2" })}>setObj 2</button>
            <button onClick={() => setObj({ a: "1" })}>setObj 1</button>
            <br/>
            notUse:
            <p>{obj2.a}</p>
            <button onClick={() => setObj2({ a: "2" })}>setObj 2</button>
            <button onClick={() => setObj2({ a: "1" })}>setObj 1</button>
        </div>
    );
};
