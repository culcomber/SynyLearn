import React, {useState, useCallback} from 'react';

export default function Test() {
    return (
        <div>
            A:
            <ComponentA />
            B:
            <ComponentB />
        </div>
    );
}
const Button = React.memo(function Button({onClick, children}: any) {
    console.log("Button called");
    return <button onClick={onClick}>{children}</button>;
});

function ComponentA() {
    console.log("ComponentA called");
    const [count, setCount] = useState(0);
    // Note: Safe to use the closed-over `count` here if `count `updates are
    // triggered by clicks or similar events that definitely render, since
    // the `count` that `increment` closes over won't be stale.
    const increment = () => setCount(count + 1);
    return (
        <div>
            {count}
            <Button onClick={increment}>+</Button>
        </div>
    );
}

function ComponentB() {
    console.log("ComponentB called");
    const [count, setCount] = useState(0);
    // Note: Can't use `count` in `increment`, need the callback form because
    // the `count` the first `increment` closes over *will* be slate after
    // the next render
    const increment = useCallback(
        () => setCount(count + 1),
        []
    );
    return (
        <div>
            {count}
            <Button onClick={increment}>+</Button>
        </div>
    );
}
