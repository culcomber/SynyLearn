import {useState} from 'react';
import {useTasks, useTasksDispatch} from './TasksContext';
import React from 'react';

export default function TaskList() {
    // const tasks = useContext(TasksContext);
    const tasks = useTasks();

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    {/*<Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />*/}
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

function Task({task}) {
    const [isEditing, setIsEditing] = useState(false);
    // const dispatch = useContext(TasksDispatchContext);
    const dispatch = useTasksDispatch();
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    /*onChange={(e) => {
                        onChange({
                            ...task,
                            text: e.target.value,
                        });
                    }}*/
                    onChange={e => {
                        dispatch({
                            type: 'changed',
                            task: {
                                ...task,
                                text: e.target.value
                            }
                        });
                    }}
                />
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                /*onChange={(e) => {
                    onChange({
                        ...task,
                        done: e.target.checked,
                    });
                }}*/
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    });
                }}
            />
            {taskContent}
            <button
                /*onClick={() => onDelete(task.id)}*/
                onClick={() => {
                    dispatch({
                        type: 'deleted',
                        id: task.id
                    });
                }}
            >Delete</button>
        </label>
    );
}
