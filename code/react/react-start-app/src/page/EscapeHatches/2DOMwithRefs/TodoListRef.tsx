import { useState, useRef } from 'react';
import {flushSync} from "react-dom";
import React from 'react';

export default function TodoListRef() {
    const listRef = useRef(null);
    const [text, setText] = useState('');
    const [todos, setTodos] = useState(
        initialTodos
    );

    function handleAdd() {
        const newTodo = { id: nextId++, text: text };
        // setTodos does not immediately update the DOM
        /*setText('');
        setTodos([ ...todos, newTodo]);*/
        // React to update the DOM synchronously right after the code wrapped in flushSync executes
        flushSync(() => {
            setText('');
            setTodos([ ...todos, newTodo]);
        });
        listRef.current.lastChild.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    return (
        <>
            <h4>Flushing state updates synchronously with flushSync</h4>
            <button onClick={handleAdd}>
                Add
            </button>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <ul ref={listRef}>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </>
    );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
    initialTodos.push({
        id: nextId++,
        text: 'Todo #' + (i + 1)
    });
}
