import React, {useState} from 'react';

function Polling () {
    const [count, setCount] = useState(1);
    const handleClick = (event) => {
        console.log('handleClick', event, count);
        setCount(count + 1);
    }

    const handleClick1 = (event) => {
        console.log('handleClick1', event, count);
        setCount(count + 1);
    }

    return <div onClick={count > 3 ? handleClick : handleClick1}>{count}</div>
}

export default Polling;