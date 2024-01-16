import { useState } from 'react';
import React from 'react';

export const UseDebounceStateExample = () => {
    const [num, setNum] = useState(0);

    return (
        <div>
            num:{num}
            <button onClick={() => setNum(num + 1)}>add</button>
        </div>
    );
};