import React, {useState} from 'react';

export default function TestExample() {

    const [number, setNumber] = useState(0);
    console.log('TestExample number', number)

    return (<>
        <h1>{number}</h1>
        <button
            onClick={() => {
                setNumber(1);
                setNumber(2);

                setTimeout(() => {
                    console.log('setTimeout before', number)
                    setNumber(3);
                    setNumber(4);
                    console.log('setTimeout after', number)
                }, 0);
            }}
        >
            +5
        </button>
    </>);
}