import {useContext, useState} from 'react';
import {TasksDispatchContext, useTasksDispatch} from './TasksContext';
import React from 'react';

export default function AddTask() {
    const [text, setText] = useState('');
    // const dispatch = useContext(TasksDispatchContext);
    const dispatch = useTasksDispatch();

    return (
        <>
            <input
                placeholder="Add task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {/*<button
                onClick={() => {
                    setText('');
                    onAddTask(text);
                }}>
                Add
            </button>*/}
            <button onClick={() => {
                setText('');
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: text,
                });
            }}>Add</button>
        </>
    );
}

let nextId = 3;
