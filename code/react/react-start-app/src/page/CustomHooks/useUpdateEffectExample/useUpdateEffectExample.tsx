import {useState} from "react";
import React from 'react';
import {useUpdateEffect} from "./useUpdateEffect";


export const UseUpdateEffectExample = () => {
    const [num, setNum] = useState(0);

    useUpdateEffect(() => {
        console.log(num, 'update');

        return () => {
            console.log(num, 'unmount')
        }
    }, [num])
    return (<div>
        {num}
        <button onClick={() => setNum(num + 1)}>add</button>
    </div>)
}