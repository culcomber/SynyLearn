import React, {useState} from 'react';

export default function Test() {
    const [count, setCount] = useState(1);
    const handleClick = (value: any) => {
        console.log(value);
        setCount(count + 1);
    }
    //const handleChange = (value: any) => console.log(value);

    return <div>
        {/*{count < 2
            ? <button onClick={handleClick}>click me {count}</button>
            : <button>click me {count}</button>
        }*/}
        {/*<input placeholder='Input some' onChange={handleChange} />*/}
        <button>click me {count}</button>
    </div>
}