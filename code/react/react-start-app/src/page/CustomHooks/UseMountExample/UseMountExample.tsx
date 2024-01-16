import {useMount} from "./useMount";
import { useState } from 'react';
import React from 'react';

export const UseMountExample = () => {
    const [num, setNum] = useState(0);

    useMount(() => {
        console.log("useMount");
    });

    return (
        <div>
            num:{num}
            <button onClick={() => setNum(num + 1)}>add</button>
        </div>
    );
};