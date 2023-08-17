import { useState } from 'react';
import React from 'react';

function RenderAgain() {
    const [reverse, setReverse] = useState(false);
    let checkbox = (
        <label>
            <input
                type="checkbox"
                checked={reverse}
                onChange={e => setReverse(e.target.checked)}
            />
            Reverse order
        </label>
    );
    if (reverse) {
        return (
            <>
                <Field label="Last name" />
                <Field label="First name" />
                {checkbox}
            </>
        );
    } else {
        return (
            <>
                <Field label="First name" />
                <Field label="Last name" />
                {checkbox}
            </>
        );
    }
}

function Solution1() {
    const [reverse, setReverse] = useState(false);
    let checkbox = (
        <label>
            <input
                type="checkbox"
                checked={reverse}
                onChange={e => setReverse(e.target.checked)}
            />
            Reverse order
        </label>
    );
    if (reverse) {
        return (
            <>
                <Field key="lastName" label="Last name" />
                <Field key="firstName" label="First name" />
                {checkbox}
            </>
        );
    } else {
        return (
            <>
                <Field key="firstName" label="First name" />
                <Field key="lastName" label="Last name" />
                {checkbox}
            </>
        );
    }
}

export default function SwapTwoFormFields() {
    return (<>
        <p>即使交换两个input的位置，但是渲染input的位置没有变，两个input不会改变</p>
        <RenderAgain />
        <p>给input增加key，react知道在什么位置渲染input</p>
        <Solution1 />
    </>)
}

function Field({ label }) {
    const [text, setText] = useState('');
    return (
        <label>
            {label}:{' '}
            <input
                type="text"
                value={text}
                placeholder={label}
                onChange={e => setText(e.target.value)}
            />
        </label>
    );
}
