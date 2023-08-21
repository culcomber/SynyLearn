import {FunctionComponent, memo, useState} from 'react';
import React from 'react';

export default function Greeting() {
    console.log('Greeting')
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    function handleClick() {
        console.log('handleClick');
    }

    return (
        <>
            <label>
                Name{': '}
                <input value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Address{': '}
                <input value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <Greeting1 name={name} />
            <Greeting2 name={name} handleClick={handleClick} />
            <Greeting2 name={name} handleClick={() => {
                console.log('内联函数')
                handleClick();
            }} />
        </>
    );
}

const Greeting1: FunctionComponent<{ name: string }> = memo(function Greeting({ name }) {
    console.log("Greeting1 was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{name && ', '}{name}!</h3>;
});

const Greeting2: FunctionComponent<{ name: string, handleClick: any }> = memo(function Greeting({ name, handleClick }) {
    console.log('Greeting2 was rendered at', new Date().toLocaleTimeString());
    const [greeting, setGreeting] = useState('Hello');

    return (
        <>
            <h3>{greeting}{name && ', '}{name}!</h3>
            <GreetingSelector value={greeting} onChange={setGreeting} />
            <button onClick={handleClick}>hello</button>
        </>
    );
});

function GreetingSelector({ value, onChange }) {
    console.log('GreetingSelector', new Date().toLocaleTimeString());
    return (
        <>
            <label>
                <input
                    type="radio"
                    checked={value === 'Hello'}
                    onChange={e => onChange('Hello')}
                />
                Regular greeting
            </label>
            <label>
                <input
                    type="radio"
                    checked={value === 'Hello and welcome'}
                    onChange={e => onChange('Hello and welcome')}
                />
                Enthusiastic greeting
            </label>
        </>
    );
}
